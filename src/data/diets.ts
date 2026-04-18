export interface Meal {
  time: string;
  emoji: string;
  description: string;
  recipe?: string;
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
      { time: "Café da manhã", emoji: "🥚", description: "Omelete de claras com espinafre + café sem açúcar", recipe: "Separe 4 claras de ovo, bata levemente. Aqueça uma frigideira antiaderente com spray de coco. Despeje as claras, adicione espinafre picado e tempere com sal e pimenta. Dobre ao meio quando firmar. Sirva com café preto sem açúcar." },
      { time: "Lanche da manhã", emoji: "🍎", description: "Maçã com pasta de amendoim natural", recipe: "Lave e corte 1 maçã em fatias. Sirva com 1 colher de sopa de pasta de amendoim natural (sem açúcar). Dica: escolha pasta 100% amendoim." },
      { time: "Almoço", emoji: "🍗", description: "Frango grelhado + arroz integral + salada verde", recipe: "Tempere 150g de peito de frango com limão, alho e ervas. Grelhe em frigideira quente por 5-6 min de cada lado. Cozinhe 4 colheres de arroz integral (proporção 1:2 de água). Monte o prato com salada de alface, rúcula e tomate temperada com azeite e limão." },
      { time: "Lanche da tarde", emoji: "🥛", description: "Iogurte natural com castanhas e canela", recipe: "Em um pote, coloque 170g de iogurte natural desnatado. Adicione 5 castanhas-do-pará picadas e polvilhe canela em pó a gosto. Misture e sirva gelado." },
      { time: "Jantar", emoji: "🐟", description: "Peixe grelhado + legumes cozidos no vapor", recipe: "Tempere 150g de filé de tilápia com limão, sal e pimenta. Grelhe por 4 min de cada lado. Cozinhe no vapor brócolis, cenoura e abobrinha por 8-10 min. Finalize com um fio de azeite e ervas frescas." },
      { time: "Ceia", emoji: "🍵", description: "Chá de camomila + 1 fatia de queijo branco", recipe: "Ferva 200ml de água e adicione 1 sachê de camomila. Deixe em infusão por 5 min. Sirva com 1 fatia (30g) de queijo branco." },
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
      { time: "Café da manhã", emoji: "🥚", description: "4 ovos + aveia com banana + pasta de amendoim", recipe: "Cozinhe 4 ovos (2 inteiros + 2 claras) mexidos com manteiga. À parte, misture 5 colheres de aveia com 200ml de leite, 1 banana amassada e 1 colher de pasta de amendoim. Aqueça no micro-ondas por 2 min." },
      { time: "Lanche da manhã", emoji: "🍌", description: "Banana com whey protein e granola", recipe: "Corte 1 banana em rodelas. Misture 1 scoop de whey protein com 200ml de água ou leite. Sirva a banana com granola por cima e o shake ao lado." },
      { time: "Almoço", emoji: "🥩", description: "Carne vermelha magra + batata-doce + feijão + salada", recipe: "Tempere 200g de patinho com alho e sal. Grelhe em fogo alto por 4-5 min de cada lado. Cozinhe 200g de batata-doce cortada em cubos por 15 min. Esquente feijão já cozido. Monte com salada de folhas e tomate." },
      { time: "Lanche da tarde", emoji: "🥤", description: "Shake: whey + banana + aveia + pasta de amendoim", recipe: "No liquidificador: 1 scoop de whey, 1 banana, 3 colheres de aveia, 1 colher de pasta de amendoim, 250ml de leite e gelo. Bata por 30 segundos até ficar cremoso." },
      { time: "Jantar", emoji: "🍗", description: "Peito de frango + arroz integral + brócolis", recipe: "Corte 200g de peito de frango em cubos, tempere com alho e ervas. Refogue em azeite por 8 min. Cozinhe arroz integral (proporção 1:2). Cozinhe brócolis no vapor por 5-7 min. Finalize com azeite." },
      { time: "Ceia", emoji: "🥜", description: "Pasta de amendoim com pão integral + caseína", recipe: "Torre 2 fatias de pão integral. Espalhe 2 colheres de pasta de amendoim. Misture 1 scoop de caseína com 150ml de leite frio e tome antes de dormir." },
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
      { time: "Café da manhã", emoji: "🥚", description: "Claras de ovo + aveia com canela + café preto", recipe: "Bata 5 claras e cozinhe em frigideira antiaderente como omelete. Misture 3 colheres de aveia com água quente e canela. Prepare café preto sem açúcar." },
      { time: "Lanche da manhã", emoji: "🍓", description: "Frutas vermelhas + whey isolado", recipe: "Lave 100g de frutas vermelhas (morango, mirtilo, framboesa). Misture 1 scoop de whey isolado com 200ml de água gelada. Coma as frutas junto." },
      { time: "Almoço", emoji: "🐟", description: "Tilápia grelhada + arroz integral + brócolis", recipe: "Tempere 180g de tilápia com limão, alho e ervas. Grelhe por 4 min de cada lado. Cozinhe 3 colheres de arroz integral. Cozinhe brócolis no vapor por 6 min. Tempere com azeite e sal." },
      { time: "Lanche da tarde", emoji: "🥑", description: "Abacate com whey ou frango desfiado + salada", recipe: "Amasse 1/4 de abacate com 1 scoop de whey e canela para um mousse proteico. Ou: desfie 100g de frango já cozido e misture com salada de folhas, tomate e pepino." },
      { time: "Jantar", emoji: "🥩", description: "Patinho grelhado + batata-doce + salada verde", recipe: "Grelhe 150g de patinho temperado com alho e pimenta por 5 min de cada lado. Cozinhe 150g de batata-doce em cubos por 12 min. Sirva com salada de rúcula e tomate com azeite." },
      { time: "Ceia", emoji: "🧀", description: "Queijo cottage + castanhas do Pará", recipe: "Sirva 3 colheres de sopa de queijo cottage em um pote. Adicione 3 castanhas-do-pará. Pode polvilhar canela se desejar." },
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
      { time: "Café da manhã", emoji: "🥓", description: "Ovos mexidos com bacon + abacate", recipe: "Frite 2 fatias de bacon até dourar. Na mesma frigideira, mexe 3 ovos temperados com sal e pimenta. Sirva com 1/4 de abacate fatiado." },
      { time: "Lanche da manhã", emoji: "🥜", description: "Mix de castanhas + queijo curado", recipe: "Separe 30g de mix de castanhas (castanha-do-pará, amêndoa, nozes). Corte 30g de queijo curado em cubos. Sirva como snack." },
      { time: "Almoço", emoji: "🥩", description: "Carne moída refogada + abobrinha + couve-flor", recipe: "Refogue 150g de carne moída com cebola e alho. Corte 1 abobrinha em rodelas e refogue junto. Cozinhe couve-flor no vapor por 8 min e amasse como purê com manteiga e sal." },
      { time: "Lanche da tarde", emoji: "🥚", description: "Ovo cozido + pepino com cream cheese", recipe: "Cozinhe 2 ovos por 10 min (cozido duro). Corte pepino em rodelas e espalhe cream cheese por cima. Tempere com sal e orégano." },
      { time: "Jantar", emoji: "🍗", description: "Frango ao forno + salada cesar (sem croutons)", recipe: "Tempere 180g de peito de frango com azeite, alho e páprica. Asse por 25 min a 200°C. Prepare salada com alface americana, parmesão ralado e molho caesar (azeite + limão + mostarda + alho)." },
      { time: "Ceia", emoji: "🍵", description: "Chá verde + 1 colher de pasta de amendoim", recipe: "Ferva 200ml de água e adicione 1 sachê de chá verde. Infusão por 3 min. Coma 1 colher de sopa de pasta de amendoim pura." },
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
      { time: "Café da manhã", emoji: "🥣", description: "Mingau de aveia com leite vegetal + banana + chia", recipe: "Aqueça 250ml de leite de aveia com 5 colheres de aveia em fogo baixo por 5 min, mexendo. Adicione 1 banana fatiada, 1 colher de chia e canela. Sirva quente." },
      { time: "Lanche da manhã", emoji: "🥜", description: "Pasta de amendoim com pão integral + proteína de ervilha", recipe: "Torre 2 fatias de pão integral. Espalhe 2 colheres de pasta de amendoim. Misture 1 scoop de proteína de ervilha com 200ml de leite vegetal." },
      { time: "Almoço", emoji: "🍛", description: "Grão de bico refogado + arroz integral + salada colorida", recipe: "Refogue cebola e alho em azeite. Adicione 200g de grão de bico cozido, tomate picado, páprica e cominho. Cozinhe por 10 min. Sirva com arroz integral e salada de cenoura ralada, beterraba e folhas verdes." },
      { time: "Lanche da tarde", emoji: "🥤", description: "Shake: proteína vegetal + banana + pasta de castanha", recipe: "No liquidificador: 1 scoop de proteína vegetal, 1 banana, 1 colher de pasta de castanha de caju, 250ml de leite de amêndoas e gelo. Bata até ficar cremoso." },
      { time: "Jantar", emoji: "🍲", description: "Lentilha com legumes + tofu grelhado + quinoa", recipe: "Cozinhe 100g de lentilha com cenoura e abobrinha picadas por 20 min. Corte 150g de tofu em fatias, tempere com shoyu e gengibre, grelhe por 3 min de cada lado. Cozinhe quinoa (proporção 1:2) por 15 min." },
      { time: "Ceia", emoji: "🌰", description: "Mix de castanhas + leite de amêndoas", recipe: "Separe 30g de mix de castanhas. Aqueça 200ml de leite de amêndoas com canela e beba morno. Coma as castanhas junto." },
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
  {
    id: "economica",
    title: "Dieta Econômica",
    subtitle: "Baixo custo – 2000 kcal/dia",
    icon: "💰",
    color: "primary",
    calories: "2000",
    meals: [
      { time: "Café da manhã", emoji: "🥚", description: "Cuscuz com ovo frito na manteiga", recipe: "Umedeça meia xícara de flocão de milho com água e sal, deixe descansar por 5 min e cozinhe no cuscuzeiro. Frite 2 ovos em um pouco de manteiga. Acompanha café preto." },
      { time: "Lanche da manhã", emoji: "🍌", description: "Banana com aveia", recipe: "Amasse 2 bananas pratas e misture com 2 colheres de sopa de aveia em flocos." },
      { time: "Almoço", emoji: "🍛", description: "Arroz, feijão, frango desfiado e repolho", recipe: "Sirva 4 colheres de arroz, 2 de feijão, 100g de frango desfiado refogado com cebola e tomate. Salada de repolho picado com cenoura ralada, temperado com limão e sal." },
      { time: "Lanche da tarde", emoji: "🍠", description: "Batata doce cozida", recipe: "Cozinhe 150g de batata doce e amasse. Pode adicionar uma pitada de canela." },
      { time: "Jantar", emoji: "🍲", description: "Macarrão com carne moída (patinho ou acém moído)", recipe: "Cozinhe 100g de macarrão (peso cru). Faça um molho simples com 100g de carne moída, alho, cebola e extrato de tomate." },
      { time: "Ceia", emoji: "🥚", description: "2 ovos cozidos", recipe: "Cozinhe 2 ovos por 10 minutos. Tempere com um pouco de sal e orégano." },
    ],
    tips: [
      "Compre frango, ovo e carne moída (proteínas mais baratas)",
      "Aveia, arroz, feijão e macarrão rendem bastante",
      "Compre frutas e legumes da estação na feira (é mais barato)",
      "Beba bastante água",
      "Evite gastar com suplementos, invista na comida de verdade",
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
