export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest?: string;
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
          { name: "Supino Reto", sets: "3", reps: "12", rest: "60s" },
          { name: "Supino Inclinado", sets: "3", reps: "12", rest: "60s" },
          { name: "Crucifixo", sets: "3", reps: "15", rest: "45s" },
          { name: "Tríceps Corda", sets: "3", reps: "15", rest: "45s" },
          { name: "Tríceps Francês", sets: "3", reps: "12", rest: "60s" },
        ],
      },
      {
        id: "ini-b",
        day: "Terça-feira",
        focus: "Costas e Bíceps",
        exercises: [
          { name: "Puxada Aberta", sets: "3", reps: "12", rest: "60s" },
          { name: "Remada Baixa", sets: "3", reps: "12", rest: "60s" },
          { name: "Rosca Direta", sets: "3", reps: "15", rest: "45s" },
          { name: "Rosca Alternada", sets: "3", reps: "12", rest: "60s" },
        ],
      },
      {
        id: "ini-c",
        day: "Quarta-feira",
        focus: "Pernas e Ombros",
        exercises: [
          { name: "Agachamento", sets: "3", reps: "12", rest: "90s" },
          { name: "Leg Press", sets: "3", reps: "12", rest: "90s" },
          { name: "Elevação Lateral", sets: "3", reps: "15", rest: "45s" },
          { name: "Desenvolvimento com Halteres", sets: "3", reps: "12", rest: "60s" },
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
          { name: "Supino Reto", sets: "4", reps: "10", rest: "90s" },
          { name: "Supino Inclinado", sets: "4", reps: "10", rest: "60s" },
          { name: "Crucifixo", sets: "3", reps: "12", rest: "45s" },
          { name: "Tríceps Corda", sets: "3", reps: "12", rest: "45s" },
          { name: "Tríceps Francês", sets: "3", reps: "10", rest: "60s" },
        ],
      },
      {
        id: "adv-b",
        day: "Terça-feira",
        focus: "Costas e Bíceps",
        exercises: [
          { name: "Barra Fixa", sets: "4", reps: "8", rest: "90s" },
          { name: "Remada Curvada", sets: "4", reps: "10", rest: "60s" },
          { name: "Puxada Alta", sets: "4", reps: "12", rest: "60s" },
          { name: "Rosca Direta", sets: "4", reps: "12", rest: "45s" },
          { name: "Rosca Martelo", sets: "4", reps: "12", rest: "45s" },
        ],
      },
      {
        id: "adv-c",
        day: "Quarta-feira",
        focus: "Pernas",
        exercises: [
          { name: "Agachamento Livre", sets: "4", reps: "10", rest: "120s" },
          { name: "Leg Press", sets: "4", reps: "12", rest: "90s" },
          { name: "Cadeira Extensora", sets: "4", reps: "12", rest: "60s" },
          { name: "Stiff", sets: "4", reps: "10", rest: "60s" },
          { name: "Panturrilha em Pé", sets: "4", reps: "15", rest: "45s" },
        ],
      },
      {
        id: "adv-d",
        day: "Quinta-feira",
        focus: "Ombros e Abdômen",
        exercises: [
          { name: "Desenvolvimento Militar", sets: "4", reps: "10", rest: "60s" },
          { name: "Elevação Lateral", sets: "4", reps: "12", rest: "45s" },
          { name: "Encolhimento de Ombros", sets: "4", reps: "12", rest: "45s" },
          { name: "Abdominal Infra", sets: "4", reps: "15", rest: "30s" },
          { name: "Prancha", sets: "3", reps: "45s", rest: "30s" },
        ],
      },
      {
        id: "adv-e",
        day: "Sexta-feira",
        focus: "Cardio e HIIT",
        exercises: [
          { name: "Esteira Intervalada", sets: "1", reps: "15 min", rest: "-" },
          { name: "Pular Corda", sets: "1", reps: "10 min", rest: "60s" },
          { name: "Burpees", sets: "3", reps: "40s", rest: "20s" },
          { name: "Polichinelos", sets: "3", reps: "40s", rest: "20s" },
          { name: "Mountain Climbers", sets: "3", reps: "40s", rest: "20s" },
        ],
      },
    ],
  },
];
