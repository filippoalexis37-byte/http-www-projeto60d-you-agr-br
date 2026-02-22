import { motion } from "framer-motion";
import { Flame, Dumbbell, Target, Trophy, ChevronRight, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fitness.jpg";

const benefits = [
  { icon: Dumbbell, text: "Treinos para todos os níveis" },
  { icon: Flame, text: "Dietas personalizadas" },
  { icon: Target, text: "Plano de 60 dias completo" },
  { icon: Trophy, text: "Medalhas e acompanhamento" },
];

const testimonials = [
  {
    name: "Carlos M.",
    text: "Perdi 12kg em 60 dias seguindo o plano à risca. Mudou minha vida!",
    result: "-12kg",
  },
  {
    name: "Ana P.",
    text: "Ganhei massa muscular e autoconfiança. O app é completo demais!",
    result: "+5kg massa",
  },
  {
    name: "Rafael S.",
    text: "As medalhas me motivaram a nunca faltar. Disciplina virou hábito!",
    result: "100 treinos",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Transformação corporal"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-display text-6xl tracking-wider text-foreground sm:text-8xl">
              PROJETO <span className="text-primary text-glow">60D</span>
            </h1>
            <p className="mt-2 font-display text-2xl tracking-widest text-secondary-foreground sm:text-3xl">
              TRANSFORMAÇÃO REAL
            </p>
            <p className="mx-auto mt-6 max-w-md text-lg font-light leading-relaxed text-muted-foreground">
              O programa completo de treino, dieta e mentalidade para transformar seu corpo em 60 dias.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="gradient-primary px-8 py-6 text-lg font-bold text-primary-foreground box-glow"
              >
                COMEÇAR AGORA <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth?mode=login")}
                className="border-primary/30 px-8 py-6 text-lg"
              >
                JÁ TENHO CONTA
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <section className="px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-display text-4xl tracking-wide text-foreground"
        >
          O QUE VOCÊ <span className="text-primary text-glow">RECEBE</span>
        </motion.h2>

        <div className="mx-auto mt-10 grid max-w-md gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                <b.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium text-foreground">{b.text}</span>
              <CheckCircle className="ml-auto h-5 w-5 text-primary" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-display text-4xl tracking-wide text-foreground"
        >
          RESULTADOS <span className="text-primary text-glow">REAIS</span>
        </motion.h2>

        <div className="mx-auto mt-10 grid max-w-md gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-6"
            >
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground italic">"{t.text}"</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
                <span className="rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md rounded-2xl border border-primary/30 bg-card p-8 box-glow"
        >
          <p className="font-display text-3xl text-primary text-glow">🔥 COMECE HOJE</p>
          <p className="mt-3 text-muted-foreground">
            "Se você não muda seus hábitos, você está mentindo para você mesmo."
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="mt-6 w-full gradient-primary py-6 text-lg font-bold text-primary-foreground"
          >
            QUERO TRANSFORMAR MEU CORPO
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
