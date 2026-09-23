const STORAGE_KEY = "gorevise_quizzes";

export function getSavedQuizzes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuiz({ text, blankIndexes }) {
  const quiz = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    blankIndexes,
    createdAt: new Date().toISOString(),
  };
  const quizzes = [quiz, ...getSavedQuizzes()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  return quiz;
}

export function deleteQuiz(id) {
  const quizzes = getSavedQuizzes().filter((quiz) => quiz.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

export function updateQuiz(id, { text, blankIndexes }) {
  const quizzes = getSavedQuizzes().map((quiz) =>
    quiz.id === id ? { ...quiz, text, blankIndexes } : quiz
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

export function recordAttempt(id, { correct, total }) {
  const quizzes = getSavedQuizzes().map((quiz) => {
    if (quiz.id !== id) return quiz;
    const attempts = [
      ...(quiz.attempts || []),
      { correct, total, takenAt: new Date().toISOString() },
    ];
    return { ...quiz, attempts };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

export function getQuizStats(quiz) {
  const attempts = quiz.attempts || [];
  if (attempts.length === 0) return null;

  const bestPct = attempts.reduce((best, attempt) => {
    const pct = attempt.total ? Math.round((attempt.correct / attempt.total) * 100) : 0;
    return Math.max(best, pct);
  }, 0);

  return {
    attemptCount: attempts.length,
    bestScorePct: bestPct,
    lastAttemptAt: attempts[attempts.length - 1].takenAt,
  };
}
