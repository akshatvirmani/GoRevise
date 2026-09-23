// Grades a quiz without mutating the original words array.
// `words` is the full split text, `blankIndexes` are the positions the user was
// quizzed on, and `answers` are the typed answers in the same order as
// blankIndexes once sorted ascending.
export function gradeAnswers(words, blankIndexes, answers) {
  const sortedIndexes = [...blankIndexes].sort((a, b) => a - b);
  const graded = [...words];

  sortedIndexes.forEach((wordIdx, i) => {
    const correctWord = words[wordIdx];
    const answer = answers[i];

    if (correctWord === answer) {
      graded[wordIdx] = { item: answer, result: true };
    } else {
      graded[wordIdx] = {
        id: `${wordIdx}-${Date.now()}`,
        prevVal: correctWord,
        item: answer,
        result: false,
      };
    }
  });

  return graded;
}

export function countCorrect(gradedWords) {
  return gradedWords.filter((word) => word.result === true).length;
}
