import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Dumbbell } from "lucide-react";

type Level = "iniciante" | "intermediario" | "avancado";

interface Supplement {
  name: string;
  description: string;
  benefits: string[];
  dosage: string;
  timing: string;
  needsPrescription: boolean;
  warning?: string;
}

const supplements: Record<Level, Supplement[]> = {
  iniciante: [
    {
      name: "Whey Protein",
      description: "Proteína do soro do leite, a mais popular e eficaz para ganho muscular.",
      benefits: ["Recuperação muscular", "Praticidade no pós-treino", "Alto valor biológico"],
      dosage: "1 scoop (30g) por dia",
      timing: "Pós-treino ou entre refeições",
      needsPrescription: false,
    },
    {
      name: "Creatina Monohidratada",
      description: "Suplemento mais estudado do mundo. Aumenta força e volume muscular.",
      benefits: ["Aumento de força", "Melhor performance", "Volumização celular"],
      dosage: "3-5g por dia (todos os dias)",
      timing: "Qualquer horário, de preferência com uma refeição",
      needsPrescription: false,
    },
    {
      name: "Multivitamínico",
      description: "Cobre possíveis deficiências nutricionais do dia a dia.",
      benefits: ["Saúde geral", "Imunidade", "Disposição"],
      dosage: "1 cápsula por dia",
      timing: "Com o café da manhã",
      needsPrescription: false,
    },
  ],
  intermediario: [
    {
      name: "Whey Protein Isolado",
      description: "Versão mais pura do whey, com menos lactose e gordura.",
      benefits: ["Absorção rápida", "Menos desconforto gástrico", "Mais proteína por dose"],
      dosage: "1-2 scoops por dia",
      timing: "Pós-treino e/ou ao acordar",
      needsPrescription: false,
    },
    {
      name: "Creatina Monohidratada",
      description: "Continua sendo essencial. Consistência é a chave.",
      benefits: ["Aumento de força máxima", "Melhor recuperação", "Performance em séries intensas"],
      dosage: "5g por dia",
      timing: "Diariamente, mesmo em dias de descanso",
      needsPrescription: false,
    },
    {
      name: "BCAA / EAA",
      description: "Aminoácidos essenciais que auxiliam na recuperação e redução do catabolismo.",
      benefits: ["Anti-catabolismo", "Recuperação muscular", "Resistência ao treino"],
      dosage: "5-10g por dia",
      timing: "Intra-treino ou pós-treino",
      needsPrescription: false,
    },
    {
      name: "Ômega 3 (EPA/DHA)",
      description: "Ácidos graxos essenciais com ação anti-inflamatória.",
      benefits: ["Saúde cardiovascular", "Anti-inflamatório", "Saúde articular"],
      dosage: "1-2g de EPA+DHA por dia",
      timing: "Com refeições que contenham gordura",
      needsPrescription: false,
    },
    {
      name: "Pré-Treino",
      description: "Contém cafeína e outros estimulantes para potencializar o treino.",
      benefits: ["Mais energia", "Foco mental", "Vasodilatação"],
      dosage: "1 dose conforme rótulo",
      timing: "30 minutos antes do treino",
      needsPrescription: false,
      warning: "Evite se tiver problemas cardíacos, pressão alta ou sensibilidade à cafeína. Consulte seu médico.",
    },
  ],
  avancado: [
    {
      name: "Whey Protein Hidrolisado",
      description: "Absorção ultra-rápida, ideal para protocolos avançados de recuperação.",
      benefits: ["Digestão extremamente rápida", "Ideal para pós-treino imediato", "Mínimo resíduo gástrico"],
      dosage: "1-2 scoops por dia",
      timing: "Imediatamente pós-treino",
      needsPrescription: false,
    },
    {
      name: "Creatina + HMB",
      description: "Combinação para maximizar força e minimizar perda muscular em cutting.",
      benefits: ["Sinergia de força", "Anti-catabolismo avançado", "Manutenção de massa magra"],
      dosage: "5g creatina + 3g HMB por dia",
      timing: "Creatina com refeição, HMB dividido em 3 doses",
      needsPrescription: false,
    },
    {
      name: "Glutamina",
      description: "Aminoácido que auxilia na recuperação e saúde intestinal.",
      benefits: ["Recuperação muscular", "Saúde intestinal", "Imunidade"],
      dosage: "5-10g por dia",
      timing: "Pós-treino e antes de dormir",
      needsPrescription: false,
    },
    {
      name: "Cafeína Anidra",
      description: "Estimulante puro para performance máxima no treino.",
      benefits: ["Foco extremo", "Aumento de força", "Queima de gordura"],
      dosage: "200-400mg",
      timing: "30-45 min antes do treino",
      needsPrescription: false,
      warning: "Dose máxima recomendada: 400mg/dia. Não use se tiver arritmia, ansiedade ou insônia. Consulte seu médico.",
    },
    {
      name: "Vitamina D3 + K2",
      description: "Essencial para saúde óssea e absorção de cálcio.",
      benefits: ["Saúde óssea", "Regulação hormonal", "Imunidade"],
      dosage: "2000-5000 UI D3 + 100mcg K2",
      timing: "Com refeição gordurosa",
      needsPrescription: false,
      warning: "Doses acima de 4000 UI/dia devem ser monitoradas com exame de sangue.",
    },
    {
      name: "ZMA (Zinco + Magnésio + B6)",
      description: "Auxilia na qualidade do sono e recuperação hormonal.",
      benefits: ["Melhor sono", "Recuperação hormonal", "Redução de câimbras"],
      dosage: "1 dose conforme rótulo",
      timing: "30 min antes de dormir, com estômago vazio",
      needsPrescription: false,
    },
  ],
};

const levelConfig: Record<Level, { label: string; color: string; bg: string }> = {
  iniciante: { label: "🟢 Iniciante", color: "text-primary", bg: "border-primary/30 bg-primary/5" },
  intermediario: { label: "🟡 Intermediário", color: "text-accent", bg: "border-accent/30 bg-accent/5" },
  avancado: { label: "🔴 Avançado", color: "text-destructive", bg: "border-destructive/30 bg-destructive/5" },
};

const SupplementCard = ({ supp }: { supp: Supplement }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <Pill className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="font-semibold text-foreground">{supp.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{supp.description}</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">{supp.description}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Benefícios</p>
                <div className="flex flex-wrap gap-1.5">
                  {supp.benefits.map((b) => (
                    <span key={b} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary font-medium">{b}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Dosagem</p>
                  <p className="text-sm font-semibold text-foreground">{supp.dosage}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Quando Tomar</p>
                  <p className="text-sm font-semibold text-foreground">{supp.timing}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                {supp.needsPrescription ? (
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                )}
                <p className="text-xs text-muted-foreground">
                  {supp.needsPrescription
                    ? "⚠️ Necessita prescrição médica"
                    : "✅ Não necessita prescrição médica (venda livre)"}
                </p>
              </div>

              {supp.warning && (
                <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-accent">{supp.warning}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Supplements = () => {
  const [level, setLevel] = useState<Level>("iniciante");

  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-3xl tracking-wide text-foreground">
        <Dumbbell className="mb-1 mr-2 inline h-7 w-7 text-primary" />
        SUPLEMENTOS
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Guia completo por nível de experiência
      </p>

      {/* Level selector */}
      <div className="mt-5 flex gap-2">
        {(Object.keys(levelConfig) as Level[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`flex-1 rounded-lg px-2 py-2.5 text-[11px] font-semibold transition-all ${
              level === lvl
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {levelConfig[lvl].label}
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/5 p-4"
      >
        <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-accent">Aviso Importante</p>
          <p className="text-xs text-muted-foreground mt-1">
            Consulte sempre um médico ou nutricionista antes de iniciar qualquer suplementação.
            As informações aqui são educativas e não substituem orientação profissional.
          </p>
        </div>
      </motion.div>

      {/* Supplements list */}
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 space-y-3"
      >
        {supplements[level].map((supp) => (
          <SupplementCard key={supp.name} supp={supp} />
        ))}
      </motion.div>

      {/* Footer tip */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Dica:</strong> Comece pelos suplementos básicos (Whey + Creatina) e evolua conforme sua experiência e necessidade. Mais não é sempre melhor!
        </p>
      </div>
    </div>
  );
};

export default Supplements;
