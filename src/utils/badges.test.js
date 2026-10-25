import { getBadges } from "./badges";

describe("getBadges", () => {
  test("all badges are locked with zeroed stats", () => {
    const badges = getBadges({
      totalQuizzes: 0,
      totalAttempts: 0,
      bestScorePct: 0,
      averageScorePct: 0,
      perfectScores: 0,
    });

    expect(badges.every((b) => b.unlocked === false)).toBe(true);
  });

  test("unlocks badges as thresholds are met", () => {
    const badges = getBadges({
      totalQuizzes: 5,
      totalAttempts: 10,
      bestScorePct: 100,
      averageScorePct: 85,
      perfectScores: 3,
    });

    const byId = Object.fromEntries(badges.map((b) => [b.id, b.unlocked]));
    expect(byId["first-quiz"]).toBe(true);
    expect(byId["quiz-maker"]).toBe(true);
    expect(byId["bullseye"]).toBe(true);
    expect(byId["on-fire"]).toBe(true);
    expect(byId["perfectionist"]).toBe(true);
    expect(byId["superstar"]).toBe(true);
  });

  test("superstar requires at least 3 attempts, not just a high average", () => {
    const badges = getBadges({
      totalQuizzes: 1,
      totalAttempts: 1,
      bestScorePct: 100,
      averageScorePct: 100,
      perfectScores: 1,
    });

    const superstar = badges.find((b) => b.id === "superstar");
    expect(superstar.unlocked).toBe(false);
  });
});
