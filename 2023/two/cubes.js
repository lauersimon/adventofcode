import { testData } from "./testData.js";

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const allColors = ["red", "green", "blue"];

const getColors = (val) => {
  const colors = allColors.reduce(
    (acc, color) => {
      const regexp = new RegExp(`\\d+(?: ${color})`, "g");

      acc[color] = val
        .match(regexp)
        .map((match) => match.replace(/\D/g, "").trim());

      return acc;
    },
    { red: [], green: [], blue: [] }
  );

  return colors;
};

const isAbove = (color, cubesByColor) =>
  cubesByColor.some((cubes) => cubes > maxCubes[color]);

const partOne = testData.reduce((acc, val, index) => {
  const colors = getColors(val);

  if (
    isAbove("red", colors.red) ||
    isAbove("blue", colors.blue) ||
    isAbove("green", colors.green)
  ) {
    return acc;
  }

  return acc + index + 1;
}, 0);

console.log(partOne);

const getMaxForColor = (colorSet) => Math.max(...colorSet);

const getMaxForColors = (colors) => ({
  maxRed: getMaxForColor(colors.red),
  maxGreen: getMaxForColor(colors.green),
  maxBlue: getMaxForColor(colors.blue),
});

const partTwo = testData.reduce((acc, val) => {
  const colors = getColors(val);

  const { maxRed, maxGreen, maxBlue } = getMaxForColors(colors);

  const poweredMax = maxRed * maxGreen * maxBlue;

  return acc + poweredMax;
}, 0);

console.log(partTwo);
