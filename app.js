/**
 * ========================================================
 * Amor e Respostas - Lógica Principal (Vanilla JS)
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado da aplicação
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = []; // histórico com { question, selected, correct, isCorrect }
  const questions = window.quizQuestions || [];

  // Elementos do DOM
  const quizHeader = document.getElementById("quiz-header");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const scoreCounter = document.getElementById("score-counter");

  // Telas
  const screenHero = document.getElementById("screen-hero");
  const screenQuiz = document.getElementById("screen-quiz");
  const screenResult = document.getElementById("screen-result");

  // Elementos da Pergunta
  const questionTitle = document.getElementById("question-title");
  const optionsContainer = document.getElementById("options-container");
  const feedbackBox = document.getElementById("feedback-box");
  const feedbackIcon = document.getElementById("feedback-icon");
  const feedbackHeadline = document.getElementById("feedback-headline");
  const feedbackComment = document.getElementById("feedback-comment");
  const btnNext = document.getElementById("btn-next");

  // Botões de fluxo
  const btnStart = document.getElementById("btn-start");
  const btnRestart = document.getElementById("btn-restart");
  const btnToggleSummary = document.getElementById("btn-toggle-summary");
  const summaryContainer = document.getElementById("summary-container");

  // Elementos de Resultado
  const finalScore = document.getElementById("final-score");
  const resultHeadline = document.getElementById("result-headline");
  const resultMessage = document.getElementById("result-message");

  const letters = ["A", "B", "C", "D"];

  /**
   * Navegação entre telas
   */
  function showScreen(screen) {
    [screenHero, screenQuiz, screenResult].forEach(s => {
      s.classList.remove("active");
    });
    screen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Inicia o Quiz
   */
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizHeader.style.display = "block";
    renderQuestion();
    showScreen(screenQuiz);
  }

  /**
   * Renderiza a pergunta atual
   */
  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) {
      finishQuiz();
      return;
    }

    // Atualiza barra de progresso e texto
    const total = questions.length;
    const currentNum = currentQuestionIndex + 1;
    const progressPercent = ((currentNum - 1) / total) * 100;
    
    progressText.textContent = `Pergunta ${String(currentNum).padStart(2, "0")} de ${String(total).padStart(2, "0")}`;
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute("aria-valuenow", Math.round(progressPercent));
    scoreCounter.textContent = `Acertos: ${score}`;

    // Reseta estado do card
    questionTitle.textContent = q.question;
    optionsContainer.innerHTML = "";
    feedbackBox.className = "feedback-box";
    feedbackBox.classList.remove("show", "correct", "wrong");
    btnNext.style.display = "none";

    // Cria as 4 opções
    q.options.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.innerHTML = `
        <span class="option-letter">${letters[index] || index + 1}</span>
        <span class="option-text">${optText}</span>
      `;
      btn.addEventListener("click", () => handleSelectOption(index));
      optionsContainer.appendChild(btn);
    });
  }

  /**
   * Processa a seleção do usuário
   */
  function handleSelectOption(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.correctAnswer;

    if (isCorrect) {
      score++;
    }

    // Salva para o histórico
    userAnswers.push({
      questionText: q.question,
      selectedText: q.options[selectedIndex],
      correctText: q.options[q.correctAnswer],
      isCorrect: isCorrect
    });

    // Desabilita botões e aplica classes visuais
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.classList.add("correct");
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add("wrong");
      } else {
        btn.classList.add("faded");
      }
    });

    // Exibe a caixa de feedback
    feedbackBox.classList.add("show");
    if (isCorrect) {
      feedbackBox.classList.add("correct");
      feedbackIcon.textContent = "🎉";
      feedbackHeadline.textContent = "Você acertou em cheio!";
    } else {
      feedbackBox.classList.add("wrong");
      feedbackIcon.textContent = "😅";
      feedbackHeadline.textContent = `Ops! A resposta era: ${q.options[q.correctAnswer]}`;
    }
    feedbackComment.textContent = q.comment || "";

    // Atualiza barra de progresso para a conclusão desta pergunta
    const total = questions.length;
    const progressPercent = ((currentQuestionIndex + 1) / total) * 100;
    progressBar.style.width = `${progressPercent}%`;
    scoreCounter.textContent = `Acertos: ${score}`;

    // Exibe o botão de avançar
    btnNext.style.display = "inline-flex";
    btnNext.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /**
   * Finaliza o Quiz e exibe resultado
   */
  function finishQuiz() {
    quizHeader.style.display = "none";
    const total = questions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    finalScore.textContent = `${score}/${total}`;

    // Mensagens dinâmicas por faixa de acertos
    if (percentage >= 80) {
      resultHeadline.textContent = "Conexão de Alma Gêmea! ❤️";
      resultMessage.innerHTML = `
        <strong>Impressionante: ${percentage}% de acerto!</strong><br>
        Você presta atenção em cada detalhe, lembra das nossas histórias e me conhece de olhos fechados. Sou a pessoa mais sortuda do mundo por ter você ao meu lado!
      `;
      triggerConfetti();
    } else if (percentage >= 50) {
      resultHeadline.textContent = "Muito bem, meu amor! 🥰";
      resultMessage.innerHTML = `
        <strong>Você acertou ${percentage}%!</strong><br>
        Mandou super bem! Algumas pegadinhas passaram, mas isso só significa que temos ainda mais histórias, viagens e risadas para colecionar juntos. Te amo!
      `;
      triggerConfetti(0.5);
    } else {
      resultHeadline.textContent = "Hora de Mais Conversas e Cafuné! ☕";
      resultMessage.innerHTML = `
        <strong>Você acertou ${percentage}%.</strong><br>
        Tudo bem, amor! A boa notícia é que vamos precisar de um encontro longo de fim de tarde para você me fazer todas as perguntas de novo. Meu coração ainda é 100% seu!
      `;
    }

    renderSummary();
    showScreen(screenResult);
  }

  /**
   * Renderiza o resumo de todas as perguntas
   */
  function renderSummary() {
    summaryContainer.innerHTML = "";
    userAnswers.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "summary-item";
      div.innerHTML = `
        <div class="summary-item-q">${index + 1}. ${item.questionText}</div>
        <div class="summary-item-ans">
          Sua resposta: <span class="${item.isCorrect ? 'correct' : 'wrong'}">${item.selectedText}</span>
          ${!item.isCorrect ? `<br>Correta: <span class="correct">${item.correctText}</span>` : ""}
        </div>
      `;
      summaryContainer.appendChild(div);
    });
  }

  /**
   * Efeito de confetes comemorativos
   */
  function triggerConfetti(intensity = 1) {
    if (typeof confetti !== "function") return;

    const count = 200 * intensity;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#D9383A", "#FAF8F5", "#141413", "#F59E0B", "#E0474C"]
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  // Event Listeners
  btnStart.addEventListener("click", startQuiz);

  btnNext.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  });

  btnRestart.addEventListener("click", () => {
    startQuiz();
  });

  btnToggleSummary.addEventListener("click", () => {
    const isShowing = summaryContainer.classList.toggle("show");
    btnToggleSummary.querySelector("span").textContent = isShowing ? "▲" : "▼";
  });
});
