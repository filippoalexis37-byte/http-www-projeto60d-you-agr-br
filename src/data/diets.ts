export interface Meal {
  time: string;
  emoji: string;
  description: string;
  videoUrl?: string;
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
    subtitle: "Zero Açúcar – 1800 kcal/dia",
    icon: "🔥",
    color: "accent",
    calories: "1800",
    meals: [
      { time: "Café da manhã", emoji: "🥚", description: "Omelete de claras com espinafre + café sem açúcar", videoUrl: "https://www.youtube.com/embed/0eLPSbR4xvA" },
      { time: "Lanche da manhã", emoji: "🍎", description: "Maçã com pasta de amendoim natural", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Almoço", emoji: "🍗", description: "Frango grelhado + arroz integral + salada verde", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Lanche da tarde", emoji: "🥛", description: "Iogurte natural com castanhas e canela", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Jantar", emoji: "🐟", description: "Peixe grelhado + legumes cozidos no vapor", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Ceia", emoji: "🍵", description: "Chá de camomila + 1 fatia de queijo branco" },
    ],
    tips: [
      "Corte todo açúcar refinado",
      "Beba 3L de água por dia",
      "Evite alimentos ultraprocessados",
      "Prefira alimentos naturais e integrais",
      "Faça jejum intermitente 16/8 se possível",
      "Mastigue devagar – leve 20 min para comer",
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
      { time: "Café da manhã", emoji: "🥚", description: "4 ovos + aveia com banana + pasta de amendoim", videoUrl: "https://www.youtube.com/embed/0eLPSbR4xvA" },
      { time: "Lanche da manhã", emoji: "🍌", description: "Banana com whey protein e granola", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Almoço", emoji: "🥩", description: "Carne vermelha magra + batata-doce + feijão + salada", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Lanche da tarde", emoji: "🥤", description: "Shake: whey + banana + aveia + pasta de amendoim", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Jantar", emoji: "🍗", description: "Peito de frango + arroz integral + brócolis", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Ceia", emoji: "🥜", description: "Pasta de amendoim com pão integral + caseína" },
    ],
    tips: [
      "Proteína: 2g por kg de peso corporal",
      "Carbo estratégico no pós-treino",
      "Durma pelo menos 7-8h por noite",
      "Aumente calorias gradualmente (200kcal/semana)",
      "Suplementação: creatina 5g/dia",
      "Coma a cada 3 horas",
    ],
  },
  {
    id: "definicao",
    title: "Definição / Cutting",
    subtitle: "Déficit controlado – 2200 kcal/dia",
    icon: "✂️",
    color: "accent",
    calories: "2200",
    meals: [
      { time: "Café da manhã", emoji: "🥚", description: "Claras de ovo + aveia com canela + café preto", videoUrl: "https://www.youtube.com/embed/0eLPSbR4xvA" },
      { time: "Lanche da manhã", emoji: "🍓", description: "Frutas vermelhas + whey isolado", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Almoço", emoji: "🐟", description: "Tilápia grelhada + arroz integral + brócolis", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Lanche da tarde", emoji: "🥑", description: "Abacate com whey ou frango desfiado + salada", videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y" },
      { time: "Jantar", emoji: "🥩", description: "Patinho grelhado + batata-doce + salada verde", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Ceia", emoji: "🧀", description: "Queijo cottage + castanhas do Pará" },
    ],
    tips: [
      "Déficit de 300-500kcal abaixo da manutenção",
      "Proteína alta: 2.2g por kg de peso",
      "Cardio LISS 30min 3x/semana",
      "Refeed semanal: 1 dia com mais carboidrato",
      "Evite carboidratos simples à noite",
      "Beba 3-4L de água por dia",
    ],
  },
  {
    id: "lowcarb",
    title: "Low Carb",
    subtitle: "Baixo carboidrato – 1600 kcal/dia",
    icon: "🥬",
    color: "primary",
    calories: "1600",
    meals: [
      { time: "Café da manhã", emoji: "🥓", description: "Ovos mexidos com bacon + abacate", videoUrl: "https://www.youtube.com/embed/0eLPSbR4xvA" },
      { time: "Lanche da manhã", emoji: "🥜", description: "Mix de castanhas + queijo curado" },
      { time: "Almoço", emoji: "🥩", description: "Carne moída refogada + abobrinha + couve-flor", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Lanche da tarde", emoji: "🥚", description: "Ovo cozido + pepino com cream cheese" },
      { time: "Jantar", emoji: "🍗", description: "Frango ao forno + salada cesar (sem croutons)", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Ceia", emoji: "🍵", description: "Chá verde + 1 colher de pasta de amendoim" },
    ],
    tips: [
      "Máximo 50g de carbo por dia",
      "Aumente gorduras boas: azeite, abacate, castanhas",
      "Proteína moderada a cada refeição",
      "Evite frutas com alto índice glicêmico",
      "Hidrate-se muito – mínimo 3L/dia",
      "Suplemento eletrólitos se necessário",
    ],
  },
  {
    id: "vegana",
    title: "Vegana Fitness",
    subtitle: "100% vegetal – 2400 kcal/dia",
    icon: "🌱",
    color: "accent",
    calories: "2400",
    meals: [
      { time: "Café da manhã", emoji: "🥣", description: "Mingau de aveia com leite vegetal + banana + chia" },
      { time: "Lanche da manhã", emoji: "🥜", description: "Pasta de amendoim com pão integral + proteína de ervilha" },
      { time: "Almoço", emoji: "🍛", description: "Grão de bico refogado + arroz integral + salada colorida", videoUrl: "https://www.youtube.com/embed/B5jEtC-ePXc" },
      { time: "Lanche da tarde", emoji: "🥤", description: "Shake: proteína vegetal + banana + pasta de castanha" },
      { time: "Jantar", emoji: "🍲", description: "Lentilha com legumes + tofu grelhado + quinoa" },
      { time: "Ceia", emoji: "🌰", description: "Mix de castanhas + leite de amêndoas" },
    ],
    tips: [
      "Combine cereais + leguminosas para aminoácidos completos",
      "Suplemente vitamina B12 obrigatoriamente",
      "Proteína: 1.8-2g por kg com fontes variadas",
      "Suplemento de creatina: essencial para veganos",
      "Inclua sementes de linhaça/chia para ômega-3",
      "Ferro: combine vegetais escuros com vitamina C",
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
  "Margarina",
  "Embutidos (salsicha, presunto)",
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
  "Azeite de oliva",
  "Iogurte natural",
];
