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
  level: "iniciante" | "intermediario" | "avancado";
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
    frequency: "3x por semana",
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
          { name: "Puxada Fechada", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/an1BMInTXLk" },
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
          { name: "Cadeira Extensora", sets: "3", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0" },
          { name: "Elevação Lateral", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
          { name: "Desenvolvimento com Halteres", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
        ],
      },
    ],
  },
  {
    id: "intermediario",
    level: "intermediario",
    title: "Treino Intermediário",
    description: "Segundo mês – Divisão ABCD",
    frequency: "4x por semana",
    workouts: [
      {
        id: "int-a",
        day: "Segunda-feira",
        focus: "Peito",
        exercises: [
          { name: "Supino Reto com Barra", sets: "4", reps: "10", rest: "90s", videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg" },
          { name: "Supino Inclinado Halteres", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8" },
          { name: "Crucifixo Inclinado", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/eozdVDA78K0" },
          { name: "Cross Over", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/taI4XduLpTk" },
          { name: "Flexão de Braço", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
        ],
      },
      {
        id: "int-b",
        day: "Terça-feira",
        focus: "Costas",
        exercises: [
          { name: "Puxada Aberta", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" },
          { name: "Remada Curvada", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/9efgcGjQe_s" },
          { name: "Remada Unilateral", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/pYcpY20QaE8" },
          { name: "Pullover", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/FK4rHfWKEac" },
          { name: "Remada Cavalinho", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/GZbfZ033f74" },
        ],
      },
      {
        id: "int-c",
        day: "Quarta-feira",
        focus: "Pernas Completo",
        exercises: [
          { name: "Agachamento Livre", sets: "4", reps: "10", rest: "120s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Leg Press 45°", sets: "4", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Cadeira Extensora", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0" },
          { name: "Mesa Flexora", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
          { name: "Stiff", sets: "3", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Panturrilha Sentado", sets: "4", reps: "15", rest: "30s", videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI" },
        ],
      },
      {
        id: "int-d",
        day: "Quinta-feira",
        focus: "Ombros, Bíceps e Tríceps",
        exercises: [
          { name: "Desenvolvimento Militar", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
          { name: "Elevação Lateral", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
          { name: "Elevação Frontal", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/gzDSuGMcUlE" },
          { name: "Rosca Direta Barra W", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
          { name: "Rosca Martelo", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4" },
          { name: "Tríceps Pulley", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/kiuVA0gs3EI" },
          { name: "Tríceps Testa", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc" },
        ],
      },
    ],
  },
  {
    id: "avancado",
    level: "avancado",
    title: "Treino Avançado",
    description: "Terceiro mês – Divisão ABCDE",
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
          { name: "Cross Over", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/taI4XduLpTk" },
          { name: "Tríceps Corda", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/kiuVA0gs3EI" },
          { name: "Tríceps Francês", sets: "3", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc" },
          { name: "Mergulho", sets: "3", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As" },
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
          { name: "Remada Cavalinho", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/GZbfZ033f74" },
          { name: "Rosca Direta", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
          { name: "Rosca Martelo", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4" },
          { name: "Rosca Scott", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/sAq_ocpRh_I" },
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
          { name: "Mesa Flexora", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
          { name: "Stiff", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Avanço", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
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
          { name: "Elevação Frontal", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/gzDSuGMcUlE" },
          { name: "Encolhimento de Ombros", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/cJRVVxmytaM" },
          { name: "Face Pull", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/rep-qVOkqgk" },
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
          { name: "Sprint no Lugar", sets: "3", reps: "30s", rest: "30s", videoUrl: "https://www.youtube.com/embed/H4gMdKErVl0" },
        ],
      },
    ],
  },
  {
    id: "fem-iniciante",
    level: "iniciante",
    title: "Feminino Iniciante",
    description: "Foco em Pernas e Glúteos - Nível Inicial",
    frequency: "3x por semana",
    workouts: [
      {
        id: "fem-ini-a",
        day: "Segunda-feira",
        focus: "Pernas e Glúteos",
        exercises: [
          { name: "Agachamento Livre", sets: "3", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Elevação Pélvica", sets: "3", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/8rYqDqI25v8" },
          { name: "Cadeira Abdutora", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/Z0oYpM8k29I" },
          { name: "Cadeira Extensora", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0" },
        ]
      },
      {
        id: "fem-ini-b",
        day: "Quarta-feira",
        focus: "Membros Superiores e Core",
        exercises: [
          { name: "Puxada Aberta", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" },
          { name: "Supino com Halteres", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8" },
          { name: "Desenvolvimento de Ombros", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
          { name: "Prancha Abdominal", sets: "3", reps: "30s", rest: "45s", videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c" },
        ]
      },
      {
        id: "fem-ini-c",
        day: "Sexta-feira",
        focus: "Posterior e Glúteos",
        exercises: [
          { name: "Stiff", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Mesa Flexora", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
          { name: "Glúteo 4 Apoios", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/D_3T7N-A7Z0" },
          { name: "Panturrilha em Pé", sets: "3", reps: "20", rest: "45s", videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI" },
        ]
      }
    ]
  },
  {
    id: "fem-intermediario",
    level: "intermediario",
    title: "Feminino Intermediário",
    description: "Definição e Ganho de Massa Magra",
    frequency: "4x por semana",
    workouts: [
      {
        id: "fem-int-a",
        day: "Segunda-feira",
        focus: "Quadríceps e Glúteos",
        exercises: [
          { name: "Agachamento Sumô", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Leg Press 45°", sets: "4", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Afundo", sets: "3", reps: "10 (cada perna)", rest: "60s", videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
          { name: "Extensora (Drop Set)", sets: "3", reps: "10+10", rest: "60s", videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0" },
        ]
      },
      {
        id: "fem-int-b",
        day: "Terça-feira",
        focus: "Costas, Bíceps e Cardio",
        exercises: [
          { name: "Remada Baixa", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/GZbfZ033f74" },
          { name: "Puxada Triângulo", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/an1BMInTXLk" },
          { name: "Rosca Martelo", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4" },
          { name: "Esteira (HIIT)", sets: "1", reps: "15 min", rest: "-", videoUrl: "https://www.youtube.com/embed/H4gMdKErVl0" },
        ]
      },
      {
        id: "fem-int-c",
        day: "Quinta-feira",
        focus: "Posterior e Glúteos",
        exercises: [
          { name: "Elevação Pélvica Pesada", sets: "4", reps: "10", rest: "90s", videoUrl: "https://www.youtube.com/embed/8rYqDqI25v8" },
          { name: "Stiff com Barra", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Cadeira Flexora", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
          { name: "Abdução de Quadril", sets: "3", reps: "20", rest: "45s", videoUrl: "https://www.youtube.com/embed/Z0oYpM8k29I" },
        ]
      },
      {
        id: "fem-int-d",
        day: "Sexta-feira",
        focus: "Ombros, Tríceps e Abdômen",
        exercises: [
          { name: "Elevação Lateral", sets: "4", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
          { name: "Desenvolvimento Halteres", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
          { name: "Tríceps Corda", sets: "4", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/kiuVA0gs3EI" },
          { name: "Abdominal Infra", sets: "4", reps: "20", rest: "30s", videoUrl: "https://www.youtube.com/embed/1fbU_MkV7NE" },
        ]
      }
    ]
  },
  {
    id: "fem-avancado",
    level: "avancado",
    title: "Feminino Avançado",
    description: "Máxima Performance e Hipertrofia",
    frequency: "5x por semana",
    workouts: [
      {
        id: "fem-adv-a",
        day: "Segunda-feira",
        focus: "Glúteos (Ênfase Total)",
        exercises: [
          { name: "Elevação Pélvica (Pirâmide)", sets: "5", reps: "12/10/8/6/15", rest: "120s", videoUrl: "https://www.youtube.com/embed/8rYqDqI25v8" },
          { name: "Agachamento Búlgaro", sets: "4", reps: "10", rest: "90s", videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As" },
          { name: "Cadeira Abdutora (Inclinada)", sets: "4", reps: "15 (Rest-Pause)", rest: "45s", videoUrl: "https://www.youtube.com/embed/Z0oYpM8k29I" },
          { name: "Glúteo no Cabo", sets: "4", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/D_3T7N-A7Z0" },
        ]
      },
      {
        id: "fem-adv-b",
        day: "Terça-feira",
        focus: "Costas e Ombros",
        exercises: [
          { name: "Puxada Aberta", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" },
          { name: "Remada Curvada Halter", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/pYcpY20QaE8" },
          { name: "Desenvolvimento Militar", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog" },
          { name: "Elevação Lateral + Frontal", sets: "3", reps: "12+12", rest: "60s", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
        ]
      },
      {
        id: "fem-adv-c",
        day: "Quarta-feira",
        focus: "Quadríceps e Panturrilha",
        exercises: [
          { name: "Agachamento Livre", sets: "4", reps: "8-10", rest: "120s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Leg Press 45°", sets: "4", reps: "15", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Hack Machine", sets: "4", reps: "12", rest: "90s", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
          { name: "Panturrilha Sentada", sets: "5", reps: "20", rest: "30s", videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI" },
        ]
      },
      {
        id: "fem-adv-d",
        day: "Quinta-feira",
        focus: "Posterior e Glúteos",
        exercises: [
          { name: "Terra Sumô", sets: "4", reps: "8", rest: "120s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Stiff com Halteres", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE" },
          { name: "Mesa Flexora", sets: "4", reps: "10 (Lenta)", rest: "60s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
          { name: "Flexora em Pé", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs" },
        ]
      },
      {
        id: "fem-adv-e",
        day: "Sexta-feira",
        focus: "Braços e Cardio HIIT",
        exercises: [
          { name: "Tríceps Testa", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ir5PsbniVSc" },
          { name: "Rosca Direta", sets: "3", reps: "12", rest: "45s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
          { name: "Burpees", sets: "4", reps: "45s", rest: "15s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
          { name: "Corda Naval ou Sprint", sets: "1", reps: "10 min", rest: "-", videoUrl: "https://www.youtube.com/embed/u3zgHI8QnqE" },
        ]
      }
    ]
  },
  {
    id: "gravidas",
    level: "iniciante",
    title: "Gestantes",
    description: "Exercícios Seguros para Grávidas",
    frequency: "3x por semana",
    workouts: [
      {
        id: "grav-a",
        day: "Terça-feira",
        focus: "Mobilidade e Leveza",
        exercises: [
          { name: "Alongamento Gato-Vaca", sets: "3", reps: "10", rest: "45s", videoUrl: "https://www.youtube.com/embed/kqnua4rGlFI" },
          { name: "Agachamento com Bola", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/l2tX2-nNf6k" }
        ]
      }
    ]
  },
  {
    id: "funcional",
    level: "intermediario",
    title: "Funcional",
    description: "Treino de Corpo Inteiro e Condicionamento",
    frequency: "4x por semana",
    workouts: [
      {
        id: "func-a",
        day: "Segunda-feira",
        focus: "Cardio e Core",
        exercises: [
          { name: "Burpees", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
          { name: "Kettlebell Swing", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/sIexCV_F1D4" },
          { name: "Prancha com Toque no Ombro", sets: "3", reps: "20", rest: "30s", videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c" },
          { name: "Salto em Caixa (ou Degrau)", sets: "3", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
        ]
      },
      {
        id: "func-b",
        day: "Quarta-feira",
        focus: "Força Funcional",
        exercises: [
          { name: "Agachamento com Salto", sets: "4", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Flexão de Braços", sets: "4", reps: "12", rest: "60s", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
          { name: "Lunge Reverso", sets: "3", reps: "12 (cada lado)", rest: "45s", videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
          { name: "Mountain Climbers", sets: "4", reps: "40s", rest: "20s", videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM" },
        ]
      },
      {
        id: "func-c",
        day: "Sexta-feira",
        focus: "Resistência Metabólica",
        exercises: [
          { name: "Polichinelos", sets: "4", reps: "1 min", rest: "20s", videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8" },
          { name: "Agachamento Isométrico", sets: "3", reps: "45s", rest: "30s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Abdominal Canivete", sets: "4", reps: "15", rest: "30s", videoUrl: "https://www.youtube.com/embed/1fbU_MkV7NE" },
          { name: "Corrida no Lugar (Skiping)", sets: "4", reps: "45s", rest: "15s", videoUrl: "https://www.youtube.com/embed/H4gMdKErVl0" },
        ]
      }
    ]
  },
  {
    id: "crossfit",
    level: "avancado",
    title: "Crossfit",
    description: "Alta Intensidade (WODs Desafiadores)",
    frequency: "5x por semana",
    workouts: [
      {
        id: "cross-a",
        day: "WOD 1: For Strength",
        focus: "Força e Condicionamento",
        exercises: [
          { name: "Thruster", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/L219ltL15zk" },
          { name: "Pull-ups", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g" },
          { name: "Box Jumps", sets: "4", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
        ]
      },
      {
        id: "cross-b",
        day: "WOD 2: AMRAP 15'",
        focus: "As Many Rounds As Possible",
        exercises: [
          { name: "10 Burpees", sets: "AMRAP", reps: "15 min", rest: "-", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
          { name: "15 Kettlebell Swings", sets: "AMRAP", reps: "15 min", rest: "-", videoUrl: "https://www.youtube.com/embed/sIexCV_F1D4" },
          { name: "20 Air Squats", sets: "AMRAP", reps: "15 min", rest: "-", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
        ]
      },
      {
        id: "cross-c",
        day: "WOD 3: EMOM 12'",
        focus: "Every Minute on the Minute",
        exercises: [
          { name: "Min 1: 15 Push-ups", sets: "EMOM", reps: "12 min", rest: "-", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
          { name: "Min 2: 20 Sit-ups", sets: "EMOM", reps: "12 min", rest: "-", videoUrl: "https://www.youtube.com/embed/1fbU_MkV7NE" },
          { name: "Min 3: 40 Double Unders", sets: "EMOM", reps: "12 min", rest: "-", videoUrl: "https://www.youtube.com/embed/u3zgHI8QnqE" },
        ]
      }
    ]
  }
];
