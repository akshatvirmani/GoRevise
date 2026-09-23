// encodeURIComponent output is pure ASCII, so it's always safe to hand to btoa.
export function encodeQuiz({ text, blankIndexes }) {
  return btoa(encodeURIComponent(JSON.stringify({ text, blankIndexes })));
}

export function decodeQuiz(encoded) {
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

export function buildShareUrl(quiz) {
  return `${window.location.origin}/test?share=${encodeURIComponent(encodeQuiz(quiz))}`;
}
