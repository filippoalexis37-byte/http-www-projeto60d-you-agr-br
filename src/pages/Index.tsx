import { motion } from "framer-motion";
import { Flame, Dumbbell, Target, Salad, ChevronRight, Timer, TrendingUp, Shield, MessageCircle, Pill, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";
import { useAuth } from "@/hooks/useAuth";

const goals = [
  { icon: Flame, label: "Quero Emagrecer", color: "gradient-accent", to: "/dietas" },
  { icon: Dumbbell, label: "Quero Ganhar Massa", color: "gradient-primary", to: "/treinos" },
  { icon: Target, label: "Quero Definir", color: "gradient-primary", to: "/treinos" },
  { icon: Salad, label: "Dieta Zero Açúcar", color: "gradient-accent", to: "/dietas" },
];

const quickStats = [
  { icon: MessageCircle, label: "IA", value: "Chat", to: "/chat" },
  { icon: Pill, label: "Suplementos", value: "Guia", to: "/suplementos" },
  { icon: TrendingUp, label: "Evolução", value: "Dados", to: "/evolucao" },
  { icon: Activity, label: "Corrida", value: "Track", to: "/corrida" },
];

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Admin Panel Quick Access */}
      {isAdmin && (
        <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
          <div /> {/* Spacer */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const pass = prompt("Digite a senha de administrador:");
              if (pass === "Lucas123@") {
                navigate("/admin");
              } else if (pass !== null) {
                alert("Senha incorreta!");
              }
            }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-primary/40 text-primary shadow-glow backdrop-blur-md hover:bg-primary/20 transition-all"
          >
            <Shield className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Painel Admin</span>
          </motion.button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Fitness hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="relative flex h-full flex-col items-center justify-end px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl tracking-wider text-foreground sm:text-7xl">
              PROJETO <span className="text-primary text-glow">60D</span>
            </h1>
            <p className="mt-1 font-display text-xl tracking-widest text-secondary-foreground sm:text-2xl">
              TRANSFORMAÇÃO REAL
            </p>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
              "Seu corpo é o reflexo das suas decisões."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Goals */}
      <div className="px-4 pt-8">
        <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">
          ESCOLHA SEU OBJETIVO
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {goals.map((goal, i) => (
            <motion.button
              key={goal.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => navigate(goal.to)}
              className={`group flex items-center gap-4 rounded-xl ${goal.color} p-4 transition-all hover:scale-[1.02] active:scale-[0.98]`}
            >
              <goal.icon className="h-6 w-6 text-primary-foreground" />
              <span className="flex-1 text-left font-semibold text-primary-foreground">
                {goal.label}
              </span>
              <ChevronRight className="h-5 w-5 text-primary-foreground/70 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick access */}
      <div className="px-4 pt-8">
        <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">
          ACESSO RÁPIDO
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, i) => (
            <motion.button
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onClick={() => navigate(stat.to)}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              <stat.icon className="h-8 w-8 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <span className="font-display text-lg text-foreground">{stat.value}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Motivational banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-4 mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
      >
        <p className="font-display text-xl tracking-wide text-primary text-glow">
          🔥 DESAFIO 60 DIAS
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Disciplina e constância geram resultados. Comece hoje!
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
