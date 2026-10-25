export const BADGES = [
  {
    id: "first-quiz",
    emoji: "🚀",
    label: "First Quiz",
    description: "Create your first quiz",
    isUnlocked: (stats) => stats.totalQuizzes >= 1,
  },
  {
    id: "quiz-maker",
    emoji: "✏️",
    label: "Quiz Maker",
    description: "Create 5 quizzes",
    isUnlocked: (stats) => stats.totalQuizzes >= 5,
  },
  {
    id: "bullseye",
    emoji: "🎯",
    label: "Bullseye",
    description: "Score 100% on a quiz",
    isUnlocked: (stats) => stats.perfectScores >= 1,
  },
  {
    id: "on-fire",
    emoji: "🔥",
    label: "On Fire",
    description: "Take 10 quiz attempts",
    isUnlocked: (stats) => stats.totalAttempts >= 10,
  },
  {
    id: "perfectionist",
    emoji: "🏆",
    label: "Perfectionist",
    description: "Score 100% three times",
    isUnlocked: (stats) => stats.perfectScores >= 3,
  },
  {
    id: "superstar",
    emoji: "🌟",
    label: "Superstar",
    description: "Average 80%+ over 3+ attempts",
    isUnlocked: (stats) => stats.totalAttempts >= 3 && stats.averageScorePct >= 80,
  },
];

export function getBadges(stats) {
  return BADGES.map((badge) => ({ ...badge, unlocked: badge.isUnlocked(stats) }));
}
