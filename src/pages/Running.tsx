import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Play, Square, Share2, Map, Heart, Timer as TimerIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Running() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0); // km
  const [heartRate, setHeartRate] = useState(70);

  // Simula corrida
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        setDistance((prev) => prev + 0.0025); // ~9km/h pace
        setHeartRate(() => 120 + Math.floor(Math.random() * 20)); // entre 120 e 140
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const calculatePace = () => {
    if (distance === 0) return "0:00";
    const paceSeconds = time / distance;
    const m = Math.floor(paceSeconds / 60);
    const s = Math.floor(paceSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsFinished(true);
    } else {
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handleShare = async () => {
    const shareText = `Corri ${distance.toFixed(2)}km em ${formatTime(time)} com pace de ${calculatePace()} no Projeto60D!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Treino de Corrida",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
        navigator.clipboard.writeText(shareText);
        toast.success("Texto copiado para área de transferência!");
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Texto copiado para área de transferência!");
    }
  };

  const saveRun = async () => {
    if (!user) return;
    try {
      await supabase.from("completed_workouts").insert({
        user_id: user.id,
        workout_name: "Corrida " + distance.toFixed(2) + "km",
        workout_level: "cardio"
      });
      toast.success("Corrida salva com sucesso!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="text-orange-500 w-6 h-6" />
          Corrida ao Ar Livre
        </h1>
      </div>

      {!isFinished ? (
        <div className="flex flex-col items-center justify-center space-y-8 mt-12">
          <div className="relative flex items-center justify-center w-64 h-64 rounded-full border-4 border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full animate-pulse"></div>
            <div className="text-center z-10">
              <span className="text-6xl font-black tabular-nums tracking-tighter">
                {distance.toFixed(2)}
              </span>
              <span className="text-xl text-gray-400 block mt-1">KM</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
            <div className="flex flex-col items-center">
              <TimerIcon className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-2xl font-bold tabular-nums">{formatTime(time)}</span>
              <span className="text-xs text-gray-500 uppercase font-medium">Tempo</span>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-2xl font-bold tabular-nums">{calculatePace()}</span>
              <span className="text-xs text-gray-500 uppercase font-medium">Pace</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className={`w-6 h-6 mb-1 ${isRunning ? "text-rose-500 animate-pulse" : "text-gray-400"}`} />
              <span className="text-2xl font-bold tabular-nums">{isRunning ? heartRate : "--"}</span>
              <span className="text-xs text-gray-500 uppercase font-medium">BPM</span>
            </div>
          </div>

          <Button 
            onClick={handleStartStop} 
            className={`w-24 h-24 rounded-full shadow-lg flex items-center justify-center transition-all ${
              isRunning ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isRunning ? <Square className="w-8 h-8 text-white fill-current" /> : <Play className="w-8 h-8 text-white fill-current ml-2" />}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          <div className="bg-gradient-to-b from-orange-500 to-rose-600 rounded-3xl p-1 pb-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-32 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800')] bg-cover bg-center"></div>
            
            <div className="bg-zinc-950 rounded-[22px] p-6 relative z-10 mt-16 mx-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Corrida da Manhã</p>
                  <p className="text-5xl font-black">{distance.toFixed(2)}<span className="text-xl text-gray-400 ml-1">km</span></p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Map className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-zinc-800 pt-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Tempo</p>
                  <p className="text-xl font-bold">{formatTime(time)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Ritmo Médio (Pace)</p>
                  <p className="text-xl font-bold">{calculatePace()} /km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Batimento Médio</p>
                  <p className="text-xl font-bold">132 bpm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Calorias</p>
                  <p className="text-xl font-bold">{Math.floor(distance * 65)} kcal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => { setIsFinished(false); setTime(0); setDistance(0); }} variant="outline" className="flex-1 bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
              Descartar
            </Button>
            <Button onClick={saveRun} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              Salvar Treino
            </Button>
          </div>

          <Button onClick={handleShare} className="w-full bg-orange-500 hover:bg-orange-600 font-bold">
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar no Instagram
          </Button>
        </div>
      )}
    </div>
  );
}
