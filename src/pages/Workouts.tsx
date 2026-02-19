import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Dumbbell } from "lucide-react";
import { workoutPlans, type Workout } from "@/data/workouts";

const Workouts = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("iniciante");
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const plan = workoutPlans.find((p) => p.id === selectedLevel)!;

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

      {/* Level selector */}
      <div className="mt-6 flex gap-2">
        {workoutPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedLevel(p.id);
              setExpandedWorkout(null);
            }}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              selectedLevel === p.id
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {p.level === "iniciante" ? "🔰 Iniciante" : "🧠 Avançado"}
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
                <span className="text-xs text-primary">
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
                    <div className="space-y-2 border-t border-border px-4 py-3">
                      {workout.exercises.map((ex, i) => {
                        const key = `${workout.id}-${i}`;
                        const done = completedExercises.has(key);
                        return (
                          <button
                            key={i}
                            onClick={() => toggleExercise(key)}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-all ${
                              done ? "bg-primary/10" : "bg-secondary/50"
                            }`}
                          >
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all ${
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
                          </button>
                        );
                      })}
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
