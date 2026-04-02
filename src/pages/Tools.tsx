import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, Timer, Play, Pause, RotateCcw, MapPin, Flame as FlameIcon, Clock } from "lucide-react";

const Tools = () => {
  const [activeTab, setActiveTab] = useState<"imc" | "calorias" | "cronometro" | "corrida">("imc");

  // IMC
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imc, setImc] = useState<number | null>(null);

  const calcIMC = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) setImc(w / (h * h));
  };

  const imcCategory = (v: number) => {
    if (v < 18.5) return { label: "Abaixo do peso", color: "text-accent" };
    if (v < 25) return { label: "Peso normal", color: "text-primary" };
    if (v < 30) return { label: "Sobrepeso", color: "text-accent" };
    return { label: "Obesidade", color: "text-destructive" };
  };

  // Calorias
  const [age, setAge] = useState("");
  const [calWeight, setCalWeight] = useState("");
  const [calHeight, setCalHeight] = useState("");
  const [gender, setGender] = useState<"m" | "f">("m");
  const [tdee, setTdee] = useState<number | null>(null);

  const calcCalorias = () => {
    const w = parseFloat(calWeight);
    const h = parseFloat(calHeight);
    const a = parseFloat(age);
    if (w > 0 && h > 0 && a > 0) {
      const bmr = gender === "m"
        ? 88.36 + 13.4 * w + 4.8 * h - 5.7 * a
        : 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
      setTdee(Math.round(bmr * 1.55));
    }
  };

  // Cronômetro simples
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running) {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = useCallback((ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
  }, []);

  // Cronômetro de Corrida
  const [runTime, setRunTime] = useState(0);
  const [runRunning, setRunRunning] = useState(false);
  const [runDistance, setRunDistance] = useState(0); // metros
  const [runWeight, setRunWeight] = useState(() => localStorage.getItem("runWeight") || "70");
  const watchIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ lat: number; lng: number; time: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "tracking" | "unavailable">("idle");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (runRunning) {
      interval = setInterval(() => setRunTime((t) => t + 1000), 1000);
    }
    return () => clearInterval(interval);
  }, [runRunning]);

  const getDistanceBetween = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const startRun = () => {
    setRunRunning(true);
    setGpsStatus("tracking");
    localStorage.setItem("runWeight", runWeight);

    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const now = Date.now();
          if (lastPosRef.current) {
            const dist = getDistanceBetween(
              lastPosRef.current.lat, lastPosRef.current.lng,
              latitude, longitude
            );
            if (dist > 3) { // min 3m to avoid GPS noise
              setRunDistance((d) => d + dist);
            }
          }
          lastPosRef.current = { lat: latitude, lng: longitude, time: now };
        },
        () => setGpsStatus("unavailable"),
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
      );
    } else {
      setGpsStatus("unavailable");
    }
  };

  const pauseRun = () => {
    setRunRunning(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const resetRun = () => {
    pauseRun();
    setRunTime(0);
    setRunDistance(0);
    lastPosRef.current = null;
    setGpsStatus("idle");
  };

  const formatRunTime = (ms: number) => {
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    if (hrs > 0) return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const distKm = runDistance / 1000;
  const runMins = runTime / 60000;
  const pace = distKm > 0.01 ? runMins / distKm : 0;
  const paceFormatted = pace > 0
    ? `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, "0")}`
    : "--:--";
  const calories = distKm > 0.01
    ? Math.round(parseFloat(runWeight || "70") * distKm * 1.036)
    : 0;

  const tabs = [
    { id: "imc" as const, label: "IMC", icon: Calculator },
    { id: "calorias" as const, label: "Calorias", icon: Calculator },
    { id: "cronometro" as const, label: "Timer", icon: Timer },
    { id: "corrida" as const, label: "Corrida", icon: MapPin },
  ];

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-4xl tracking-wide text-foreground">
        <Calculator className="mb-1 mr-2 inline h-8 w-8 text-primary" />
        FERRAMENTAS
      </h1>

      <div className="mt-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-2 py-2.5 text-[11px] font-semibold transition-all ${
              activeTab === tab.id
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        {activeTab === "imc" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground outline-none focus:border-primary"
                placeholder="Ex: 75"
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Altura (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground outline-none focus:border-primary"
                placeholder="Ex: 175"
              />
            </div>
            <button onClick={calcIMC} className="w-full rounded-xl gradient-primary p-4 font-semibold text-primary-foreground transition-all hover:opacity-90">
              Calcular IMC
            </button>
            {imc !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
              >
                <p className="font-display text-5xl text-primary text-glow">{imc.toFixed(1)}</p>
                <p className={`mt-2 font-semibold ${imcCategory(imc).color}`}>
                  {imcCategory(imc).label}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === "calorias" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["m", "f"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    gender === g ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {g === "m" ? "♂ Masculino" : "♀ Feminino"}
                </button>
              ))}
            </div>
            {[
              { label: "Idade", value: age, set: setAge, ph: "Ex: 25" },
              { label: "Peso (kg)", value: calWeight, set: setCalWeight, ph: "Ex: 75" },
              { label: "Altura (cm)", value: calHeight, set: setCalHeight, ph: "Ex: 175" },
            ].map((field) => (
              <div key={field.label} className="rounded-xl border border-border bg-card p-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder={field.ph}
                />
              </div>
            ))}
            <button onClick={calcCalorias} className="w-full rounded-xl gradient-primary p-4 font-semibold text-primary-foreground transition-all hover:opacity-90">
              Calcular Calorias
            </button>
            {tdee !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Gasto calórico diário estimado
                </p>
                <p className="font-display text-5xl text-primary text-glow">{tdee}</p>
                <p className="text-sm text-muted-foreground">kcal/dia</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-xs text-muted-foreground">Emagrecer</p>
                    <p className="font-semibold text-accent">{tdee - 500}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-xs text-muted-foreground">Manter</p>
                    <p className="font-semibold text-foreground">{tdee}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-xs text-muted-foreground">Ganhar</p>
                    <p className="font-semibold text-primary">{tdee + 500}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === "cronometro" && (
          <div className="flex flex-col items-center py-10">
            <p className="font-display text-7xl tabular-nums text-primary text-glow">
              {formatTime(time)}
            </p>
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setRunning(!running)}
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  running ? "gradient-accent" : "gradient-primary"
                } transition-all animate-pulse-glow`}
              >
                {running ? (
                  <Pause className="h-7 w-7 text-primary-foreground" />
                ) : (
                  <Play className="ml-1 h-7 w-7 text-primary-foreground" />
                )}
              </button>
              <button
                onClick={() => {
                  setRunning(false);
                  setTime(0);
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary transition-all"
              >
                <RotateCcw className="h-6 w-6 text-secondary-foreground" />
              </button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Use para controlar o tempo de descanso entre séries
            </p>
          </div>
        )}

        {activeTab === "corrida" && (
          <div className="space-y-4">
            {/* Weight config */}
            {!runRunning && runTime === 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Seu peso (kg) – para cálculo de calorias
                </label>
                <input
                  type="number"
                  value={runWeight}
                  onChange={(e) => setRunWeight(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder="Ex: 70"
                />
              </div>
            )}

            {/* Main display */}
            <div className="rounded-2xl border border-primary/20 bg-card p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Tempo</p>
              <p className="font-display text-6xl tabular-nums text-primary text-glow">
                {formatRunTime(runTime)}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-secondary p-4">
                  <MapPin className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 font-display text-2xl text-foreground">
                    {distKm.toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">km</p>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <Clock className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 font-display text-2xl text-foreground">
                    {paceFormatted}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">min/km</p>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <FlameIcon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 font-display text-2xl text-foreground">
                    {calories}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">kcal</p>
                </div>
              </div>

              {gpsStatus === "unavailable" && (
                <p className="mt-3 text-xs text-accent">
                  ⚠️ GPS indisponível – distância manual não rastreada
                </p>
              )}
              {gpsStatus === "tracking" && (
                <p className="mt-3 text-xs text-primary">
                  📍 GPS ativo – rastreando sua corrida
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={runRunning ? pauseRun : startRun}
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  runRunning ? "gradient-accent" : "gradient-primary"
                } transition-all box-glow`}
              >
                {runRunning ? (
                  <Pause className="h-9 w-9 text-primary-foreground" />
                ) : (
                  <Play className="ml-1 h-9 w-9 text-primary-foreground" />
                )}
              </button>
              <button
                onClick={resetRun}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary transition-all"
              >
                <RotateCcw className="h-7 w-7 text-secondary-foreground" />
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              🏃 Funciona offline · GPS rastreia distância automaticamente
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Tools;
