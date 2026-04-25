import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Play, 
  Square, 
  Share2, 
  Map as MapIcon, 
  Settings, 
  Music, 
  Navigation, 
  X,
  Signal,
  SignalHigh,
  SignalLow,
  ChevronRight,
  Volume2,
  VolumeX,
  PauseCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Haversine distance in KM
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function Running() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Stats
  const [time, setTime] = useState(0); // seconds
  const [distance, setDistance] = useState(0); // km
  // Derived Stats
  const calories = Math.floor(distance * 65);
  let pace = "00:00";
  if (distance > 0.01 && time > 0) {
    const paceSeconds = time / distance;
    const pM = Math.floor(paceSeconds / 60);
    const pS = Math.floor(paceSeconds % 60);
    if (pM < 60) {
      pace = `${pM.toString().padStart(2, "0")}:${pS.toString().padStart(2, "0")}`;
    } else {
      pace = "--:--";
    }
  }
  
  // GPS State
  const [gpsStatus, setGpsStatus] = useState<"searching" | "low" | "high">("searching");
  const [coords, setCoords] = useState<{ lat: number; lng: number }[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    return Number(localStorage.getItem("running_weekly_goal") || 0);
  });
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const watchId = useRef<number | null>(null);
  const lastCoord = useRef<{ lat: number; lng: number } | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [weeklyRuns, setWeeklyRuns] = useState<{ workout_name: string; completed_at: string }[]>([]);

  // Fetch Weekly Goal and Runs
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      // Fetch Goal
      const { data: goalData } = await supabase.from("running_goals").select("weekly_distance_goal").eq("user_id", user.id).maybeSingle();
      if (goalData) {
        setWeeklyGoal(Number(goalData.weekly_distance_goal));
        localStorage.setItem("running_weekly_goal", goalData.weekly_distance_goal.toString());
      }
// ...
      
      // Fetch this week's runs
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const { data: runs } = await supabase
        .from("completed_workouts")
        .select("workout_name, completed_at")
        .eq("user_id", user.id)
        .gte("completed_at", startOfWeek.toISOString())
        .ilike("workout_name", "Corrida%")
        .order("completed_at", { ascending: false });
      
      if (runs) {
        setWeeklyRuns(runs);
        const total = runs.reduce((acc, run) => {
          const match = run.workout_name.match(/(\d+\.\d+)km/);
          return acc + (match ? parseFloat(match[1]) : 0);
        }, 0);
        setWeeklyProgress(total);
      }
    };
    fetchData();
  }, [user]);

  // Helper to draw the path on an SVG
  const renderPath = () => {
    if (coords.length < 2) return null;
    
    // Normalize coords to fit SVG viewbox
    const minLat = Math.min(...coords.map(c => c.lat));
    const maxLat = Math.max(...coords.map(c => c.lat));
    const minLng = Math.min(...coords.map(c => c.lng));
    const maxLng = Math.max(...coords.map(c => c.lng));
    
    const padding = 10;
    const width = 200;
    const height = 200;
    
    const scaleX = (val: number) => padding + (val - minLng) / (maxLng - minLng || 1) * (width - 2 * padding);
    const scaleY = (val: number) => padding + (val - minLat) / (maxLat - minLat || 1) * (height - 2 * padding);
    
    const points = coords.map(c => `${scaleX(c.lng)},${height - scaleY(c.lat)}`).join(" ");
    
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="#4ade80"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
        />
        {/* Start Point */}
        <circle cx={scaleX(coords[0].lng)} cy={height - scaleY(coords[0].lat)} r="5" fill="#fff" />
        {/* Current Point */}
        <circle cx={scaleX(coords[coords.length-1].lng)} cy={height - scaleY(coords[coords.length-1].lat)} r="6" fill="#4ade80" />
      </svg>
    );
  };

  // Format Time: HH:MM:SS or MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("running_settings");
    return saved ? JSON.parse(saved) : {
      autoPause: false,
      voiceVolume: 0.8,
      voiceIntervalKm: 1,
      voiceIntervalMin: 5,
      feedbackDistance: true,
      feedbackCalories: true,
      feedbackDuration: true,
      feedbackPace: true,
      unit: 'km'
    };
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem("running_settings", JSON.stringify(settings));
  }, [settings]);

  const lastAnnouncedKm = useRef(0);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.volume = settings.voiceVolume;
    window.speechSynthesis.speak(utterance);
  };

  // GPS Watch logic update with voice feedback
  useEffect(() => {
    if (isRunning && distance > 0) {
      const currentKm = Math.floor(distance);
      if (currentKm > lastAnnouncedKm.current) {
        lastAnnouncedKm.current = currentKm;
        
        let feedback = `${currentKm} quilômetros concluídos.`;
        if (settings.feedbackDuration) feedback += ` Tempo: ${formatTime(time)}.`;
        if (settings.feedbackPace) feedback += ` Ritmo de ${pace}.`;
        
        speak(feedback);
      }
    }
  }, [distance, isRunning, settings]);

  const startTracking = () => {
    if ("geolocation" in navigator) {
      setIsRunning(true);
      setIsFinished(false);
      lastAnnouncedKm.current = 0;
      startTimeRef.current = Date.now() - (time * 1000);
      
      // Timer Interval
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setTime(elapsed);
        }
      }, 1000);

      // GPS Watch
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          if (accuracy < 30) {
            setGpsStatus("high");
          } else if (accuracy < 100) {
            setGpsStatus("low");
          } else {
            setGpsStatus("searching");
          }

          if (lastCoord.current) {
            const d = calculateDistance(
              lastCoord.current.lat,
              lastCoord.current.lng,
              latitude,
              longitude
            );
            
            // Only add distance if move is significant (avoid jitter)
            if (d > 0.002) {
              setDistance((prev) => {
                const newDist = prev + d;

                return newDist;
              });
              lastCoord.current = { lat: latitude, lng: longitude };
              setCoords(prev => [...prev, { lat: latitude, lng: longitude }]);
            }
          } else {
            lastCoord.current = { lat: latitude, lng: longitude };
            setCoords([{ lat: latitude, lng: longitude }]);
          }
        },
        (error) => {
          console.error("GPS Error:", error);
          setGpsStatus("searching");
          toast.error("Erro ao acessar GPS. Verifique as permissões.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000
        }
      );
    } else {
      toast.error("Geolocalização não suportada no seu navegador.");
    }
  };

  const stopTracking = () => {
    setIsRunning(false);
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsFinished(true);
  };

  const resetStats = () => {
    setTime(0);
    setDistance(0);

    setCoords([]);
    lastCoord.current = null;
    setIsFinished(false);
  };

  const handleShare = (imageUrl: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Add Overlay
      if (ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
        
        ctx.fillStyle = "#fff";
        ctx.font = "bold 80px Inter, sans-serif";
        ctx.fillText(`${distance.toFixed(2)} km`, 50, canvas.height - 100);
        
        ctx.font = "40px Inter, sans-serif";
        ctx.fillText(`Pace: ${pace} • Tempo: ${formatTime(time)}`, 50, canvas.height - 40);
        
        ctx.font = "bold 30px Inter, sans-serif";
        ctx.fillStyle = "#4ade80";
        ctx.fillText("PROJETO 60D", canvas.width - 250, canvas.height - 40);
      }
      
      const link = document.createElement("a");
      link.download = "meu-treino.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  const saveRun = async () => {
    if (!user) return;
    const runData = {
      user_id: user.id,
      workout_name: `Corrida ${distance.toFixed(2)}km | ${formatTime(time)} | Pace: ${pace} | ${calories} kcal`,
      workout_level: "cardio",
      completed_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from("completed_workouts").insert(runData);
      if (error) throw error;
      toast.success("Corrida salva com sucesso!");
      
      setWeeklyRuns(prev => [{ workout_name: runData.workout_name, completed_at: runData.completed_at }, ...prev]);
      setWeeklyProgress(prev => prev + distance);
      
      resetStats();
    } catch (err) {
      console.error(err);
      // Save locally if offline
      const pendingRuns = JSON.parse(localStorage.getItem("pending_runs") || "[]");
      pendingRuns.push(runData);
      localStorage.setItem("pending_runs", JSON.stringify(pendingRuns));
      toast.warning("Sem internet. Corrida salva no celular e será enviada quando você voltar online!");
      resetStats();
    }
  };

  // Auto-sync pending runs when online
  useEffect(() => {
    const syncRuns = async () => {
      if (!user || !navigator.onLine) return;
      const pendingRuns = JSON.parse(localStorage.getItem("pending_runs") || "[]");
      if (pendingRuns.length === 0) return;

      const { error } = await supabase.from("completed_workouts").insert(pendingRuns);
      if (!error) {
        localStorage.removeItem("pending_runs");
        toast.success(`${pendingRuns.length} treinos offline sincronizados!`);
      }
    };
    
    window.addEventListener('online', syncRuns);
    syncRuns(); // Try on load
    return () => window.removeEventListener('online', syncRuns);
  }, [user]);

  return (
    <div className="fixed inset-0 bg-[#000] z-50 flex flex-col overflow-hidden text-white font-sans select-none">
      {/* Background with Path visualization */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {isRunning && (
            <div className="w-full h-full max-w-sm max-h-[60vh] opacity-80">
              {renderPath()}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {gpsStatus === "high" ? (
              <SignalHigh className="w-5 h-5 text-[#4ade80]" />
            ) : gpsStatus === "low" ? (
              <SignalLow className="w-5 h-5 text-yellow-500" />
            ) : (
              <Signal className="w-5 h-5 text-red-500 animate-pulse" />
            )}
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">GPS {gpsStatus}</span>
          </div>
          {weeklyGoal > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#4ade80] transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (weeklyProgress / weeklyGoal) * 100)}%` }} 
                />
              </div>
              <span className="text-[9px] font-bold text-zinc-500">{weeklyProgress.toFixed(1)} / {weeklyGoal} km esta semana</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => window.history.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Stats */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <motion.div
            key={distance}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-[14vw] font-black tracking-tighter tabular-nums leading-none">
              {distance.toFixed(2)}
            </span>
            <span className="text-sm font-black text-[#4ade80] tracking-[0.3em] uppercase mt-1">Quilômetros</span>
          </motion.div>
        </div>

        <div className="w-full mt-12 grid grid-cols-2 gap-8 max-w-sm">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tabular-nums">{pace}</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Pace (Min/KM)</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tabular-nums">{formatTime(time)}</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Tempo</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tabular-nums">{calories}</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Kcal</span>
          </div>
          <div className="flex flex-col items-center">
             <button 
               onClick={() => {
                 const g = prompt("Qual sua meta semanal de corrida em KM?", weeklyGoal.toString());
                 if (g) {
                   const val = parseFloat(g);
                   setWeeklyGoal(val);
                   supabase.from("running_goals").upsert({ user_id: user?.id, weekly_distance_goal: val }).then();
                 }
               }}
               className="flex flex-col items-center group"
             >
                <span className="text-4xl font-black tabular-nums group-hover:text-[#4ade80] transition-colors">{weeklyGoal}</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Meta Semanal</span>
             </button>
          </div>
        </div>

        {/* Weekly History List */}
        <div className="w-full max-w-sm mt-8 px-2 overflow-hidden">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Histórico de Corridas</p>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {weeklyRuns.length === 0 ? (
              <p className="text-[10px] text-zinc-600 font-bold italic">Nenhuma corrida registrada.</p>
            ) : (
              weeklyRuns.map((run, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-[#4ade80]" />
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-tight">{run.workout_name}</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase">{new Date(run.completed_at).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-20 pb-16 px-10 flex items-center justify-between">
        <button className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <Music className="w-6 h-6" />
        </button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={isRunning ? stopTracking : startTracking}
          className={`w-28 h-28 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.3)] ${
            isRunning 
              ? "bg-white text-black" 
              : "bg-[#4ade80] text-black"
          }`}
        >
          {isRunning ? (
            <Square className="w-10 h-10 fill-current" />
          ) : (
            <Play className="w-10 h-10 fill-current ml-1" />
          )}
        </motion.button>

        <button 
          onClick={() => setShowSettings(true)}
          className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10 p-6 flex items-center justify-between border-b border-zinc-900">
            <button onClick={() => setShowSettings(false)} className="text-zinc-400">
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <h2 className="font-display text-lg tracking-widest text-white">DEFINIÇÕES</h2>
            <div className="w-6" />
          </div>

          <div className="p-6 space-y-8">
            {/* Weekly Goal in Settings too */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Objetivos</p>
              <div 
                onClick={() => {
                  const g = prompt("Qual sua meta semanal de corrida em KM?", weeklyGoal.toString());
                  if (g) {
                    const val = parseFloat(g);
                    setWeeklyGoal(val);
                    localStorage.setItem("running_weekly_goal", val.toString());
                    supabase.from("running_goals").upsert({ user_id: user?.id, weekly_distance_goal: val }).then();
                    toast.success("Meta semanal atualizada!");
                  }
                }}
                className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-zinc-800"
              >
                <span className="text-sm font-bold text-zinc-300">Meta Semanal</span>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span>{weeklyGoal} km</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <hr className="border-zinc-900" />

            {/* Auto Pause */}
            <div className="flex items-center justify-between group">
              <span className="text-sm font-bold text-zinc-300">Pausa automática</span>
              <button 
                onClick={() => setSettings(s => ({ ...s, autoPause: !s.autoPause }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoPause ? 'bg-primary' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.autoPause ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <hr className="border-zinc-900" />

            {/* Volume */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Volume</p>
              <div className="flex items-center gap-4">
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={settings.voiceVolume}
                  onChange={(e) => setSettings(s => ({ ...s, voiceVolume: parseFloat(e.target.value) }))}
                  className="flex-1 accent-primary bg-zinc-800 h-1 rounded-lg appearance-none"
                />
                <Volume2 className="w-4 h-4 text-primary" />
              </div>
            </div>

            <hr className="border-zinc-900" />

            {/* Intervals */}
            <div className="space-y-6">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Intervalo do feedback de voz</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-bold text-zinc-300">Duração</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-sm font-bold">{settings.voiceIntervalMin} minutos</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-bold text-zinc-300">Distância</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-sm font-bold">{settings.voiceIntervalKm} km</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <hr className="border-zinc-900" />

            {/* Feedback Toggles */}
            <div className="space-y-6">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Feedback de voz</p>
              
              {[
                { label: 'Distância', key: 'feedbackDistance' },
                { label: 'Calorias', key: 'feedbackCalories' },
                { label: 'Duração', key: 'feedbackDuration' },
                { label: 'Ritmo', key: 'feedbackPace' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-300">{item.label}</span>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings[item.key as keyof typeof settings] ? 'bg-primary' : 'bg-zinc-800'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              ))}
            </div>

            <hr className="border-zinc-900" />

            {/* Units */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-300">Unidades Métricas</span>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span>km</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <button 
              onClick={() => setShowSettings(false)}
              className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase tracking-widest shadow-glow"
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      {/* Finished Modal */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex flex-col p-8"
          >
            <div className="flex-1 flex flex-col items-center justify-center pt-10">
              <div className="w-20 h-20 rounded-full bg-[#4ade80]/10 flex items-center justify-center mb-6">
                <Activity className="w-10 h-10 text-[#4ade80]" />
              </div>
              <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter italic">TREINO CONCLUÍDO!</h3>
              <p className="text-zinc-500 mb-12 font-bold tracking-widest text-xs">RESUMO DA SUA CORRIDA</p>
              
              <div className="grid grid-cols-2 gap-y-12 gap-x-8 w-full max-w-xs mb-16">
                <div className="text-center">
                  <p className="text-5xl font-black tabular-nums">{distance.toFixed(2)}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Distância (KM)</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black tabular-nums">{formatTime(time)}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Tempo Total</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black tabular-nums">{pace}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Pace Médio</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black tabular-nums">{calories}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Calorias (KCAL)</p>
                </div>
              </div>

              {/* Share Photo Option */}
              <div className="mb-10 w-full max-w-xs">
                <input 
                  type="file" 
                  id="photo-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      handleShare(url);
                    }
                  }}
                />
                <button 
                  onClick={() => document.getElementById("photo-upload")?.click()}
                  className="w-full flex items-center justify-center gap-2 text-zinc-400 hover:text-[#4ade80] transition-colors py-2 border border-dashed border-zinc-800 rounded-xl"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Colocar dados na foto</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mb-8">
              <Button onClick={saveRun} className="h-16 bg-[#4ade80] hover:bg-[#22c55e] text-black font-black text-xl italic tracking-tighter">
                SALVAR NO PROJETO 60D
              </Button>
              <Button variant="ghost" onClick={resetStats} className="h-12 text-zinc-500 hover:text-white font-bold text-sm tracking-widest">
                DESCARTAR TREINO
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

