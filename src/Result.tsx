import { Text } from "grommet";

const selectionMap = {
  top: 0,
  mid: 1,
  bot: 2,
  skip: 11111, // this index won't exist in expected
};

export const Result = ({ expected, current, selection }) => {
  if (!current || !expected || !selection) {
    return null;
  }

  const isExcludedFromExpected = !expected.some((e) => e.name === current.name);

  if (isExcludedFromExpected && selection === "skip") {
    return <Text>Correct</Text>;
  }

  const index = selectionMap[selection];
  const isCorrect = expected[index]?.name === current.name;

  if (isCorrect) {
    return <Text>Correct</Text>;
  }

  return <Text>Incorrect</Text>;
};
