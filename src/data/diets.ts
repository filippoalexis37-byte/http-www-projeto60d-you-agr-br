export interface Meal {
  time: string;
  emoji: string;
  description: string;
}

export interface DietPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: "primary" | "accent";
  calories: string;
  meals: Meal[];
  tips: string[];
}

export const dietPlans: DietPlan[] = [
  {
    id: "emagrecimento",
    title: "Emagrecimento",
    subtitle: "Zero Açúcar – 2000 kcal/dia",
    icon: "🔥",
    color: "accent",
    calories: "2000",
    meals: [
      { time: "Café da manhã", emoji: "🥚", description: "Omelete de claras + café sem açúcar" },
      { time: "Lanche da manhã", emoji: "🍎", description: "Maçã com pasta de amendoim" },
      { time: "Almoço", emoji: "🍗", description: "Frango grelhado + arroz integral + salada" },
      { time: "Lanche da tarde", emoji: "🥛", description: "Iogurte natural com castanhas" },
      { time: "Jantar", emoji: "🐟", description: "Peixe grelhado + legumes cozidos" },
    ],
    tips: [
      "Corte todo açúcar refinado",
      "Beba 3L de água por dia",
      "Evite alimentos ultraprocessados",
      "Prefira alimentos naturais",
      "Faça jejum intermitente se possível",
    ],
  },
  {
    id: "massa",
    title: "Ganho de Massa",
    subtitle: "Superávit calórico – 3000 kcal/dia",
    icon: "💪",
    color: "primary",
    calories: "3000",
    meals: [
      { time: "Café da manhã", emoji: "🥚", description: "Ovos + aveia + pasta de amendoim" },
      { time: "Lanche da manhã", emoji: "🍌", description: "Banana com whey protein" },
      { time: "Almoço", emoji: "🥩", description: "Carne vermelha + batata-doce + feijão" },
      { time: "Lanche da tarde", emoji: "🥤", description: "Shake de whey com banana e pasta de amendoim" },
      { time: "Jantar", emoji: "🍗", description: "Peito de frango + arroz integral + brócolis" },
    ],
    tips: [
      "Proteína: 2g por kg de peso",
      "Carbo estratégico no pós-treino",
      "Durma pelo menos 7h por noite",
      "Aumente calorias gradualmente",
      "Suplementação com creatina",
    ],
  },
];

export const forbiddenFoods = [
  "Refrigerantes",
  "Doces e chocolates",
  "Pão branco",
  "Bolos e biscoitos",
  "Sucos industrializados",
  "Açúcar refinado",
  "Frituras",
  "Fast food",
];

export const allowedFoods = [
  "Frango e peixes",
  "Ovos",
  "Arroz integral",
  "Batata-doce",
  "Aveia",
  "Frutas naturais",
  "Legumes e verduras",
  "Castanhas e oleaginosas",
];
