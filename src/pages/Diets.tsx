import { useState } from "react";
import { motion } from "framer-motion";
import { Salad, Check, X, Play } from "lucide-react";
import { dietPlans, forbiddenFoods, allowedFoods } from "@/data/diets";

const Diets = () => {
  const [selectedDiet, setSelectedDiet] = useState<string>("emagrecimento");

  const diet = dietPlans.find((d) => d.id === selectedDiet)!;

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-4xl tracking-wide text-foreground">
        <Salad className="mb-1 mr-2 inline h-8 w-8 text-primary" />
        DIETAS
      </h1>

      {/* Diet selector */}
      <div className="mt-6 flex flex-wrap gap-2">
        {dietPlans.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDiet(d.id)}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              selectedDiet === d.id
                ? d.color === "primary"
                  ? "gradient-primary text-primary-foreground"
                  : "gradient-accent text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {d.icon} {d.title}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{diet.subtitle}</p>

      {/* Meals */}
      <div className="mt-6 space-y-3">
        <h2 className="font-display text-xl tracking-wide text-foreground">CARDÁPIO DIÁRIO</h2>
        {diet.meals.map((meal, i) => (
          <MealCard key={`${selectedDiet}-${i}`} meal={meal} index={i} />
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8">
        <h2 className="font-display text-xl tracking-wide text-foreground">DICAS</h2>
        <div className="mt-3 space-y-2">
          {diet.tips.map((tip, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Food lists */}
      {selectedDiet === "emagrecimento" && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="flex items-center gap-2 font-display text-lg text-primary">
              <Check className="h-4 w-4" /> PERMITIDOS
            </h3>
            <ul className="mt-3 space-y-1.5">
              {allowedFoods.map((f) => (
                <li key={f} className="text-xs text-foreground">{f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <h3 className="flex items-center gap-2 font-display text-lg text-destructive">
              <X className="h-4 w-4" /> PROIBIDOS
            </h3>
            <ul className="mt-3 space-y-1.5">
              {forbiddenFoods.map((f) => (
                <li key={f} className="text-xs text-foreground">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diets;
