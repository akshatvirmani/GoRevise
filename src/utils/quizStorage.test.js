import {
  getSavedQuizzes,
  saveQuiz,
  deleteQuiz,
  updateQuiz,
  recordAttempt,
  getQuizStats,
} from "./quizStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("quizStorage", () => {
  test("returns an empty list when nothing is saved", () => {
    expect(getSavedQuizzes()).toEqual([]);
  });

  test("saveQuiz persists a quiz and returns it with an id", () => {
    const saved = saveQuiz({ text: "the quick brown fox", blankIndexes: [1, 3] });

    expect(saved.id).toBeDefined();
    expect(saved.text).toBe("the quick brown fox");
    expect(saved.blankIndexes).toEqual([1, 3]);
    expect(getSavedQuizzes()).toHaveLength(1);
  });

  test("newest saved quiz appears first", () => {
    saveQuiz({ text: "first quiz", blankIndexes: [0] });
    saveQuiz({ text: "second quiz", blankIndexes: [0] });

    const quizzes = getSavedQuizzes();
    expect(quizzes[0].text).toBe("second quiz");
    expect(quizzes[1].text).toBe("first quiz");
  });

  test("deleteQuiz removes only the targeted quiz", () => {
    const first = saveQuiz({ text: "first quiz", blankIndexes: [0] });
    const second = saveQuiz({ text: "second quiz", blankIndexes: [0] });

    deleteQuiz(first.id);

    const remaining = getSavedQuizzes();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(second.id);
  });

  test("updateQuiz overwrites text and blanks without changing the id", () => {
    const quiz = saveQuiz({ text: "first draft", blankIndexes: [0] });

    updateQuiz(quiz.id, { text: "revised draft", blankIndexes: [0, 1] });

    const [updated] = getSavedQuizzes();
    expect(updated.id).toBe(quiz.id);
    expect(updated.text).toBe("revised draft");
    expect(updated.blankIndexes).toEqual([0, 1]);
  });

  test("recordAttempt appends attempts to the right quiz only", () => {
    const quiz = saveQuiz({ text: "a quiz", blankIndexes: [0, 1] });
    const other = saveQuiz({ text: "another quiz", blankIndexes: [0] });

    recordAttempt(quiz.id, { correct: 1, total: 2 });
    recordAttempt(quiz.id, { correct: 2, total: 2 });

    const quizzes = getSavedQuizzes();
    const updatedQuiz = quizzes.find((q) => q.id === quiz.id);
    const updatedOther = quizzes.find((q) => q.id === other.id);

    expect(updatedQuiz.attempts).toHaveLength(2);
    expect(updatedOther.attempts).toBeUndefined();
  });

  test("getQuizStats returns null when there are no attempts", () => {
    const quiz = saveQuiz({ text: "a quiz", blankIndexes: [0] });
    expect(getQuizStats(quiz)).toBeNull();
  });

  test("getQuizStats reports attempt count and best score", () => {
    const quiz = saveQuiz({ text: "a quiz", blankIndexes: [0, 1] });
    recordAttempt(quiz.id, { correct: 1, total: 2 });
    recordAttempt(quiz.id, { correct: 2, total: 2 });

    const [updated] = getSavedQuizzes();
    const stats = getQuizStats(updated);

    expect(stats.attemptCount).toBe(2);
    expect(stats.bestScorePct).toBe(100);
  });
});
