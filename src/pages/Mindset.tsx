import { motion } from "framer-motion";
import { Brain, Quote, Flame, Target, Shield, Zap } from "lucide-react";

const quotes = [
  { text: "Disciplina vence motivação.", icon: Shield },
  { text: "Seu corpo mostra o que você faz no silêncio.", icon: Zap },
  { text: "Você não está cansado, você está sem propósito.", icon: Target },
  { text: "Resultados vêm da constância.", icon: Flame },
  { text: "Se você não muda seus hábitos, você está mentindo para você mesmo.", icon: Brain },
  { text: "O sucesso depende de consistência e disciplina.", icon: Shield },
];

const tips = [
  {
    title: "Déficit e Superávit Calórico",
    description:
      "A perda de gordura ocorre quando se consome menos calorias do que se gasta. O ganho de massa exige um consumo maior.",
  },
  {
    title: "Treinamento de Força",
    description:
      "Preserva a massa muscular durante a queima de gordura e é essencial para o crescimento muscular.",
  },
  {
    title: "Hidratação e Recuperação",
    description:
      "Beba 2 a 3 litros de água diariamente. O sono de 7h é essencial para recuperação e ganho muscular.",
  },
  {
    title: "Progressão de Carga",
    description:
      "Sempre que sentir facilidade nos exercícios, aumente o peso de forma gradual.",
  },
];

const Mindset = () => {
  return (
    <div className="min-h-screen px-4 pb-24 pt-6">
      <h1 className="font-display text-4xl tracking-wide text-foreground">
        <Brain className="mb-1 mr-2 inline h-8 w-8 text-primary" />
        MENTALIDADE
      </h1>

      {/* Quotes */}
      <div className="mt-6 space-y-3">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-primary">
              <q.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <Quote className="mb-1 h-4 w-4 text-primary/50" />
              <p className="font-medium italic text-foreground leading-relaxed">"{q.text}"</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Knowledge */}
      <div className="mt-10">
        <h2 className="font-display text-2xl tracking-wide text-foreground">
          📚 FUNDAMENTOS
        </h2>
        <div className="mt-4 space-y-3">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-display text-lg text-primary">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Challenge CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 rounded-xl gradient-primary p-6 text-center"
      >
        <p className="font-display text-3xl text-primary-foreground">
          🔥 DESAFIO 60 DIAS
        </p>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Comece hoje e surpreenda-se com sua evolução!
        </p>
      </motion.div>
    </div>
  );
};

export default Mindset;
