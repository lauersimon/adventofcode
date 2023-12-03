import { testData } from "./testData.js";

const part2 = true;

const digitWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const sum = testData.reduce((acc, val) => {
  let updatedVal = val;

  if (part2) {
    // Replace all occurrences of one/two --> 1/2
    // do/while required for occurences like 178ncllbfkkh4eightwoq (eightwo)
    do {
      updatedVal = updatedVal.replace(
        /(one|two|three|four|five|six|seven|eight|nine)/g,
        (number) =>
          number.substring(0, 1) + digitWords[number] + number.slice(-1)
      );
    } while (
      updatedVal.search(/(one|two|three|four|five|six|seven|eight|nine)/) >= 1
    );
  }

  const digits = updatedVal.replace(/\D/g, "");
  
  if (digits.split("").length === 1) {
    return acc + parseInt(`${digits}${digits}`);
  }
  
  const x = `${digits.substring(0, 1)}${digits.slice(-1)}`;

  return !!x ? acc + parseInt(x) : acc;
}, 0);

console.log(sum);
