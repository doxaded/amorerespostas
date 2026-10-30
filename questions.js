/**
 * ========================================================
 * Amor e Respostas - Banco de Perguntas
 * ========================================================
 * Você pode adicionar, editar ou remover perguntas facilmente aqui.
 * 
 * Cada pergunta possui:
 * - id: Identificador numérico único
 * - question: O texto da pergunta
 * - options: Lista com 5 opções de resposta (1 correta + 4 incorretas)
 * - correctAnswer: O índice (0 a 4) da resposta correta
 * - comment: Comentário, curiosidade ou piada interna exibida após responder
 */

const questionsData = [
  {
    id: 1,
    question: "Qual é a minha data de nascimento completa (dia, mês e ano)?",
    options: ["14/01/2007", "16/01/2007", "16/01/2006", "18/02/2007", "06/01/2007"],
    correctAnswer: 1,
    comment: "16 de janeiro de 2007! O dia em que o mundo ficou mais bonito."
  },
  {
    id: 2,
    question: "Qual é o meu nome completo sem errar nenhuma letra?",
    options: ["Henrique Vigueira Berbert", "Henrique Viguera Bebert", "Henrique Viguera Berbert", "Henrique Figueira Berbert", "Henrique Viguera Berberth"],
    correctAnswer: 2,
    comment: "Henrique Viguera Berbert! Sem 'i' a mais no Viguera e com os dois 'r' no Berbert."
  },
  {
    id: 3,
    question: "Se eu pudesse comer apenas um prato pelo resto da vida, qual seria?",
    options: ["Lasanha à bolonhesa", "Churrasco com farofa", "Hambúrguer artesanal", "Estrogonofe", "Parmegiana de carne"],
    correctAnswer: 3,
    comment: "Um bom estrogonofe não tem erro, comeria todo dia fácil!"
  },
  {
    id: 4,
    question: "Qual é a minha sobremesa ou doce favorito absoluto?",
    options: ["Pudim de leite condensado", "Brigadeiro de colher", "Torta de limão", "Mousse de maracujá", "Pavê"],
    correctAnswer: 4,
    comment: "É pavê E pra comer sim! Meu doce favorito disparado."
  },
  {
    id: 5,
    question: "Qual comida ou ingrediente eu NÃO suporto de jeito nenhum?",
    options: ["Pepino", "Cebola", "Coentro", "Azeitona", "Pimentão"],
    correctAnswer: 0,
    comment: "Pepino passa longe do meu prato!"
  },
  {
    id: 6,
    question: "Qual é a minha bebida favorita?",
    options: ["Coca-Cola trincando de gelada", "Suco de maracujá", "Suco de laranja", "Guaraná Antarctica", "Água com gás e limão"],
    correctAnswer: 2,
    comment: "Um suquinho de laranja gelado é imbatível."
  },
  {
    id: 7,
    question: "Qual é o jogo em que eu mais tenho horas jogadas ou que mais jogo atualmente?",
    options: ["Minecraft", "Valorant", "CS2", "GTA V", "Red Dead Redemption 2"],
    correctAnswer: 2,
    comment: "Counter-Strike 2 na veia!"
  },
  {
    id: 8,
    question: "No CS, qual é o meu mapa favorito?",
    options: ["Mirage", "Inferno", "Dust II", "Nuke", "Overpass"],
    correctAnswer: 3,
    comment: "Nuke! Só para quem tem noção de jogo afiada."
  },
  {
    id: 9,
    question: "Qual é o meu anime ou mangá favorito de todos os tempos?",
    options: ["Hunter x Hunter", "Dragon Ball Z", "Attack on Titan", "One Piece", "Naruto"],
    correctAnswer: 4,
    comment: "Naruto é clássico absoluto no meu coração!"
  },
  {
    id: 10,
    question: "Qual é o meu personagem favorito dos animes/jogos?",
    options: ["Itachi Uchiha", "Killua Zoldyck", "Kakashi Hatake", "Não tenho um favorito específico", "Arthur Morgan"],
    correctAnswer: 3,
    comment: "Pegadinha! Eu curto vários, mas não tenho um único favorito absoluto."
  },
  {
    id: 11,
    question: "Quando jogamos ou falamos de RPG de mesa, qual é a minha classe favorita?",
    options: ["Mago", "Guerreiro", "Arqueiro", "Ladino", "Paladino"],
    correctAnswer: 2,
    comment: "Arqueiro sempre! Mira precisa de longe."
  },
  {
    id: 12,
    question: "Qual é o meu jogador de futebol favorito da história?",
    options: ["Cristiano Ronaldo", "Ronaldo Fenômeno", "Pelé", "Neymar", "Messi"],
    correctAnswer: 4,
    comment: "Lionel Messi, o gênio da bola!"
  },
  {
    id: 13,
    question: "Qual time europeu eu defendo?",
    options: ["Real Madrid", "Barcelona", "Milan", "Manchester United", "Bayern de Munique"],
    correctAnswer: 2,
    comment: "Forza Milan! Rossonero de respeito."
  },
  {
    id: 14,
    question: "Qual banda ou artista eu mais escuto?",
    options: ["Arctic Monkeys", "Red Hot Chili Peppers", "Linkin Park", "Nirvana", "Charlie Brown Jr."],
    correctAnswer: 1,
    comment: "Red Hot Chili Peppers na playlist não pode faltar!"
  },
  {
    id: 15,
    question: "Qual é o meu exercício favorito no treino?",
    options: ["Supino reto com halteres", "Tríceps na polia", "Barra fixa", "Agachamento na Barra Smith", "Rosca direta"],
    correctAnswer: 3,
    comment: "Agachamento na Barra Smith! Aqui não se pula treino de perna."
  },
  {
    id: 16,
    question: "Qual grupo muscular eu menos gosto de fazer (mas faço mesmo assim)?",
    options: ["Ombros", "Panturrilha", "Abdômen", "Costas", "Bíceps"],
    correctAnswer: 0,
    comment: "Treinar ombros queima demais, mas faz parte do processo!"
  },
  {
    id: 17,
    question: "Qual é a minha maior mania no dia a dia que você sempre repara?",
    options: ["Estalar os dedos toda hora", "Mexer no cabelo sem parar", "Bater o pé no chão", "Mexer na pele", "Roer as unhas"],
    correctAnswer: 3,
    comment: "Quando eu vejo, já estou mexendo na pele de novo!"
  },
  {
    id: 18,
    question: "O que me deixa de mau humor quase instantaneamente?",
    options: ["Acordar atrasado", "Muito barulho", "Internet caindo no meio da partida", "Comida fria", "Trânsito parado"],
    correctAnswer: 1,
    comment: "Barulheira na minha cabeça acaba com a minha paz na hora!"
  },
  {
    id: 19,
    question: "Em qual período do dia eu funciono melhor?",
    options: ["De madrugada", "Depois do almoço", "No fim da tarde", "Manhã cedo", "Só depois das 22h"],
    correctAnswer: 3,
    comment: "De manhã cedo! Produtividade lá no alto logo cedo."
  },
  {
    id: 20,
    question: "Qual é o meu filme favorito?",
    options: ["Clube da Luta", "Interestelar", "O Lobo de Wall Street", "O Poderoso Chefão", "Bastardos Inglórios"],
    correctAnswer: 2,
    comment: "O Lobo de Wall Street! Filme absurdo de bom."
  },
  {
    id: 21,
    question: "Qual é o meu jogo favorito?",
    options: ["The Last of Us", "The Witcher 3", "Life is Strange", "The Wolf Among Us", "God of War"],
    correctAnswer: 3,
    comment: "The Wolf Among Us! História e atmosfera incríveis."
  },
  {
    id: 22,
    question: "Onde foi o nosso primeiro beijo?",
    options: ["Praia de Itacoatiara", "Praia de Icaraí", "Praia de Piratininga", "Campo de São Bento", "Praça Arariboia"],
    correctAnswer: 2,
    comment: "Na Praia de Piratininga! Onde tudo começou de verdade."
  },
  {
    id: 23,
    question: "Qual é a data exata em que começamos a namorar?",
    options: ["01/01/2025", "02/01/2025", "12/01/2025", "02/02/2025", "25/12/2024"],
    correctAnswer: 1,
    comment: "02 de janeiro de 2025! Começando o ano da melhor forma possível."
  },
  {
    id: 24,
    question: "Qual foi a primeira impressão sincera que eu tive de você quando te conheci?",
    options: ["Muito tímida", "Super simpática", "Chata", "Metida", "Muito quieta"],
    correctAnswer: 2,
    comment: "Achei chata no começo... e olha só onde a gente veio parar!"
  },
  {
    id: 25,
    question: "Qual é o nosso programa favorito de fim de semana?",
    options: ["Ir ao shopping ver filme", "Ir na Praça XV", "Ficar em casa vendo série o dia todo", "Sair para jantar em restaurante chique", "Dar volta no centro de Niterói"],
    correctAnswer: 1,
    comment: "Dar aquele rolê clássico na Praça XV!"
  },
  {
    id: 26,
    question: "Qual apelido carinhoso (ou piada interna) é a nossa marca registrada?",
    options: ["Mozão e Vida", "Princesa e Príncipe", "Bê e Amor", "Cocuda e Cocudo", "Chatinha e Chatinho"],
    correctAnswer: 3,
    comment: "Cocuda e Cocudo! O romantismo diferenciado que só a gente entende."
  },
  {
    id: 27,
    question: "Qual é a coisa que você faz que me deixa completamente bobo/apaixonado?",
    options: ["Quando você se arruma para sair", "Quando você faz carinho no meu rosto", "Quando você sorri", "Quando você me manda mensagem do nada", "Quando você fica brava de mentirinha"],
    correctAnswer: 2,
    comment: "O seu sorriso me desmonta inteiro toda vez!"
  },
  {
    id: 28,
    question: "Qual é o lugar do mundo que eu mais tenho vontade de te levar comigo para conhecer?",
    options: ["Japão", "Suíça", "Estados Unidos", "China", "Egito"],
    correctAnswer: 3,
    comment: "China! Ainda vamos fazer essa viagem épica juntos."
  },
  {
    id: 29,
    question: "Qual é o meu maior sonho ou meta para os nossos próximos anos juntos?",
    options: ["Comprar um carro esportivo", "Ter um apartamento nosso", "Adotar três cachorros", "Morar na praia", "Viajar de motorhome"],
    correctAnswer: 1,
    comment: "Ter o nosso próprio apartamento, o nosso cantinho!"
  },
  {
    id: 30,
    question: "Qual é o lugar do mundo que eu mais tenho vontade de conhecer com você?",
    options: ["Paris", "Veneza", "Roma", "Londres", "Madri"],
    correctAnswer: 2,
    comment: "Roma! Muita história, massa boa e nós dois na Itália."
  }
];

/**
 * ========================================================
 * PRÊMIO FINALISTA (carta aberta na tela final)
 * ========================================================
 * Edite o texto abaixo com a surpresa especial / vale-presente.
 */
const prizeData = {
  title: "Vale Jantar Romântico 🍷",
  message: "Parabéns, finalista! Este vale garante um jantar especial só nosso, no restaurante que você escolher. Eu cuido de tudo, você só precisa estar linda e sorrindo.",
  footer: "Válido por: toda a vida ❤️"
};

// Exporta globalmente para uso direto na web (script clássico, sem módulos)
window.quizQuestions = questionsData;
window.prizeData = prizeData;
