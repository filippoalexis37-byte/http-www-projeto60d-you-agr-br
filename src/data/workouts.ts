export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest?: string;
  videoUrl?: string;
}

export interface Workout {
  id: string;
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  level: "iniciante" | "avancado";
  title: string;
  description: string;
  frequency: string;
  workouts: Workout[];
}

export const workoutPlans: WorkoutPlan[] = [
  {
    id: "iniciante",
    level: "iniciante",
    title: "Treino Iniciante",
    description: "Primeiro 30 dias – Divisão ABC",
    frequency: "3-5x por semana",
    workouts: [
      {
        id: "ini-a",
        day: "Segunda-feira",
        focus: "Peito e Tríceps",
        exercises: [
          { name: "Supino Reto", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg" },
          { name: "Supino Inclinado", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8" },
          { name: "Crucifixo", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/eozdVDA78K0" },
          { name: "Tríceps Corda", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/kiuVA0gs3EI" },
          { name: "Tríceps Francês", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc" },
        ],
      },
      {
        id: "ini-b",
        day: "Terça-feira",
        focus: "Costas e Bíceps",
        exercises: [
          { name: "Puxada Aberta", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" },
          { name: "Remada Baixa", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/GZbfZ033f74" },
          { name: "Rosca Direta", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
          { name: "Rosca Alternada", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/sAq_ocpRh_I" },
        ],
      },
      {
        id: "ini-c",
        day: "Quarta-feira",
        focus: "Pernas e Ombros",
        exercises: [
          { name: "Agachamento", sets: "3", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Leg Press", sets: "3", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Elevação Lateral", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
          { name: "Desenvolvimento com Halteres", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
        ],
      },
    ],
  },
  {
    id: "avancado",
    level: "avancado",
    title: "Treino Avançado",
    description: "Segundo mês – Divisão ABCDE",
    frequency: "5x por semana",
    workouts: [
      {
        id: "adv-a",
        day: "Segunda-feira",
        focus: "Peito e Tríceps",
        exercises: [
          { name: "Supino Reto", sets: "4", reps: "10", rest: "90s", videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg" },
          { name: "Supino Inclinado", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8" },
          { name: "Crucifixo", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/eozdVDA78K0" },
          { name: "Tríceps Corda", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/kiuVA0gs3EI" },
          { name: "Tríceps Francês", sets: "3", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc" },
        ],
      },
      {
        id: "adv-b",
        day: "Terça-feira",
        focus: "Costas e Bíceps",
        exercises: [
          { name: "Barra Fixa", sets: "4", reps: "8", rest: "90s", videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g" },
          { name: "Remada Curvada", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/9efgcGjQe_s" },
          { name: "Puxada Alta", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" },
          { name: "Rosca Direta", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
          { name: "Rosca Martelo", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4" },
        ],
      },
      {
        id: "adv-c",
        day: "Quarta-feira",
        focus: "Pernas",
        exercises: [
          { name: "Agachamento Livre", sets: "4", reps: "10", rest: "120s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Leg Press", sets: "4", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Cadeira Extensora", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0" },
          { name: "Stiff", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Panturrilha em Pé", sets: "4", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI" },
        ],
      },
      {
        id: "adv-d",
        day: "Quinta-feira",
        focus: "Ombros e Abdômen",
        exercises: [
          { name: "Desenvolvimento Militar", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
          { name: "Elevação Lateral", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
          { name: "Encolhimento de Ombros", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/cJRVVxmytaM" },
          { name: "Abdominal Infra", sets: "4", reps: "15", rest: "30s", videoUrl: "https://www.youtube.com/embed/1fbU_MkV7NE" },
          { name: "Prancha", sets: "3", reps: "45s", rest: "30s", videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c" },
        ],
      },
      {
        id: "adv-e",
        day: "Sexta-feira",
        focus: "Cardio e HIIT",
        exercises: [
          { name: "Esteira Intervalada", sets: "1", reps: "15 min", rest: "-", videoUrl: "https://www.youtube.com/embed/H4gMdKErVl0" },
          { name: "Pular Corda", sets: "1", reps: "10 min", rest: "60s", videoUrl: "https://www.youtube.com/embed/u3zgHI8QnqE" },
          { name: "Burpees", sets: "3", reps: "40s", rest: "20s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
          { name: "Polichinelos", sets: "3", reps: "40s", rest: "20s", videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8" },
          { name: "Mountain Climbers", sets: "3", reps: "40s", rest: "20s", videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM" },
        ],
      },
    ],
  },
];
