// Takes in a word (string) and returns an array of characters (string[]) sorte in alphabetical order

export const wordToSortedLetters = (word: string): string[] => {
  // convert the word to lowercase and then spilt it into its characters
  const letterArray: string[] = word.toLowerCase().split("");

  // sort the letters alphabetical order
  const orderedLetters: string[] = letterArray.sort();

  return orderedLetters;
};
