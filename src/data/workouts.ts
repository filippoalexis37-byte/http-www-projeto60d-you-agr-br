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
    description: "Foco em Pernas e Glúteos",
    frequency: "3x por semana",
    workouts: [
      {
        id: "fem-ini-a",
        day: "Segunda-feira",
        focus: "Pernas e Glúteos",
        exercises: [
          { name: "Agachamento Livre", sets: "3", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U" },
          { name: "Elevação Pélvica", sets: "3", reps: "15", rest: "60s", videoUrl: "https://www.youtube.com/embed/8rYqDqI25v8" },
          { name: "Cadeira Abdutora", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/Z0oYpM8k29I" }
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
    description: "Treino de Corpo Inteiro",
    frequency: "4x por semana",
    workouts: [
      {
        id: "func-a",
        day: "Segunda-feira",
        focus: "Cardio e Core",
        exercises: [
          { name: "Burpees", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
          { name: "Kettlebell Swing", sets: "3", reps: "15", rest: "45s", videoUrl: "https://www.youtube.com/embed/sIexCV_F1D4" }
        ]
      }
    ]
  },
  {
    id: "crossfit",
    level: "avancado",
    title: "Crossfit",
    description: "Alta Intensidade (WOD)",
    frequency: "5x por semana",
    workouts: [
      {
        id: "cross-a",
        day: "WOD 1",
        focus: "Força e Condicionamento",
        exercises: [
          { name: "Thruster", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/L219ltL15zk" },
          { name: "Pull-ups", sets: "4", reps: "10", rest: "60s", videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g" }
        ]
      }
    ]
  }
];
