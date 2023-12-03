import { testData } from "./testData.js";

const example = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

const symbols = ["*", "#", "+", "$", "@", "%", "/", "-", "&", "="];

const getSymbolPositions = (strings) => {
  return strings.reduce((acc, string, index) => {
    acc[index] = string
      .split("")
      .reduce(
        (acc, char, charPosition) =>
          symbols.includes(char) ? [...acc, charPosition] : acc,
        []
      );

    return acc;
  }, []);
};

const getNumbersAndPositions = (strings) => {
  return strings.reduce((acc, string) => {
    const matches = Array.from(string.matchAll(/\d+/g), (m) => {
      const [number, index] = Object.values(m);

      return { number, index };
    });

    return [...acc, matches];
  }, []);
};

const sumWhenTouching = (lineNr, numberAndPosition, symbolPositions) => {
  const relevantSymbolPositions = [
    !!symbolPositions[lineNr - 1] ? symbolPositions[lineNr - 1] : [],
    symbolPositions[lineNr],
    !!symbolPositions[lineNr + 1] ? symbolPositions[lineNr + 1] : [],
  ];

  const sum = numberAndPosition.reduce((acc, numberAndPosition) => {
    const { number, index } = numberAndPosition;
    const allowedPositions = [index, index - 1];
    for (let i = 0; i < number.length; i++) {
      allowedPositions.push(index + i + 1);
    }

    const touches = allowedPositions.some((position) =>
      relevantSymbolPositions.some((symbolPositionLine) =>
        symbolPositionLine.some(
          (actualSymbolPosition) => actualSymbolPosition === position
        )
      )
    );

    return touches ? acc + parseInt(number) : acc;
  }, 0);

  return sum;
};

const partOne = (input) => {
  const symbolPositions = getSymbolPositions(input);
  const numbersAndPositions = getNumbersAndPositions(input);

  const sumOfTouching = numbersAndPositions.reduce(
    (acc, numberAndPosition, index) => {
      acc += sumWhenTouching(index, numberAndPosition, symbolPositions);

      return acc;
    },
    0
  );

  return sumOfTouching;
};

console.log(partOne(testData));
