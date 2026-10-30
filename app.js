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

  const PASS_PCT = 75;

  function finish() {
    const total = questions.length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    const won = pct >= PASS_PCT;

    $("result-count").textContent = `Você acertou ${score} de ${total} perguntas`;
    $("final-score").textContent = `${pct}% de acerto`;
    $("prize-card").hidden = !won;
    $("retry-message").hidden = won;
    if (!won) {
      $("retry-message").textContent = `Quase lá! Você fez ${pct}%, mas precisava de pelo menos ${PASS_PCT}% para desbloquear o prêmio finalista. Que tal tentar mais uma vez?`;
    }
    $("btn-restart").textContent = won ? "Jogar novamente ↺" : "Tentar Novamente ↺";

    const sum = $("summary-container");
    sum.innerHTML = "";
    sum.classList.remove("show");
    $("btn-toggle-summary").textContent = "Ver Gabarito Completo (Acertos e Erros) ▼";
    answers.forEach((a, n) => {
      const d = document.createElement("div");
      d.className = "summary-item";
      const head = document.createElement("div");
      head.className = "summary-item-head";
      const t = document.createElement("div");
      t.className = "summary-item-q";
      t.textContent = `${pad(n + 1)}. ${a.q}`;
      const badge = document.createElement("span");
      badge.className = `badge ${a.ok ? "badge-ok" : "badge-err"}`;
      badge.textContent = a.ok ? "Acertou ✓" : "Errou ✗";
      head.append(t, badge);
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
        r.append(document.createElement("br"), "Resposta correta: ", s2);
      }
      d.append(head, r);
      sum.appendChild(d);
    });

    showScreen($("screen-result"));
    if (won) setTimeout(() => confettiBurst(1.5), 500);
  }

  function confettiBurst(k = 1) {
    if (typeof confetti !== "function") return;
    const base = { colors: COLORS, origin: { y: 0.7 } };
    confetti({ ...base, particleCount: Math.floor(120 * k), spread: 70 });
    confetti({ ...base, particleCount: Math.floor(80 * k), spread: 120, startVelocity: 25, scalar: 1.1 });
  }


  $("btn-start").addEventListener("click", startQuiz);
  $("btn-next").addEventListener("click", () => {
    current++;
    current < questions.length ? renderQuestion() : finish();
  });
  $("btn-restart").addEventListener("click", startQuiz);
  $("btn-toggle-summary").addEventListener("click", (e) => {
    const open = $("summary-container").classList.toggle("show");
    e.currentTarget.textContent = open ? "Ocultar Gabarito ▲" : "Ver Gabarito Completo (Acertos e Erros) ▼";
  });
});
