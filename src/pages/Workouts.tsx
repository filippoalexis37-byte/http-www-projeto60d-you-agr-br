import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Dumbbell, Play } from "lucide-react";
import { workoutPlans, type Workout } from "@/data/workouts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Workouts = () => {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>("iniciante");
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(0);

  const plan = workoutPlans.find((p) => p.id === selectedLevel)!;

  // Simple Timer
  import("react").then((React) => {
    React.useEffect(() => {
      let interval: NodeJS.Timeout;
      if (expandedWorkout) {
        if (!startTime) setStartTime(Date.now());
        interval = setInterval(() => {
          setTimer(Math.floor((Date.now() - (startTime || Date.now())) / 1000));
        }, 1000);
      } else {
        setStartTime(null);
        setTimer(0);
      }
      return () => clearInterval(interval);
    }, [expandedWorkout, startTime]);
  });

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishWorkout = async (workout: Workout) => {
    if (!user) return;
    try {
      const { error } = await supabase.from('completed_workouts').insert({
        user_id: user.id,
        workout_name: workout.focus,
        workout_level: selectedLevel
      });
      if (error) throw error;
      toast.success("Treino concluído com sucesso! Verifique suas medalhas em Evolução.");
      setExpandedWorkout(null);
      setCompletedExercises(new Set());
    } catch (err) {
      toast.error("Erro ao salvar treino.");
      console.error(err);
    }
  };

  const toggleExercise = (exerciseKey: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseKey)) next.delete(exerciseKey);
      else next.add(exerciseKey);
      return next;
    });
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-4xl tracking-wide text-foreground">
        <Dumbbell className="mb-1 mr-2 inline h-8 w-8 text-primary" />
        TREINOS
      </h1>

      <div className="mt-4 rounded-xl overflow-hidden relative h-32 w-full border border-border">
        {selectedLevel === 'gravidas' ? (
          <img src="https://images.unsplash.com/photo-1557002664-c98ebdf2cb2a?w=800&auto=format&fit=crop&q=60" alt="Gestante Treinando" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        ) : selectedLevel.includes('fem-') ? (
          <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60" alt="Mulher Treinando" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        ) : (
          <div className="absolute inset-0 gradient-primary opacity-20"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <h2 className="text-xl font-bold text-white shadow-sm">{plan.title}</h2>
        </div>
      </div>

      {/* Level selector */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {workoutPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedLevel(p.id);
              setExpandedWorkout(null);
            }}
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              selectedLevel === p.id
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {plan.description} • {plan.frequency}
      </p>

      {/* Workouts */}
      <div className="mt-6 space-y-3">
        {plan.workouts.map((workout: Workout) => {
          const isExpanded = expandedWorkout === workout.id;
          const completed = workout.exercises.filter((_, i) =>
            completedExercises.has(`${workout.id}-${i}`)
          ).length;

          return (
            <motion.div
              key={workout.id}
              layout
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <button
                onClick={() => setExpandedWorkout(isExpanded ? null : workout.id)}
                className="flex w-full items-center gap-4 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                  <Dumbbell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{workout.focus}</p>
                  <p className="text-xs text-muted-foreground">{workout.day}</p>
                </div>
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                  {completed}/{workout.exercises.length}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-secondary/30 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        ⏱️ Tempo total: {formatTime(timer)}
                      </span>
                    </div>
                    <div className="space-y-2 border-t border-border px-4 py-3">
                      {workout.exercises.map((ex, i) => {
                        const key = `${workout.id}-${i}`;
                        const done = completedExercises.has(key);
                        return (
                          <div key={i} className="space-y-1">
                            <button
                              onClick={() => toggleExercise(key)}
                              className={`flex w-full items-center gap-3 rounded-lg p-3 transition-all ${
                                done ? "bg-primary/10" : "bg-secondary/50"
                              }`}
                            >
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  done
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/30"
                                }`}
                              >
                                {done && <Check className="h-4 w-4 text-primary-foreground" />}
                              </div>
                              <div className="flex-1 text-left">
                                <p className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                  {ex.name}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold text-primary">
                                  {ex.sets}x{ex.reps}
                                </p>
                                {ex.rest && ex.rest !== "-" && (
                                  <p className="text-[10px] text-muted-foreground">
                                    Descanso: {ex.rest}
                                  </p>
                                )}
                              </div>
                              {ex.videoUrl && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPlayingVideo(playingVideo === key ? null : key);
                                  }}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                >
                                  <Play className="h-4 w-4" />
                                </div>
                              )}
                            </button>
                            {playingVideo === key && ex.videoUrl && (
                              <div className="overflow-hidden rounded-lg">
                                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                  <iframe
                                    src={ex.videoUrl}
                                    title={ex.name}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {completed === workout.exercises.length && (
                        <div className="mt-4 pb-2">
                          <Button 
                            onClick={() => handleFinishWorkout(workout)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                          >
                            <Check className="w-5 h-5 mr-2" />
                            Finalizar Treino
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Workouts;
