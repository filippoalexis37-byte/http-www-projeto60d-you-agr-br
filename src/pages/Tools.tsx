import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, Timer, Play, Pause, RotateCcw } from "lucide-react";

const Tools = () => {
  const [activeTab, setActiveTab] = useState<"imc" | "calorias" | "cronometro">("imc");

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

  // Cronômetro
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

  const tabs = [
    { id: "imc" as const, label: "IMC", icon: Calculator },
    { id: "calorias" as const, label: "Calorias", icon: Calculator },
    { id: "cronometro" as const, label: "Cronômetro", icon: Timer },
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
            className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
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
      </motion.div>
    </div>
  );
};

export default Tools;
