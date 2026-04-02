import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame, Dumbbell, Target, Trophy, ChevronRight, CheckCircle,
  Star, Zap, Brain, Clock, Shield, Users, TrendingUp, Award,
  Calendar, Heart, BarChart3, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-fitness.jpg";

const benefits = [
  { icon: Dumbbell, title: "Treinos Progressivos", text: "Do iniciante ao avançado, com vídeos de cada exercício" },
  { icon: Flame, title: "Dietas Sob Medida", text: "Planos alimentares para cutting, bulking e manutenção" },
  { icon: Brain, title: "Mentalidade Vencedora", text: "Técnicas de disciplina, foco e hábitos duradouros" },
  { icon: Trophy, title: "Medalhas & Conquistas", text: "Gamificação para te manter motivado todos os dias" },
  { icon: BarChart3, title: "Acompanhamento Real", text: "Veja sua evolução com dados e estatísticas" },
  { icon: Clock, title: "Suporte 60 Dias", text: "Acompanhamento completo durante toda jornada" },
];

const testimonials = [
  {
    name: "Carlos M.",
    age: "28 anos",
    text: "Perdi 12kg em 60 dias seguindo o plano à risca. Nunca pensei que conseguiria, mas o app me deu disciplina e clareza. Mudou minha vida!",
    result: "-12kg",
    avatar: "CM",
  },
  {
    name: "Ana P.",
    age: "32 anos",
    text: "Ganhei massa muscular e autoconfiança. Os vídeos dos exercícios são muito claros, não precisei de personal trainer!",
    result: "+5kg massa",
    avatar: "AP",
  },
  {
    name: "Rafael S.",
    age: "24 anos",
    text: "As medalhas me motivaram a nunca faltar. Em 60 dias completei 100 treinos e o hábito ficou automático.",
    result: "100 treinos",
    avatar: "RS",
  },
];

const stats = [
  { value: "2.500+", label: "Alunos ativos" },
  { value: "60", label: "Dias de programa" },
  { value: "97%", label: "Taxa de satisfação" },
  { value: "12kg", label: "Perda média" },
];

const timeline = [
  { week: "Semana 1-2", title: "Adaptação", desc: "Treinos iniciantes + ajuste alimentar", icon: Target },
  { week: "Semana 3-4", title: "Progressão", desc: "Aumento de intensidade + hábitos sólidos", icon: TrendingUp },
  { week: "Semana 5-6", title: "Intensificação", desc: "Treinos avançados + resultados visíveis", icon: Zap },
  { week: "Semana 7-8", title: "Transformação", desc: "Corpo e mente transformados", icon: Award },
];

const faqs = [
  { q: "Preciso de academia?", a: "Sim, os treinos são voltados para academia com equipamentos como barras, halteres e máquinas." },
  { q: "Funciona para iniciantes?", a: "Sim! O programa começa com treinos adaptados para quem nunca treinou e vai progredindo gradualmente." },
  { q: "Posso fazer em casa?", a: "O programa é otimizado para academia, mas adaptações são possíveis com equipamentos básicos." },
  { q: "E se eu não gostar?", a: "Você pode testar por 7 dias gratuitamente antes de decidir continuar." },
];

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <div className="relative min-h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Transformação corporal em 60 dias"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />

        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Vagas limitadas
              </span>
            </motion.div>

            <h1 className="font-display text-6xl tracking-wider text-foreground sm:text-8xl">
              PROJETO <span className="text-primary text-glow">60D</span>
            </h1>
            <p className="mt-1 font-display text-2xl tracking-widest text-secondary-foreground sm:text-3xl">
              TRANSFORMAÇÃO REAL
            </p>
            <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
              O programa completo de <strong className="text-foreground">treino, dieta e mentalidade</strong> que já
              transformou milhares de corpos em apenas 60 dias.
            </p>

            <div className="mt-8">
              <Button
                size="lg"
                className="gradient-primary px-10 py-7 text-xl font-bold text-primary-foreground box-glow"
              >
                COMEÇAR AGORA <ChevronRight className="ml-1 h-6 w-6" />
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                🔒 7 dias grátis · Cancele quando quiser
              </p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronRight className="h-6 w-6 rotate-90 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <section className="border-y border-border bg-card/50 py-8">
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-6 px-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl text-primary text-glow">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Tudo que você precisa</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            O QUE VOCÊ <span className="text-primary text-glow">RECEBE</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-lg gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg gradient-primary">
                <b.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{b.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{b.text}</p>
              </div>
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline / How it works */}
      <section className="bg-card/30 px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Passo a passo</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            SUA <span className="text-primary text-glow">JORNADA</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-lg">
          {timeline.map((step, i) => (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {/* Line */}
              {i < timeline.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
              )}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary box-glow">
                <step.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{step.week}</p>
                <p className="mt-1 text-lg font-bold text-foreground">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Prova social</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            RESULTADOS <span className="text-primary text-glow">REAIS</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-lg gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-primary/20 bg-card p-6"
            >
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                "{t.text}"
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.age}</p>
                  </div>
                </div>
                <span className="rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground box-glow">
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's included breakdown */}
      <section className="bg-card/30 px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Conteúdo completo</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            DENTRO DO <span className="text-primary text-glow">PROGRAMA</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-lg gap-4">
          {[
            { icon: Dumbbell, title: "Treinos com vídeos", items: ["Divisão ABC para iniciantes", "Divisão ABCDE avançada", "Vídeo demonstrativo em cada exercício", "Rastreamento de treinos concluídos"] },
            { icon: Heart, title: "Nutrição inteligente", items: ["Dieta cutting (emagrecimento)", "Dieta bulking (ganho de massa)", "Dieta manutenção", "Listas de alimentos e substituições"] },
            { icon: Brain, title: "Mindset & Disciplina", items: ["Técnicas de foco e motivação", "Construção de hábitos", "Mentalidade de campeão", "Superação de barreiras"] },
            { icon: Trophy, title: "Gamificação", items: ["Medalhas Bronze, Prata e Ouro", "Rastreamento de evolução", "Metas progressivas", "Histórico de conquistas"] },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                  <section.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground">{section.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dúvidas frequentes</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            PERGUNTAS <span className="text-primary text-glow">COMUNS</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-lg space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="font-semibold text-foreground">{faq.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg rounded-2xl border border-primary/30 bg-card p-10 box-glow"
        >
          <Flame className="mx-auto h-12 w-12 text-primary" />
          <p className="mt-4 font-display text-4xl text-primary text-glow">COMECE HOJE</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cada dia que você adia é um dia a menos de resultado. 
            <strong className="text-foreground"> Sua transformação começa agora.</strong>
          </p>

          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-primary" /> 7 dias grátis</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-primary" /> 60 dias</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" /> Suporte</span>
          </div>

          <Button
            size="lg"
            className="mt-8 w-full gradient-primary py-7 text-xl font-bold text-primary-foreground box-glow"
          >
            QUERO TRANSFORMAR MEU CORPO
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            🔒 Pagamento seguro · Cancele quando quiser
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center">
        <p className="font-display text-lg text-foreground">
          PROJETO <span className="text-primary">60D</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          © 2025 Projeto 60D – Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Landing;
