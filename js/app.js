/* =========================================================
   CCNP MC Online Test — Application Logic
   ========================================================= */

const App = (() => {
  /* ---- State ---- */
  let state = {
    allQuestions: [],
    activeQuestions: [],
    currentIndex: 0,
    answers: {},          // { questionId: selectedOptionIndex }
    reviewFlags: new Set(),
    startTime: null,
    timerInterval: null,
    totalSeconds: 0,
    mode: 'test',         // 'test' | 'review'
    selectedCategories: [],
    questionCount: 10,
    showExplanations: false,
  };

  /* ---- DOM helpers ---- */
  const el = id => document.getElementById(id);
  const show = id => el(id).classList.remove('hidden');
  const hide = id => el(id).classList.add('hidden');

  /* ---- Utilities ---- */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  /* ---- Setup Screen ---- */
  function initSetup() {
    const container = el('category-checkboxes');
    container.innerHTML = '';
    categories.forEach(cat => {
      const label = document.createElement('label');
      label.className = 'category-label';
      label.innerHTML = `
        <input type="checkbox" class="cat-checkbox" value="${cat}" checked>
        <span>${cat}</span>
      `;
      container.appendChild(label);
    });

    el('question-count').value = 10;
    el('start-btn').addEventListener('click', startTest);
    el('select-all-btn').addEventListener('click', () => {
      document.querySelectorAll('.cat-checkbox').forEach(cb => { cb.checked = true; });
    });
    el('deselect-all-btn').addEventListener('click', () => {
      document.querySelectorAll('.cat-checkbox').forEach(cb => { cb.checked = false; });
    });
  }

  function startTest() {
    const checkedBoxes = document.querySelectorAll('.cat-checkbox:checked');
    if (checkedBoxes.length === 0) {
      showAlert('Please select at least one category.');
      return;
    }

    state.selectedCategories = Array.from(checkedBoxes).map(cb => cb.value);
    const count = parseInt(el('question-count').value, 10);

    const filtered = questionBank.filter(q => state.selectedCategories.includes(q.category));
    if (filtered.length === 0) {
      showAlert('No questions available for the selected categories.');
      return;
    }

    const actualCount = Math.min(count, filtered.length);
    state.activeQuestions = shuffle(filtered).slice(0, actualCount);
    state.questionCount = actualCount;
    state.currentIndex = 0;
    state.answers = {};
    state.reviewFlags = new Set();
    state.totalSeconds = 0;
    state.mode = 'test';

    hide('setup-screen');
    show('test-screen');
    renderQuestion();
    startTimer();
  }

  /* ---- Timer ---- */
  function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(() => {
      state.totalSeconds++;
      el('timer').textContent = formatTime(state.totalSeconds);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
  }

  /* ---- Question Rendering ---- */
  function renderQuestion() {
    const q = state.activeQuestions[state.currentIndex];
    const total = state.activeQuestions.length;
    const answered = Object.keys(state.answers).length;

    // Progress
    el('progress-text').textContent = `Question ${state.currentIndex + 1} of ${total}`;
    el('answered-count').textContent = `Answered: ${answered}/${total}`;
    el('progress-bar').style.width = `${((state.currentIndex + 1) / total) * 100}%`;

    // Category badge
    el('q-category').textContent = q.category;

    // Question text
    el('q-text').textContent = q.question;

    // Options
    const optionsContainer = el('q-options');
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.dataset.index = i;

      if (state.answers[q.id] !== undefined) {
        if (i === state.answers[q.id]) btn.classList.add('selected');
      }

      btn.addEventListener('click', () => selectAnswer(q.id, i));
      optionsContainer.appendChild(btn);
    });

    // Review flag
    el('flag-btn').classList.toggle('flagged', state.reviewFlags.has(q.id));

    // Navigation buttons
    el('prev-btn').disabled = state.currentIndex === 0;
    el('next-btn').textContent = state.currentIndex === total - 1 ? 'Finish' : 'Next →';

    // Question map
    renderQuestionMap();
  }

  function selectAnswer(questionId, optionIndex) {
    state.answers[questionId] = optionIndex;
    renderQuestion();
  }

  function renderQuestionMap() {
    const map = el('question-map');
    map.innerHTML = '';
    state.activeQuestions.forEach((q, i) => {
      const dot = document.createElement('button');
      dot.className = 'map-dot';
      dot.textContent = i + 1;
      dot.title = `Q${i + 1}: ${q.category}`;
      if (i === state.currentIndex) dot.classList.add('current');
      if (state.answers[q.id] !== undefined) dot.classList.add('answered');
      if (state.reviewFlags.has(q.id)) dot.classList.add('flagged');
      dot.addEventListener('click', () => {
        state.currentIndex = i;
        renderQuestion();
      });
      map.appendChild(dot);
    });
  }

  /* ---- Navigation ---- */
  function navigate(direction) {
    const total = state.activeQuestions.length;
    if (direction === 'next') {
      if (state.currentIndex === total - 1) {
        confirmFinish();
      } else {
        state.currentIndex++;
        renderQuestion();
      }
    } else {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
      }
    }
  }

  function toggleFlag() {
    const q = state.activeQuestions[state.currentIndex];
    if (state.reviewFlags.has(q.id)) {
      state.reviewFlags.delete(q.id);
    } else {
      state.reviewFlags.add(q.id);
    }
    renderQuestion();
  }

  function confirmFinish() {
    const unanswered = state.activeQuestions.length - Object.keys(state.answers).length;
    if (unanswered > 0) {
      showConfirm(
        `You have ${unanswered} unanswered question(s). Do you want to finish the test?`,
        showResults
      );
    } else {
      showResults();
    }
  }

  /* ---- Results ---- */
  function showResults() {
    stopTimer();
    hide('test-screen');
    show('results-screen');

    let correct = 0;
    state.activeQuestions.forEach(q => {
      if (state.answers[q.id] === q.answer) correct++;
    });

    const total = state.activeQuestions.length;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= 70;

    el('score-circle').textContent = `${percent}%`;
    el('score-circle').className = `score-circle ${passed ? 'pass' : 'fail'}`;
    el('score-detail').textContent = `${correct} / ${total} correct`;
    el('time-taken').textContent = `Time: ${formatTime(state.totalSeconds)}`;
    el('pass-fail-badge').textContent = passed ? '✓ PASS' : '✗ FAIL';
    el('pass-fail-badge').className = `pass-fail-badge ${passed ? 'pass' : 'fail'}`;

    // Category breakdown
    const breakdown = {};
    state.activeQuestions.forEach(q => {
      if (!breakdown[q.category]) breakdown[q.category] = { correct: 0, total: 0 };
      breakdown[q.category].total++;
      if (state.answers[q.id] === q.answer) breakdown[q.category].correct++;
    });

    const breakdownEl = el('category-breakdown');
    breakdownEl.innerHTML = '<h3>Category Breakdown</h3>';
    Object.entries(breakdown).forEach(([cat, data]) => {
      const pct = Math.round((data.correct / data.total) * 100);
      breakdownEl.innerHTML += `
        <div class="breakdown-item">
          <span class="breakdown-cat">${cat}</span>
          <div class="breakdown-bar-wrap">
            <div class="breakdown-bar" style="width:${pct}%"></div>
          </div>
          <span class="breakdown-score">${data.correct}/${data.total} (${pct}%)</span>
        </div>
      `;
    });

    // Review section
    buildReviewSection();
  }

  function buildReviewSection() {
    const container = el('review-container');
    container.innerHTML = '';
    state.activeQuestions.forEach((q, idx) => {
      const userAnswer = state.answers[q.id];
      const isCorrect = userAnswer === q.answer;
      const flagged = state.reviewFlags.has(q.id);

      const card = document.createElement('div');
      card.className = `review-card ${isCorrect ? 'correct' : 'incorrect'}`;
      card.innerHTML = `
        <div class="review-header">
          <span class="review-num">Q${idx + 1}</span>
          <span class="review-cat">${q.category}</span>
          ${flagged ? '<span class="review-flag">🚩 Flagged</span>' : ''}
          <span class="review-result">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
        </div>
        <p class="review-question">${q.question}</p>
        <div class="review-options">
          ${q.options.map((opt, i) => `
            <div class="review-option ${i === q.answer ? 'correct-opt' : ''} ${i === userAnswer && !isCorrect ? 'wrong-opt' : ''}">
              ${opt}
              ${i === q.answer ? ' <span class="opt-label correct-label">✓ Correct</span>' : ''}
              ${i === userAnswer && !isCorrect ? ' <span class="opt-label wrong-label">✗ Your answer</span>' : ''}
              ${userAnswer === undefined && i === q.answer ? ' <span class="opt-label skipped-label">(Skipped)</span>' : ''}
            </div>
          `).join('')}
        </div>
        <div class="explanation">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      `;
      container.appendChild(card);
    });
  }

  /* ---- Custom Alert / Confirm dialogs ---- */
  function showAlert(message) {
    el('modal-message').textContent = message;
    el('modal-confirm-btn').classList.add('hidden');
    el('modal-cancel-btn').textContent = 'OK';
    show('modal-overlay');
    el('modal-cancel-btn').onclick = () => hide('modal-overlay');
  }

  function showConfirm(message, onConfirm) {
    el('modal-message').textContent = message;
    el('modal-confirm-btn').classList.remove('hidden');
    el('modal-cancel-btn').textContent = 'Cancel';
    show('modal-overlay');
    el('modal-confirm-btn').onclick = () => {
      hide('modal-overlay');
      onConfirm();
    };
    el('modal-cancel-btn').onclick = () => hide('modal-overlay');
  }

  /* ---- Event Listeners ---- */
  function bindEvents() {
    el('prev-btn').addEventListener('click', () => navigate('prev'));
    el('next-btn').addEventListener('click', () => navigate('next'));
    el('flag-btn').addEventListener('click', toggleFlag);
    el('restart-btn').addEventListener('click', () => {
      hide('results-screen');
      show('setup-screen');
    });
    el('review-all-btn').addEventListener('click', () => {
      el('review-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- Init ---- */
  function init() {
    initSetup();
    bindEvents();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
