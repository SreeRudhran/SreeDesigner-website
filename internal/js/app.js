// 60-Day Technical Upskilling Dashboard - Application Logic
// Handles state persistence (localStorage['techJourney60']), dynamic rendering,
// interactive quizzes, modal drawer, calendar, portfolio manager, and data import/export.

(function () {
  'use strict';

  // 1. STATE INITIALIZATION & BACKWARDS COMPATIBILITY
  const STORAGE_KEY = 'techJourney60';

  function getDefaultState() {
    return {
      days: {},              // { [dayNumber]: true } - Preserved legacy structure
      quizScores: {},        // { [dayNumber]: { score: 4, total: 5, passed: true } }
      assignments: {},       // { [dayNumber]: true }
      notes: {},             // { [dayNumber]: string }
      portfolio: {
        p1: { github: '', demo: '', notes: '', completed: false },
        p2: { github: '', demo: '', brd: '', notes: '', completed: false }
      },
      assessmentScores: {},  // { [examId]: { score: 18, total: 20, passed: true, date: '' } }
      careerPreferences: {}, // user choices in 3-way rubric
      lastActiveDay: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10)
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      // Merge with defaults to guarantee all schema properties exist
      const state = Object.assign(getDefaultState(), parsed);
      state.days = state.days || {};
      state.quizScores = state.quizScores || {};
      state.assignments = state.assignments || {};
      state.notes = state.notes || {};
      state.portfolio = Object.assign(getDefaultState().portfolio, state.portfolio || {});
      state.assessmentScores = state.assessmentScores || {};
      updateStreak(state);
      return state;
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      return getDefaultState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      renderStats();
      renderCalendar();
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  function updateStreak(state) {
    const today = new Date().toISOString().slice(0, 10);
    if (!state.lastActiveDate) {
      state.lastActiveDate = today;
      state.streak = 1;
      return;
    }
    if (state.lastActiveDate === today) return; // already counted today

    const last = new Date(state.lastActiveDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      state.streak = (state.streak || 0) + 1;
    } else if (diffDays > 1) {
      // Streak broken but keep minimum 1
      state.streak = 1;
    }
    state.lastActiveDate = today;
  }

  const appState = loadState();
  const curriculum = window.CURRICULUM_DATA || { meta: {}, days: [], weeklyAssessments: [], phaseExams: [], resourceLibrary: [], interviewQuestionBank: [], careerAssessment: {} };

  // Current active filters
  let currentPhaseFilter = 'all';
  let currentStatusFilter = 'all';
  let searchQuery = '';

  // 2. DOM ELEMENT REFERENCES
  const el = {
    // Header Stats
    completedStat: document.getElementById('completedStat'),
    hoursStat: document.getElementById('hoursStat'),
    percentStat: document.getElementById('percentStat'),
    streakStat: document.getElementById('streakStat'),
    progressBar: document.getElementById('progressBar'),
    progressPercent: document.getElementById('progressPercent'),
    currentPhaseBadge: document.getElementById('currentPhaseBadge'),
    nextLessonCard: document.getElementById('nextLessonCard'),

    // Navigation & Views
    navTabs: document.querySelectorAll('.tab-btn'),
    sections: document.querySelectorAll('.dashboard-view'),

    // Roadmap View
    phasePills: document.querySelectorAll('.phase-pill'),
    statusSelect: document.getElementById('statusFilterSelect'),
    searchInput: document.getElementById('daySearchInput'),
    daysContainer: document.getElementById('daysListContainer'),

    // Calendar View
    calendarGrid: document.getElementById('calendarGridContainer'),

    // Modal
    modalOverlay: document.getElementById('dayDetailModal'),
    modalBody: document.getElementById('modalContentBody'),
    modalCloseBtn: document.getElementById('closeModalBtn'),

    // Assessments View
    weeklyAssessmentsList: document.getElementById('weeklyAssessmentsList'),
    phaseExamsList: document.getElementById('phaseExamsList'),
    examRunnerModal: document.getElementById('examRunnerModal'),
    examRunnerBody: document.getElementById('examRunnerBody'),
    closeExamModalBtn: document.getElementById('closeExamModalBtn'),

    // Resources View
    resourcesContainer: document.getElementById('resourcesContainer'),
    resourceCatPills: document.querySelectorAll('.resource-cat-pill'),

    // Interview Question Bank
    interviewBankContainer: document.getElementById('interviewBankContainer'),
    interviewCatPills: document.querySelectorAll('.interview-cat-pill'),

    // Portfolio
    p1Github: document.getElementById('p1Github'),
    p1Demo: document.getElementById('p1Demo'),
    p1Notes: document.getElementById('p1Notes'),
    p1SaveBtn: document.getElementById('p1SaveBtn'),
    p2Github: document.getElementById('p2Github'),
    p2Demo: document.getElementById('p2Demo'),
    p2Brd: document.getElementById('p2Brd'),
    p2Notes: document.getElementById('p2Notes'),
    p2SaveBtn: document.getElementById('p2SaveBtn'),

    // Career Rubric
    careerTableBody: document.getElementById('careerTableBody'),
    calcScoreBtn: document.getElementById('calcCareerScoreBtn'),
    careerResultBlock: document.getElementById('careerResultBlock'),

    // Settings
    exportJsonBtn: document.getElementById('exportJsonBtn'),
    importJsonInput: document.getElementById('importJsonInput'),
    importJsonBtn: document.getElementById('importJsonBtn'),
    resetProgressBtn: document.getElementById('resetProgressBtn')
  };

  // 3. STATS & PROGRESS CALCULATION
  function calculateStats() {
    const totalDays = curriculum.days.length || 60;
    const completedDays = Object.keys(appState.days).filter(d => appState.days[d]).length;
    const percent = Math.round((completedDays / totalDays) * 100);
    const totalHours = completedDays * 3;

    // Determine current phase based on first uncompleted day
    let nextDayNum = 1;
    for (let i = 1; i <= totalDays; i++) {
      if (!appState.days[i]) {
        nextDayNum = i;
        break;
      }
      if (i === totalDays) nextDayNum = totalDays;
    }
    const nextDayObj = curriculum.days.find(d => d.day === nextDayNum) || curriculum.days[0];

    return {
      completedDays,
      totalDays,
      percent,
      totalHours,
      nextDayObj,
      streak: appState.streak || 1
    };
  }

  function renderStats() {
    const stats = calculateStats();
    if (el.completedStat) el.completedStat.textContent = stats.completedDays + ' / ' + stats.totalDays;
    if (el.hoursStat) el.hoursStat.textContent = stats.totalHours + 'h';
    if (el.percentStat) el.percentStat.textContent = stats.percent + '%';
    if (el.streakStat) el.streakStat.textContent = stats.streak + (stats.streak === 1 ? ' day' : ' days');
    if (el.progressBar) el.progressBar.style.width = stats.percent + '%';
    if (el.progressPercent) el.progressPercent.textContent = stats.percent + '% Complete';

    if (el.currentPhaseBadge && stats.nextDayObj) {
      el.currentPhaseBadge.textContent = 'Phase: ' + stats.nextDayObj.phase;
    }

    if (el.nextLessonCard && stats.nextDayObj) {
      el.nextLessonCard.innerHTML = `
        <div class="next-card-content">
          <div class="next-tag">Next Scheduled Lesson · Day ${stats.nextDayObj.day}</div>
          <h3 class="next-title">${escapeHtml(stats.nextDayObj.title)}</h3>
          <p class="next-desc">${escapeHtml(stats.nextDayObj.expectedOutcome || (stats.nextDayObj.objectives ? stats.nextDayObj.objectives[0] : ''))}</p>
        </div>
        <button class="btn btn-primary" onclick="window.TechJourneyApp.openDayModal(${stats.nextDayObj.day})">
          Open Lesson →
        </button>
      `;
    }
  }

  // 4. TAB NAVIGATION
  function switchTab(targetTabId) {
    el.navTabs.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    el.sections.forEach(sec => {
      if (sec.id === targetTabId) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    window.location.hash = targetTabId;
  }

  // 5. ROADMAP DAY LIST RENDERING
  function renderRoadmap() {
    if (!el.daysContainer) return;

    let filtered = curriculum.days.filter(day => {
      // Phase filter
      if (currentPhaseFilter !== 'all' && day.phase.toLowerCase() !== currentPhaseFilter.toLowerCase()) {
        return false;
      }
      // Status filter
      const isDone = !!appState.days[day.day];
      if (currentStatusFilter === 'completed' && !isDone) return false;
      if (currentStatusFilter === 'pending' && isDone) return false;
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const inTitle = day.title.toLowerCase().includes(q);
        const inPhase = day.phase.toLowerCase().includes(q);
        const inOutcome = (day.expectedOutcome || '').toLowerCase().includes(q);
        if (!inTitle && !inPhase && !inOutcome) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      el.daysContainer.innerHTML = `
        <div class="empty-state">
          <p>No modules match your current search or filter criteria.</p>
          <button class="btn btn-secondary" onclick="window.TechJourneyApp.resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    const html = filtered.map(day => {
      const isDone = !!appState.days[day.day];
      const quiz = appState.quizScores[day.day];
      const phaseColor = getPhaseColor(day.phaseId);

      return `
        <div class="day-card ${isDone ? 'done' : ''}" data-day="${day.day}" onclick="window.TechJourneyApp.openDayModal(${day.day})">
          <div class="day-card-left">
            <div class="day-badge" style="border-color:${phaseColor}; color:${phaseColor}">
              Day ${day.day}
            </div>
            <div class="day-meta-info">
              <div class="day-eyebrow">
                <span class="day-phase-tag" style="background:${phaseColor}20; color:${phaseColor}">${escapeHtml(day.phase)}</span>
                <span class="day-difficulty">${escapeHtml(day.difficulty)}</span>
                <span class="day-duration">⏱ ${day.duration} mins</span>
              </div>
              <h3 class="day-card-title">${escapeHtml(day.title)}</h3>
              <p class="day-card-preview">${escapeHtml(day.expectedOutcome || (day.objectives ? day.objectives[0] : ''))}</p>
            </div>
          </div>
          <div class="day-card-right">
            ${isDone
              ? `<span class="status-badge complete"><span class="check-icon">✓</span> Complete</span>`
              : `<span class="status-badge pending">Pending</span>`
            }
            ${quiz
              ? `<div class="quiz-score-pill ${quiz.passed ? 'passed' : 'failed'}">Quiz: ${quiz.score}/${quiz.total}</div>`
              : ''
            }
          </div>
        </div>
      `;
    }).join('');

    el.daysContainer.innerHTML = html;
  }

  function getPhaseColor(phaseId) {
    const colors = ['#43d19e', '#68a7ff', '#f4bd63', '#a78bfa', '#f87171'];
    return colors[phaseId] || '#68a7ff';
  }

  // 6. CALENDAR / TIMELINE RENDERING
  function renderCalendar() {
    if (!el.calendarGrid) return;

    const totalDays = curriculum.days.length || 60;
    const weeklyExamDays = [7, 14, 21, 28, 35, 42, 49, 56];
    const phaseExamDays = [10, 25, 39, 47, 60];

    let html = '';
    for (let d = 1; d <= totalDays; d++) {
      const dayObj = curriculum.days.find(x => x.day === d) || { day: d, title: 'Day ' + d, phaseId: 0 };
      const isDone = !!appState.days[d];
      const isWeeklyExam = weeklyExamDays.includes(d);
      const isPhaseExam = phaseExamDays.includes(d);
      const phaseColor = getPhaseColor(dayObj.phaseId);

      let specialTag = '';
      if (isPhaseExam) specialTag = `<span class="cal-tag exam">Exam</span>`;
      else if (isWeeklyExam) specialTag = `<span class="cal-tag weekly">W-Assmt</span>`;

      html += `
        <div class="cal-day-cell ${isDone ? 'done' : ''} ${isPhaseExam ? 'is-exam' : ''}" 
             onclick="window.TechJourneyApp.openDayModal(${d})"
             title="Day ${d}: ${escapeHtml(dayObj.title)}">
          <div class="cal-day-num" style="color:${isDone ? '#43d19e' : phaseColor}">
            ${d}
          </div>
          <div class="cal-day-phase-bar" style="background:${phaseColor}"></div>
          ${specialTag}
          <div class="cal-check">${isDone ? '✓' : ''}</div>
        </div>
      `;
    }

    el.calendarGrid.innerHTML = html;
  }

  // 7. DAY DETAIL MODAL (SECTIONS A THROUGH H)
  let activeModalDay = null;

  function openDayModal(dayNum) {
    const day = curriculum.days.find(d => d.day === dayNum);
    if (!day) return;
    activeModalDay = day;

    const isDone = !!appState.days[dayNum];
    const quizState = appState.quizScores[dayNum] || null;
    const isAssignmentDone = !!appState.assignments[dayNum];
    const phaseColor = getPhaseColor(day.phaseId);

    let html = `
      <!-- SECTION A: LEARNING OVERVIEW -->
      <div class="modal-section-block hero-block" style="border-top: 4px solid ${phaseColor}">
        <div class="modal-header-meta">
          <span class="pill" style="border-color:${phaseColor}; color:${phaseColor}">${escapeHtml(day.phase)}</span>
          <span class="pill">Day ${day.day} of 60</span>
          <span class="pill">${escapeHtml(day.difficulty)}</span>
          <span class="pill">⏱ ${day.duration} Minutes (3 Hours)</span>
          ${isDone ? `<span class="pill complete-pill">✓ Marked Complete</span>` : ''}
        </div>
        <h2 class="modal-day-title">${escapeHtml(day.title)}</h2>
        <div class="overview-grid">
          <div class="overview-box">
            <strong>🎯 Learning Objectives</strong>
            <ul>
              ${(day.objectives || []).map(obj => `<li>${escapeHtml(obj)}</li>`).join('')}
            </ul>
          </div>
          <div class="overview-box">
            <strong>📋 Prerequisites & Target Outcome</strong>
            <p><strong>Prerequisites:</strong> ${escapeHtml(day.prerequisites || 'None')}</p>
            <p><strong>Expected Outcome:</strong> ${escapeHtml(day.expectedOutcome || 'Mastery of daily competencies.')}</p>
          </div>
        </div>
      </div>

      <!-- SECTION B: EXACT LEARNING TOPICS -->
      <div class="modal-section-block">
        <h3 class="section-title">📚 Deep-Dive Concepts & Production Principles</h3>
        <p class="section-subtitle">Explanatory breakdowns, industry context, code patterns, and practical FinTech use cases.</p>
        <div class="topics-accordion">
          ${(day.topics || []).map((t, idx) => `
            <div class="topic-card">
              <h4 class="topic-name">${idx + 1}. ${escapeHtml(t.concept)}</h4>
              <div class="topic-field">
                <span class="field-label">What it means:</span>
                <span class="field-body">${escapeHtml(t.what)}</span>
              </div>
              <div class="topic-field">
                <span class="field-label">Why it matters:</span>
                <span class="field-body">${escapeHtml(t.why)}</span>
              </div>
              <div class="topic-field">
                <span class="field-label">How it works:</span>
                <code class="code-block">${escapeHtml(t.how)}</code>
              </div>
              <div class="topic-field">
                <span class="field-label">Concrete Example:</span>
                <span class="field-body">${escapeHtml(t.example)}</span>
              </div>
              <div class="topic-field highlight">
                <span class="field-label">FinTech Business Use Case:</span>
                <span class="field-body">${escapeHtml(t.businessCase)}</span>
              </div>
              <div class="topic-field warning">
                <span class="field-label">Common Mistakes to Avoid:</span>
                <span class="field-body">${escapeHtml(t.pitfalls)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION C: LEARNING RESOURCES -->
      <div class="modal-section-block">
        <h3 class="section-title">🔗 Official Documentation & Targeted YouTube Lessons</h3>
        <p class="section-subtitle">Vetted, zero-cost learning resources directly matching today's syllabus.</p>
        <div class="resources-grid">
          ${(day.resources || []).map(res => `
            <div class="resource-card">
              <div class="res-platform">${escapeHtml(res.platform)} · ⏱ ${escapeHtml(res.time)}</div>
              <h4 class="res-title">${escapeHtml(res.title)}</h4>
              <p class="res-covers"><strong>Covers:</strong> ${escapeHtml(res.covers)}</p>
              <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                Open Resource ↗
              </a>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION D: 3-HOUR TIMETABLE -->
      <div class="modal-section-block">
        <h3 class="section-title">⏱ 180-Minute Daily Study Timetable</h3>
        <p class="section-subtitle">Structured, disciplined schedule balancing theory, hands-on practice, and business delivery.</p>
        <div class="timetable-list">
          ${(day.timetable || []).map(item => `
            <div class="timetable-row">
              <div class="time-col">${escapeHtml(item.time)}</div>
              <div class="activity-col">${escapeHtml(item.activity)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION E: GUIDED PRACTICAL EXERCISES -->
      <div class="modal-section-block">
        <h3 class="section-title">🛠 Guided Practical Exercises (3 Challenges)</h3>
        <p class="section-subtitle">Progressive hands-on scenarios. Attempt each exercise before revealing the worked solution.</p>
        <div class="exercises-list">
          ${(day.exercises || []).map((ex, exIdx) => `
            <div class="exercise-box">
              <div class="ex-header">
                <strong>Exercise ${exIdx + 1}: ${escapeHtml(ex.title)}</strong>
              </div>
              <p><strong>Problem:</strong> ${escapeHtml(ex.problem)}</p>
              <p><strong>Scenario:</strong> ${escapeHtml(ex.scenario)}</p>
              <p><strong>Instructions:</strong></p>
              <pre class="instructions-pre">${escapeHtml(ex.instructions)}</pre>
              <p><strong>Expected Output:</strong> ${escapeHtml(ex.expectedOutput)}</p>
              <div class="hint-block">💡 <strong>Hint:</strong> ${escapeHtml(ex.hint)}</div>
              <button class="btn btn-sm btn-reveal" onclick="window.TechJourneyApp.toggleSolution('sol-${day.day}-${exIdx}')">
                Reveal Worked Solution
              </button>
              <div id="sol-${day.day}-${exIdx}" class="solution-container" style="display:none">
                <strong>Worked Solution:</strong>
                <pre class="solution-code">${escapeHtml(ex.solution)}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION F: REAL-WORLD BUSINESS ASSIGNMENT -->
      <div class="modal-section-block assignment-block">
        <h3 class="section-title">💼 Practical Business Assignment</h3>
        <p class="section-subtitle">The commercial work product representing today's milestone.</p>
        <div class="assignment-card">
          <h4>${escapeHtml(day.assignment ? day.assignment.title : 'Daily Assignment')}</h4>
          <p><strong>Business Scenario:</strong> ${escapeHtml(day.assignment ? day.assignment.scenario : '')}</p>
          <p><strong>Required Deliverables:</strong></p>
          <pre class="instructions-pre">${escapeHtml(day.assignment ? day.assignment.deliverable : '')}</pre>
          <div class="completion-criteria-note">
            <strong>Completion Criteria:</strong> ${escapeHtml(day.assignment ? day.assignment.completionCriteria : '')}
          </div>
          <div class="assignment-check-row">
            <label class="custom-checkbox-label">
              <input type="checkbox" id="assignmentCheck_${day.day}" ${isAssignmentDone ? 'checked' : ''} 
                     onchange="window.TechJourneyApp.toggleAssignment(${day.day}, this.checked)">
              <span>I have completed and verified this business assignment</span>
            </label>
          </div>
        </div>
      </div>

      <!-- SECTION G: DAILY KNOWLEDGE ASSESSMENT -->
      <div class="modal-section-block">
        <h3 class="section-title">📝 Daily Knowledge Assessment (5 MCQs & Scenarios)</h3>
        <p class="section-subtitle">Minimum 75% score (4/5) required to unlock day completion.</p>
        <div id="quizContainer_${day.day}" class="quiz-container">
          ${renderQuiz(day.day, day.assessment ? day.assessment.mcqs : [])}
        </div>

        <div class="scenario-questions-block">
          <h4>Practical Scenario Questions</h4>
          ${((day.assessment && day.assessment.scenarios) || []).map((sc, scIdx) => `
            <div class="scenario-box">
              <p><strong>Q${scIdx + 1}: ${escapeHtml(sc.question)}</strong></p>
              <button class="btn btn-sm btn-reveal" onclick="window.TechJourneyApp.toggleSolution('sc-sol-${day.day}-${scIdx}')">
                Reveal Model Answer
              </button>
              <div id="sc-sol-${day.day}-${scIdx}" class="solution-container" style="display:none">
                <strong>Model Answer:</strong>
                <p>${escapeHtml(sc.solution)}</p>
              </div>
            </div>
          `).join('')}
        </div>

        ${day.assessment && day.assessment.miniAssignment ? `
          <div class="mini-assignment-box">
            <strong>Mini-Assignment:</strong>
            <p>${escapeHtml(day.assessment.miniAssignment)}</p>
          </div>
        ` : ''}
      </div>

      <!-- SECTION H: COMPLETION GATEWAY -->
      <div class="modal-section-block completion-gateway-block">
        <h3 class="section-title">🏁 Day Completion Gateway</h3>
        <div id="completionGateStatus_${day.day}">
          ${renderCompletionGateStatus(day.day)}
        </div>
      </div>
    `;

    el.modalBody.innerHTML = html;
    el.modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    el.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    activeModalDay = null;
  }

  // 8. INTERACTIVE QUIZ ENGINE (75% PASS MARK RULE)
  // Stores in-memory candidate selections during the active session
  const activeQuizAnswers = {};

  function renderQuiz(dayNum, mcqs) {
    if (!mcqs || mcqs.length === 0) return '<p>No quiz questions for today.</p>';
    activeQuizAnswers[dayNum] = activeQuizAnswers[dayNum] || {};

    const savedQuiz = appState.quizScores[dayNum];

    let html = mcqs.map((q, qIdx) => {
      const selected = activeQuizAnswers[dayNum][qIdx];
      const isAnswered = selected !== undefined;
      const isCorrect = selected === q.correct;

      return `
        <div class="mcq-card ${isAnswered ? (isCorrect ? 'correct-card' : 'incorrect-card') : ''}" id="mcq_${dayNum}_${qIdx}">
          <p class="mcq-question"><strong>Q${qIdx + 1}:</strong> ${escapeHtml(q.question)}</p>
          <div class="mcq-options">
            ${(q.options || []).map((opt, optIdx) => {
              let optClass = 'mcq-opt';
              if (isAnswered) {
                if (optIdx === q.correct) optClass += ' is-correct';
                else if (optIdx === selected) optClass += ' is-selected-wrong';
              }
              return `
                <button type="button" class="${optClass}" 
                        onclick="window.TechJourneyApp.selectMcqOption(${dayNum}, ${qIdx}, ${optIdx})"
                        ${isAnswered ? 'disabled' : ''}>
                  <span class="opt-letter">${String.fromCharCode(65 + optIdx)}.</span> ${escapeHtml(opt)}
                </button>
              `;
            }).join('')}
          </div>
          ${isAnswered ? `
            <div class="mcq-explanation">
              <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${escapeHtml(q.explanation)}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Summary calculation
    const answeredCount = Object.keys(activeQuizAnswers[dayNum]).length;
    let correctCount = 0;
    mcqs.forEach((q, idx) => {
      if (activeQuizAnswers[dayNum][idx] === q.correct) correctCount++;
    });

    if (answeredCount === mcqs.length) {
      const percent = Math.round((correctCount / mcqs.length) * 100);
      const passed = percent >= 75;

      // Update state
      appState.quizScores[dayNum] = { score: correctCount, total: mcqs.length, percent, passed };
      saveState(appState);

      html += `
        <div class="quiz-result-banner ${passed ? 'passed' : 'failed'}">
          <h4>Quiz Result: ${correctCount} / ${mcqs.length} (${percent}%)</h4>
          <p>${passed 
            ? '🎉 Great job! You passed the 75% knowledge threshold.' 
            : '⚠️ Passing score is 75% (minimum 4 correct). Review the explanations above and try again.'}
          </p>
          ${!passed ? `
            <button class="btn btn-secondary btn-sm" onclick="window.TechJourneyApp.retakeQuiz(${dayNum})">
              Retake Quiz
            </button>
          ` : ''}
        </div>
      `;
    }

    return html;
  }

  function selectMcqOption(dayNum, qIdx, optIdx) {
    activeQuizAnswers[dayNum] = activeQuizAnswers[dayNum] || {};
    activeQuizAnswers[dayNum][qIdx] = optIdx;

    const day = curriculum.days.find(d => d.day === dayNum);
    const quizContainer = document.getElementById('quizContainer_' + dayNum);
    if (quizContainer && day) {
      quizContainer.innerHTML = renderQuiz(dayNum, day.assessment.mcqs);
      updateCompletionGateStatus(dayNum);
    }
  }

  function retakeQuiz(dayNum) {
    activeQuizAnswers[dayNum] = {};
    const day = curriculum.days.find(d => d.day === dayNum);
    const quizContainer = document.getElementById('quizContainer_' + dayNum);
    if (quizContainer && day) {
      quizContainer.innerHTML = renderQuiz(dayNum, day.assessment.mcqs);
      updateCompletionGateStatus(dayNum);
    }
  }

  function toggleAssignment(dayNum, isChecked) {
    appState.assignments[dayNum] = !!isChecked;
    saveState(appState);
    updateCompletionGateStatus(dayNum);
  }

  function renderCompletionGateStatus(dayNum) {
    const isDone = !!appState.days[dayNum];
    const quiz = appState.quizScores[dayNum];
    const isAssignDone = !!appState.assignments[dayNum];

    const quizPassed = quiz && quiz.passed;

    if (isDone) {
      return `
        <div class="completion-success-card">
          <div class="complete-header">
            <span class="big-check">✓</span>
            <div>
              <h4>Day ${dayNum} Marked as Completed!</h4>
              <p>Your progress is saved in your local dashboard.</p>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.TechJourneyApp.markDayIncomplete(${dayNum})">
            Undo Completion
          </button>
        </div>
      `;
    }

    const canComplete = quizPassed && isAssignDone;

    return `
      <div class="gate-criteria-checklist">
        <div class="gate-item ${isAssignDone ? 'met' : 'unmet'}">
          ${isAssignDone ? '✓' : '○'} Business assignment completed
        </div>
        <div class="gate-item ${quizPassed ? 'met' : 'unmet'}">
          ${quizPassed ? '✓' : '○'} Knowledge assessment score >= 75% (${quiz ? quiz.score + '/' + quiz.total : 'Not taken'})
        </div>
      </div>
      <div class="gate-action-row">
        <button class="btn btn-primary btn-lg" 
                ${canComplete ? '' : 'disabled'}
                onclick="window.TechJourneyApp.markDayComplete(${dayNum})">
          ✓ Mark Day ${dayNum} as Complete
        </button>
        ${!canComplete ? `<span class="gate-hint">Satisfy all criteria above to unlock.</span>` : ''}
      </div>
    `;
  }

  function updateCompletionGateStatus(dayNum) {
    const elGate = document.getElementById('completionGateStatus_' + dayNum);
    if (elGate) {
      elGate.innerHTML = renderCompletionGateStatus(dayNum);
    }
  }

  function markDayComplete(dayNum) {
    appState.days[dayNum] = true;
    appState.lastActiveDay = dayNum;
    saveState(appState);
    renderRoadmap();
    updateCompletionGateStatus(dayNum);
  }

  function markDayIncomplete(dayNum) {
    delete appState.days[dayNum];
    saveState(appState);
    renderRoadmap();
    updateCompletionGateStatus(dayNum);
  }

  function toggleSolution(solId) {
    const elSol = document.getElementById(solId);
    if (!elSol) return;
    if (elSol.style.display === 'none' || elSol.style.display === '') {
      elSol.style.display = 'block';
    } else {
      elSol.style.display = 'none';
    }
  }

  // 9. EXAMINATIONS & ASSESSMENTS VIEW
  function renderAssessmentsView() {
    // Weekly Assessments
    if (el.weeklyAssessmentsList) {
      el.weeklyAssessmentsList.innerHTML = (curriculum.weeklyAssessments || []).map(wa => {
        const score = appState.assessmentScores['week_' + wa.week];
        return `
          <div class="assessment-card">
            <div class="assmt-header">
              <span class="pill">Week ${wa.week} · Day ${wa.day}</span>
              ${score 
                ? `<span class="pill ${score.passed ? 'complete-pill' : 'failed-pill'}">Score: ${score.score}/${score.total}</span>`
                : `<span class="pill pending">Not Taken</span>`
              }
            </div>
            <h4>${escapeHtml(wa.title)}</h4>
            <p>5 Cumulative scenario questions covering all topics up to Week ${wa.week}.</p>
            <button class="btn btn-sm btn-outline" onclick="window.TechJourneyApp.startWeeklyExam(${wa.week})">
              ${score ? 'Retake Assessment' : 'Start Assessment →'}
            </button>
          </div>
        `;
      }).join('');
    }

    // Phase Exams
    if (el.phaseExamsList) {
      el.phaseExamsList.innerHTML = (curriculum.phaseExams || []).map(pe => {
        const score = appState.assessmentScores['phase_' + pe.phaseId];
        return `
          <div class="assessment-card phase-exam-card">
            <div class="assmt-header">
              <span class="pill exam-pill">Certification Exam · Day ${pe.day}</span>
              ${score 
                ? `<span class="pill ${score.passed ? 'complete-pill' : 'failed-pill'}">Score: ${score.score}/${score.total}</span>`
                : `<span class="pill pending">Not Certified</span>`
              }
            </div>
            <h4>${escapeHtml(pe.title)}</h4>
            <p>Passing Mark: ${pe.passingScore}% · Comprehensive evaluation.</p>
            <button class="btn btn-sm btn-primary" onclick="window.TechJourneyApp.startPhaseExam(${pe.phaseId})">
              ${score ? 'Retake Exam' : 'Launch Certification Exam →'}
            </button>
          </div>
        `;
      }).join('');
    }
  }

  function startWeeklyExam(weekNum) {
    const wa = (curriculum.weeklyAssessments || []).find(w => w.week === weekNum);
    if (!wa) return;
    openExamModal('week_' + weekNum, wa.title, wa.questions, 75);
  }

  function startPhaseExam(phaseId) {
    const pe = (curriculum.phaseExams || []).find(p => p.phaseId === phaseId);
    if (!pe) return;

    // Collect questions from that phase's days
    const phaseDays = curriculum.days.filter(d => d.phaseId === phaseId);
    let allQuestions = [];
    phaseDays.forEach(d => {
      if (d.assessment && d.assessment.mcqs) {
        allQuestions = allQuestions.concat(d.assessment.mcqs);
      }
    });

    // Pick a subset or all
    const sampleQuestions = allQuestions.slice(0, pe.totalQuestions || 20);
    openExamModal('phase_' + phaseId, pe.title, sampleQuestions, pe.passingScore);
  }

  function openExamModal(examId, title, questions, passMark) {
    let answers = {};
    
    function renderExamBody() {
      let qHtml = questions.map((q, idx) => {
        const sel = answers[idx];
        return `
          <div class="mcq-card">
            <p class="mcq-question"><strong>Question ${idx + 1}:</strong> ${escapeHtml(q.question)}</p>
            <div class="mcq-options">
              ${q.options.map((opt, optIdx) => `
                <button type="button" class="mcq-opt ${sel === optIdx ? 'selected' : ''}" 
                        onclick="window.TechJourneyApp.selectExamOption(${idx}, ${optIdx})">
                  <span class="opt-letter">${String.fromCharCode(65 + optIdx)}.</span> ${escapeHtml(opt)}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');

      el.examRunnerBody.innerHTML = `
        <div class="exam-modal-header">
          <h3>${escapeHtml(title)}</h3>
          <p>Total Questions: ${questions.length} · Passing Mark: ${passMark}%</p>
        </div>
        <div class="exam-questions-list">
          ${qHtml}
        </div>
        <div class="exam-actions">
          <button class="btn btn-primary btn-lg" onclick="window.TechJourneyApp.submitExam('${examId}', ${passMark})">
            Submit Assessment
          </button>
        </div>
      `;
    }

    window.TechJourneyApp.selectExamOption = function (qIdx, optIdx) {
      answers[qIdx] = optIdx;
      renderExamBody();
    };

    window.TechJourneyApp.submitExam = function (id, requiredPass) {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correct) correct++;
      });
      const percent = Math.round((correct / questions.length) * 100);
      const passed = percent >= requiredPass;

      appState.assessmentScores[id] = {
        score: correct,
        total: questions.length,
        percent,
        passed,
        date: new Date().toISOString()
      };
      saveState(appState);

      el.examRunnerBody.innerHTML = `
        <div class="exam-result-view ${passed ? 'passed' : 'failed'}">
          <h3>${passed ? '🎉 Assessment Passed!' : '❌ Assessment Failed'}</h3>
          <div class="score-display">${correct} / ${questions.length} (${percent}%)</div>
          <p>${passed 
            ? 'Congratulations! You have satisfied the technical competency standard.' 
            : 'You scored below the required ' + requiredPass + '%. Review your modules and retry.'}
          </p>
          <button class="btn btn-secondary" onclick="window.TechJourneyApp.closeExamModal()">Close</button>
        </div>
      `;
      renderAssessmentsView();
    };

    renderExamBody();
    el.examRunnerModal.classList.add('open');
  }

  function closeExamModal() {
    el.examRunnerModal.classList.remove('open');
  }

  // 10. RESOURCE LIBRARY VIEW
  let currentResourceCategory = 'all';

  function renderResources() {
    if (!el.resourcesContainer) return;

    const list = curriculum.resourceLibrary || [];
    const filtered = currentResourceCategory === 'all'
      ? list
      : list.filter(r => r.category.toLowerCase() === currentResourceCategory.toLowerCase());

    el.resourcesContainer.innerHTML = filtered.map(r => `
      <div class="resource-card-lib">
        <div class="lib-category">${escapeHtml(r.category)} · ${escapeHtml(r.platform)}</div>
        <h3>${escapeHtml(r.title)}</h3>
        <p>${escapeHtml(r.desc)}</p>
        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
          Visit Resource ↗
        </a>
      </div>
    `).join('');
  }

  // 11. INTERVIEW QUESTION BANK
  let currentInterviewCategory = 'all';

  function renderInterviewBank() {
    if (!el.interviewBankContainer) return;

    const list = curriculum.interviewQuestionBank || [];
    const filtered = currentInterviewCategory === 'all'
      ? list
      : list.filter(q => q.category.toLowerCase() === currentInterviewCategory.toLowerCase());

    el.interviewBankContainer.innerHTML = filtered.map((item, idx) => `
      <div class="interview-qa-card">
        <div class="qa-badge">${escapeHtml(item.category)}</div>
        <h4 class="qa-question">Q${idx + 1}: ${escapeHtml(item.question)}</h4>
        <button class="btn btn-sm btn-reveal" onclick="window.TechJourneyApp.toggleSolution('ans-${idx}')">
          Reveal Model Answer
        </button>
        <div id="ans-${idx}" class="solution-container" style="display:none">
          <strong>Model Answer:</strong>
          <p>${escapeHtml(item.answer)}</p>
        </div>
      </div>
    `).join('');
  }

  // 12. PORTFOLIO MANAGER
  function initPortfolio() {
    const p1 = appState.portfolio.p1 || {};
    const p2 = appState.portfolio.p2 || {};

    if (el.p1Github) el.p1Github.value = p1.github || '';
    if (el.p1Demo) el.p1Demo.value = p1.demo || '';
    if (el.p1Notes) el.p1Notes.value = p1.notes || '';

    if (el.p2Github) el.p2Github.value = p2.github || '';
    if (el.p2Demo) el.p2Demo.value = p2.demo || '';
    if (el.p2Brd) el.p2Brd.value = p2.brd || '';
    if (el.p2Notes) el.p2Notes.value = p2.notes || '';

    if (el.p1SaveBtn) {
      el.p1SaveBtn.addEventListener('click', () => {
        appState.portfolio.p1 = {
          github: (el.p1Github ? el.p1Github.value.trim() : ''),
          demo: (el.p1Demo ? el.p1Demo.value.trim() : ''),
          notes: (el.p1Notes ? el.p1Notes.value.trim() : ''),
          completed: true
        };
        saveState(appState);
        alert('Project 1 details saved successfully!');
      });
    }

    if (el.p2SaveBtn) {
      el.p2SaveBtn.addEventListener('click', () => {
        appState.portfolio.p2 = {
          github: (el.p2Github ? el.p2Github.value.trim() : ''),
          demo: (el.p2Demo ? el.p2Demo.value.trim() : ''),
          brd: (el.p2Brd ? el.p2Brd.value.trim() : ''),
          notes: (el.p2Notes ? el.p2Notes.value.trim() : ''),
          completed: true
        };
        saveState(appState);
        alert('Flagship Capstone details saved successfully!');
      });
    }
  }

  // 13. CAREER ASSESSMENT RUBRIC
  function renderCareerRubric() {
    if (!el.careerTableBody) return;
    const rubric = curriculum.careerAssessment || { dimensions: [] };

    el.careerTableBody.innerHTML = rubric.dimensions.map(dim => `
      <tr>
        <td class="dim-name"><strong>${escapeHtml(dim.dimension)}</strong></td>
        <td class="dim-ba">${escapeHtml(dim.ba)}</td>
        <td class="dim-pa">${escapeHtml(dim.pa)}</td>
        <td class="dim-analytics">${escapeHtml(dim.analytics)}</td>
      </tr>
    `).join('');
  }

  function calculateCareerScore() {
    const q1 = parseInt(document.querySelector('input[name="career_q1"]:checked')?.value || '3', 10);
    const q2 = parseInt(document.querySelector('input[name="career_q2"]:checked')?.value || '3', 10);
    const q3 = parseInt(document.querySelector('input[name="career_q3"]:checked')?.value || '3', 10);

    // Track points
    let baPoints = q1 * 2 + 5;
    let paPoints = q2 * 2 + 5;
    let analyticsPoints = q3 * 2 + 5;

    let recommendation = '';
    if (baPoints >= paPoints && baPoints >= analyticsPoints) {
      recommendation = `
        <div class="career-match-badge ba">🎯 Primary Match: Technical Business Analyst</div>
        <p>Your passion for requirements gathering, Gherkin user stories, and agile sprint coordination positions you perfectly for high-impact Technical BA roles in FinTech and Digital Banking.</p>
        <p><strong>Secondary Fit:</strong> Product Analyst (for user feature experimentation).</p>
      `;
    } else if (paPoints >= baPoints && paPoints >= analyticsPoints) {
      recommendation = `
        <div class="career-match-badge pa">🎯 Primary Match: Product Analyst</div>
        <p>Your interest in user funnels, payment failure drop-offs, and cohort retention curves makes you an outstanding fit for high-growth tech companies optimizing customer journeys.</p>
        <p><strong>Secondary Fit:</strong> Technical Business Analyst.</p>
      `;
    } else {
      recommendation = `
        <div class="career-match-badge analytics">🎯 Primary Match: Business Analytics Specialist</div>
        <p>Your enthusiasm for relational SQL modeling, star schema architecture, and Power BI DAX indicates strong potential in dedicated data & analytics centers of excellence.</p>
        <p><strong>Secondary Fit:</strong> Technical Business Analyst.</p>
      `;
    }

    if (el.careerResultBlock) {
      el.careerResultBlock.innerHTML = recommendation;
      el.careerResultBlock.style.display = 'block';
    }
  }

  // 14. SETTINGS, JSON EXPORT & IMPORT, SAFE RESET
  function initSettings() {
    if (el.exportJsonBtn) {
      el.exportJsonBtn.addEventListener('click', () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', 'tech-journey-progress-' + new Date().toISOString().slice(0, 10) + '.json');
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });
    }

    if (el.importJsonBtn && el.importJsonInput) {
      el.importJsonBtn.addEventListener('click', () => {
        el.importJsonInput.click();
      });

      el.importJsonInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (typeof imported.days !== 'object') {
              throw new Error('Invalid JSON schema: missing days object.');
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
            alert('Progress imported successfully! Reloading...');
            window.location.reload();
          } catch (err) {
            alert('Import failed: ' + err.message);
          }
        };
        reader.readAsText(file);
      });
    }

    if (el.resetProgressBtn) {
      el.resetProgressBtn.addEventListener('click', () => {
        const conf = confirm('Are you sure you want to reset your study progress? This will reset your checkboxes and scores while preserving your backup.');
        if (conf) {
          const secondConf = confirm('Please confirm again. All progress will be cleared.');
          if (secondConf) {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }
        }
      });
    }
  }

  // 15. UTILITIES
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resetFilters() {
    currentPhaseFilter = 'all';
    currentStatusFilter = 'all';
    searchQuery = '';
    if (el.searchInput) el.searchInput.value = '';
    if (el.statusSelect) el.statusSelect.value = 'all';
    el.phasePills.forEach(p => {
      if (p.getAttribute('data-phase') === 'all') p.classList.add('active');
      else p.classList.remove('active');
    });
    renderRoadmap();
  }

  // 16. GLOBAL EXPOSURE & EVENT LISTENERS
  window.TechJourneyApp = {
    openDayModal,
    closeModal,
    markDayComplete,
    markDayIncomplete,
    toggleAssignment,
    toggleSolution,
    selectMcqOption,
    retakeQuiz,
    resetFilters,
    startWeeklyExam,
    startPhaseExam,
    closeExamModal,
    switchTab
  };

  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Navigation Tabs
    el.navTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    // Phase Filter Pills
    el.phasePills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.phasePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentPhaseFilter = pill.getAttribute('data-phase');
        renderRoadmap();
      });
    });

    // Status Filter
    if (el.statusSelect) {
      el.statusSelect.addEventListener('change', () => {
        currentStatusFilter = el.statusSelect.value;
        renderRoadmap();
      });
    }

    // Search Input
    if (el.searchInput) {
      el.searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderRoadmap();
      });
    }

    // Modal Close
    if (el.modalCloseBtn) {
      el.modalCloseBtn.addEventListener('click', closeModal);
    }
    if (el.modalOverlay) {
      el.modalOverlay.addEventListener('click', (e) => {
        if (e.target === el.modalOverlay) closeModal();
      });
    }
    if (el.closeExamModalBtn) {
      el.closeExamModalBtn.addEventListener('click', closeExamModal);
    }

    // Resource Category Pills
    el.resourceCatPills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.resourceCatPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentResourceCategory = pill.getAttribute('data-cat');
        renderResources();
      });
    });

    // Interview Category Pills
    el.interviewCatPills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.interviewCatPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentInterviewCategory = pill.getAttribute('data-cat');
        renderInterviewBank();
      });
    });

    // Career Rubric Calculation
    if (el.calcScoreBtn) {
      el.calcScoreBtn.addEventListener('click', calculateCareerScore);
    }

    // Initialize all views
    renderStats();
    renderRoadmap();
    renderCalendar();
    renderAssessmentsView();
    renderResources();
    renderInterviewBank();
    initPortfolio();
    renderCareerRubric();
    initSettings();

    // Check Hash in URL
    if (window.location.hash) {
      const tabFromHash = window.location.hash.replace('#', '');
      if (document.getElementById(tabFromHash)) {
        switchTab(tabFromHash);
      }
    }
  });

})();
