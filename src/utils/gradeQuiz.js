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
