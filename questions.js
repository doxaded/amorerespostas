/**
 * ========================================================
 * Amor e Respostas - Banco de Perguntas
 * ========================================================
 * Você pode adicionar, editar ou remover perguntas facilmente aqui.
 * 
 * Cada pergunta possui:
 * - id: Identificador numérico único
 * - question: O texto da pergunta
 * - options: Lista com 4 opções de resposta
 * - correctAnswer: O índice (0, 1, 2 ou 3) da resposta correta
 * - comment: Comentário, curiosidade ou piada interna exibida após responder
 */

const questionsData = [
  {
    id: 1,
    question: "Onde foi o nosso primeiro encontro oficial?",
    options: [
      "Num café charmoso no fim de tarde",
      "No cinema dividindo um balde de pipoca",
      "Em um restaurante japonês comendo sushi",
      "Num parque caminhando e conversando por horas"
    ],
    correctAnswer: 0,
    comment: "Aquele café onde o tempo simplesmente voou e a gente não queria ir embora! ❤️"
  },
  {
    id: 2,
    question: "Qual é a minha comida favorita no mundo inteiro?",
    options: [
      "Hambúrguer artesanal bem suculento",
      "Uma boa pizza com massa fina",
      "Churrasco de domingo",
      "Massa caseira com bastante queijo"
    ],
    correctAnswer: 1,
    comment: "Você sabe que pizza sempre ganha meu coração (depois de você, claro). 🍕"
  },
  {
    id: 3,
    question: "Qual é a minha maior 'mania' ou hábito engraçado?",
    options: [
      "Organizar as coisas por ordem de cor/tamanho",
      "Checar mil vezes se a porta está trancada",
      "Fazer piadinhas em momentos de silêncio",
      "Cantarolando músicas aleatórias no banho"
    ],
    correctAnswer: 2,
    comment: "Eu não resisto a quebrar o silêncio com uma piadinha boba! 😂"
  },
  {
    id: 4,
    question: "Qual é a viagem dos meus sonhos para fazermos juntos?",
    options: [
      "Ver a aurora boreal na Noruega/Finlândia",
      "Explorar a cultura e gastronomia do Japão",
      "Uma cabana isolada e aconchegante nas montanhas",
      "Relaxar em uma praia paradisíaca no Caribe"
    ],
    correctAnswer: 1,
    comment: "Nosso roteiro dos sonhos juntos! Mal posso esperar para carimbar esse passaporte com você. ✈️"
  },
  {
    id: 5,
    question: "O que eu mais admiro em você?",
    options: [
      "Sua determinação e inteligência brilhante",
      "Seu sorriso que ilumina qualquer dia difícil",
      "A doçura e carinho com que você me trata",
      "Absolutamente tudo acima e muito mais"
    ],
    correctAnswer: 3,
    comment: "Essa nem precisava de dúvida: o pacote completo é o que me conquista todo santo dia! ✨"
  },
  {
    id: 6,
    question: "Se a gente pudesse passar um domingo perfeito, como seria?",
    options: [
      "Dormir até tarde, maratonar série e pedir comida",
      "Acordar cedo para pedalar e passear na feira",
      "Cozinhar algo especial ouvindo música juntos",
      "Sair sem destino explorando cafés e livrarias"
    ],
    correctAnswer: 0,
    comment: "Nosso modo 'preguiça & dengo' ativado no domingo é simplesmente insubstituível. 🛋️"
  },
  {
    id: 7,
    question: "Qual é a minha linguagem do amor predominante com você?",
    options: [
      "Tempo de qualidade (estar presente junto)",
      "Toque físico (abraços, cafuné e mãos dadas)",
      "Palavras de afirmação e elogios",
      "Atos de serviço e cuidado no dia a dia"
    ],
    correctAnswer: 1,
    comment: "Especialista número 1 em pedir e fazer cafuné a qualquer hora do dia! 💆‍♂️"
  },
  {
    id: 8,
    question: "O que eu pensei na primeiríssima vez em que te vi?",
    options: [
      "\"Caramba, ela é incrivelmente linda e estilosa!\"",
      "\"Preciso arrumar uma desculpa para falar com ela agora.\"",
      "\"Senti uma conexão e paz imediata só de olhar.\"",
      "Todas as alternativas anteriores simultaneamente!"
    ],
    correctAnswer: 3,
    comment: "Foi amor à primeira vista sim, e cada dia que passa eu tenho mais certeza. 💘"
  }
];

// Exporta globalmente para uso direto na web
window.quizQuestions = questionsData;
