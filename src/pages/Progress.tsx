import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Trophy, Dumbbell, TrendingUp, Lock } from "lucide-react";
import { Progress as ProgressBar } from "@/components/ui/progress";

interface Medal {
  id: string;
  medal_name: string;
  description: string;
  threshold: number;
  earned_at: string;
}

interface CompletedWorkout {
  id: string;
  workout_name: string;
  workout_level: string;
  completed_at: string;
}

const medalTargets = [
  { type: "workouts_10", name: "Bronze 🥉", threshold: 10 },
  { type: "workouts_50", name: "Prata 🥈", threshold: 50 },
  { type: "workouts_100", name: "Ouro 🥇", threshold: 100 },
];

const Progress = () => {
  const { user, isApproved } = useAuth();
  const [medals, setMedals] = useState<Medal[]>([]);
  const [workouts, setWorkouts] = useState<CompletedWorkout[]>([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [medalsRes, workoutsRes] = await Promise.all([
        supabase.from("medals").select("*").eq("user_id", user.id),
        supabase
          .from("completed_workouts")
          .select("*")
          .eq("user_id", user.id)
          .order("completed_at", { ascending: false })
          .limit(10),
      ]);

      if (medalsRes.data) setMedals(medalsRes.data as Medal[]);
      if (workoutsRes.data) {
        setWorkouts(workoutsRes.data as CompletedWorkout[]);
      }

      // Get total count
      const { count } = await supabase
        .from("completed_workouts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      setTotalWorkouts(count ?? 0);
    };

    fetchData();
  }, [user]);

  if (!isApproved) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pb-24">
        <div className="text-center">
          <Lock className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 font-display text-3xl text-foreground">AGUARDANDO APROVAÇÃO</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Seu acesso está sendo analisado pelo administrador.
          </p>
        </div>
      </div>
    );
  }

  const nextMedal = medalTargets.find((m) => totalWorkouts < m.threshold);
  const progressToNext = nextMedal
    ? Math.min((totalWorkouts / nextMedal.threshold) * 100, 100)
    : 100;

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-3xl text-foreground">
        <TrendingUp className="mr-2 inline h-6 w-6 text-primary" />
        MINHA EVOLUÇÃO
      </h1>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
      >
        <Dumbbell className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-2 font-display text-5xl text-primary text-glow">{totalWorkouts}</p>
        <p className="text-sm text-muted-foreground">Treinos concluídos</p>
      </motion.div>

      {/* Next medal progress */}
      {nextMedal && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Próxima medalha: {nextMedal.name}</span>
            <span className="text-primary font-semibold">
              {totalWorkouts}/{nextMedal.threshold}
            </span>
          </div>
          <ProgressBar value={progressToNext} className="mt-2 h-3 bg-secondary" />
        </div>
      )}

      {/* Medals */}
      <h2 className="mt-8 font-display text-2xl text-foreground">
        <Trophy className="mr-2 inline h-5 w-5 text-primary" />
        MEDALHAS
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {medalTargets.map((target) => {
          const earned = medals.find(
            (m) => m.medal_name === target.name
          );
          return (
            <motion.div
              key={target.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex flex-col items-center rounded-xl border p-4 text-center ${
                earned
                  ? "border-primary/30 bg-primary/10 box-glow"
                  : "border-border bg-card opacity-50"
              }`}
            >
              <span className="text-3xl">{target.name.split(" ")[1]}</span>
              <span className="mt-1 text-xs font-medium text-foreground">
                {target.name.split(" ")[0]}
              </span>
              <span className="mt-1 text-[10px] text-muted-foreground">
                {target.threshold} treinos
              </span>
              {earned && (
                <span className="mt-1 text-[10px] text-primary">✓ Conquistada</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent workouts */}
      <h2 className="mt-8 font-display text-2xl text-foreground">ÚLTIMOS TREINOS</h2>
      <div className="mt-4 space-y-2">
        {workouts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            Nenhum treino concluído ainda. Comece agora!
          </p>
        ) : (
          workouts.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium text-foreground">{w.workout_name}</p>
                <p className="text-xs text-muted-foreground">{w.workout_level}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(w.completed_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Progress;
