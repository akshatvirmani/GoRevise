import { gradeAnswers, countCorrect } from "./gradeQuiz";

describe("gradeAnswers", () => {
  const words = "the quick brown fox jumps".split(" ");

  test("marks correct answers and leaves other words untouched", () => {
    const graded = gradeAnswers(words, [1, 3], ["quick", "fox"]);

    expect(graded[1]).toEqual({ item: "quick", result: true });
    expect(graded[3]).toEqual({ item: "fox", result: true });
    expect(graded[0]).toBe("the");
    expect(graded[2]).toBe("brown");
  });

  test("marks wrong answers with the original word as prevVal", () => {
    const graded = gradeAnswers(words, [1], ["slow"]);

    expect(graded[1]).toMatchObject({
      prevVal: "quick",
      item: "slow",
      result: false,
    });
  });

  test("does not mutate the original words array", () => {
    const original = [...words];
    gradeAnswers(words, [0], ["THE"]);

    expect(words).toEqual(original);
  });

  test("aligns answers with blank indexes sorted ascending, regardless of input order", () => {
    // blankIndexes [3, 1] sorts to [1, 3], so answers must be given in that order.
    const graded = gradeAnswers(words, [3, 1], ["quick", "fox"]);

    expect(graded[1]).toEqual({ item: "quick", result: true });
    expect(graded[3]).toEqual({ item: "fox", result: true });
  });
});

describe("countCorrect", () => {
  test("counts only graded entries marked correct", () => {
    const graded = [
      "the",
      { item: "quick", result: true },
      { item: "slow", prevVal: "brown", result: false },
    ];

    expect(countCorrect(graded)).toBe(1);
  });
});
