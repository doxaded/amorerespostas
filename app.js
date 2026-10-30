/**
 * Amor e Respostas - Lógica principal (Vanilla JS)
 */
document.addEventListener("DOMContentLoaded", () => {
  const questions = window.quizQuestions || [];
  const prize = window.prizeData || { title: "Surpresa!", message: "", footer: "" };
  const letters = ["A", "B", "C", "D", "E"];
  const COLORS = ["#FF8DA1", "#E84A72", "#141413", "#F4F1EA"];

  let current = 0;
  let score = 0;
  let answers = [];

  const $ = (id) => document.getElementById(id);
  const screens = [$("screen-hero"), $("screen-quiz"), $("screen-result")];

  function pad(n) { return String(n).padStart(2, "0"); }

  // Transição com fade-out / fade-in
  function showScreen(target) {
    const active = screens.find((s) => s.classList.contains("active"));
    const swap = () => {
      screens.forEach((s) => s.classList.remove("active", "visible"));
      target.classList.add("active");
      window.scrollTo({ top: 0 });
      requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add("visible")));
    };
    if (active && active !== target) {
      active.classList.remove("visible");
      setTimeout(swap, 400);
    } else {
      swap();
    }
  }

  // Hero visível ao carregar
  $("screen-hero").classList.add("visible");

  function startQuiz() {
    current = 0; score = 0; answers = [];
    renderQuestion();
    showScreen($("screen-quiz"));
  }

  function renderQuestion() {
    const q = questions[current];
    const total = questions.length;
    $("progress-text").textContent = `PERGUNTA ${pad(current + 1)} / ${pad(total)}`;
    $("score-counter").textContent = `ACERTOS: ${score}`;
    $("progress-bar").style.width = `${(current / total) * 100}%`;
    $("question-title").textContent = q.question;
    $("feedback-box").className = "feedback-box";
    $("btn-next").hidden = true;

    const list = $("options-container");
    list.innerHTML = "";
    q.options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = letters[i];
      const label = document.createElement("span");
      label.textContent = text;
      btn.append(letter, label);
      btn.addEventListener("click", () => selectOption(i));
      list.appendChild(btn);
    });
  }

  function selectOption(i) {
    const q = questions[current];
    const ok = i === q.correctAnswer;
    if (ok) score++;
    answers.push({ q: q.question, picked: q.options[i], right: q.options[q.correctAnswer], ok });

    $("options-container").querySelectorAll(".option-btn").forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correctAnswer) b.classList.add("correct");
      else if (idx === i) b.classList.add("wrong");
      else b.classList.add("faded");
    });

    const fb = $("feedback-box");
    fb.classList.add("show", ok ? "correct" : "wrong");
    $("feedback-icon").textContent = ok ? "🎉" : "😅";
    $("feedback-headline").textContent = ok ? "Acertou em cheio!" : `Era: ${q.options[q.correctAnswer]}`;
    $("feedback-comment").textContent = q.comment || "";

    $("score-counter").textContent = `ACERTOS: ${score}`;
    $("progress-bar").style.width = `${((current + 1) / questions.length) * 100}%`;
    const next = $("btn-next");
    next.textContent = current === questions.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
    next.hidden = false;
    next.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function finish() {
    const total = questions.length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    $("final-score").textContent = `${score}/${total}`;

    let headline, msg;
    if (pct >= 81) {
      headline = "Conexão de alma gêmea ❤️";
      msg = `${pct}% de acerto! Você me conhece de olhos fechados. Sou o cara mais sortudo do mundo por ter você.`;
    } else if (pct >= 41) {
      headline = "Muito bem, meu amor 🥰";
      msg = `${pct}% de acerto! Algumas pegadinhas passaram, mas ainda temos muitas histórias para colecionar juntos.`;
    } else {
      headline = "Hora de mais conversa e cafuné ☕";
      msg = `${pct}% de acerto. Sem problemas: vamos ter que passar mais tempo juntos para você me conhecer melhor!`;
    }
    $("result-headline").textContent = headline;
    $("result-message").textContent = msg;

    const sum = $("summary-container");
    sum.innerHTML = "";
    answers.forEach((a, n) => {
      const d = document.createElement("div");
      d.className = "summary-item";
      const t = document.createElement("div");
      t.className = "summary-item-q";
      t.textContent = `${n + 1}. ${a.q}`;
      const r = document.createElement("div");
      r.className = "summary-item-ans";
      const s1 = document.createElement("span");
      s1.className = a.ok ? "correct" : "wrong";
      s1.textContent = a.picked;
      r.append("Sua resposta: ", s1);
      if (!a.ok) {
        const s2 = document.createElement("span");
        s2.className = "correct";
        s2.textContent = a.right;
        r.append(document.createElement("br"), "Correta: ", s2);
      }
      d.append(t, r);
      sum.appendChild(d);
    });

    showScreen($("screen-result"));
    setTimeout(() => confettiBurst(pct >= 41 ? 1 : 0.5), 500);
  }

  function confettiBurst(k = 1) {
    if (typeof confetti !== "function") return;
    const base = { colors: COLORS, origin: { y: 0.7 } };
    confetti({ ...base, particleCount: Math.floor(120 * k), spread: 70 });
    confetti({ ...base, particleCount: Math.floor(80 * k), spread: 120, startVelocity: 25, scalar: 1.1 });
  }

  function openPrize() {
    $("prize-title").textContent = prize.title;
    $("prize-message").textContent = prize.message;
    $("prize-footer").textContent = prize.footer;
    $("prize-modal").hidden = false;
    confettiBurst(1.5);
  }

  $("btn-start").addEventListener("click", startQuiz);
  $("btn-next").addEventListener("click", () => {
    current++;
    current < questions.length ? renderQuestion() : finish();
  });
  $("btn-restart").addEventListener("click", startQuiz);
  $("btn-letter").addEventListener("click", openPrize);
  $("btn-close-prize").addEventListener("click", () => { $("prize-modal").hidden = true; });
  $("prize-modal").addEventListener("click", (e) => { if (e.target.id === "prize-modal") $("prize-modal").hidden = true; });
  $("btn-toggle-summary").addEventListener("click", (e) => {
    const open = $("summary-container").classList.toggle("show");
    e.currentTarget.textContent = open ? "Ocultar resumo ▲" : "Ver resumo das respostas ▼";
  });
});
