import { readFileSync } from "fs";
const input = readFileSync("./input.txt", "utf-8");
const encryptedData = input.split("\n");

const sumCalibrationValues = encryptedData
  .map((line) => line.replace(/[^0-9]/g, ""))
  .map((data) => data.at(0) + data.at(-1))
  .reduce((total, value) => total + parseInt(value, 10), 0);

console.log(sumCalibrationValues);

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const sumAllCalibrationValues = encryptedData.reduce((total, line) => {
  let firstDigit;
  let lastDigit;

  line.split("").map((c, i) => {
    if (!firstDigit) {
      if (Number.isInteger(Number(c))) {
        firstDigit = Number(c);
      } else {
        const word = numberWords.find((numberWord) =>
          line.startsWith(numberWord, i)
        );
        if (word) {
          firstDigit = numberWords.indexOf(word) + 1;
        }
      }
    }

    if (Number.isInteger(Number(c))) {
      lastDigit = Number(c);
    } else {
      const word = numberWords.find((numberWord) =>
        line.substring(i).startsWith(numberWord)
      );
      if (word) {
        lastDigit = numberWords.indexOf(word) + 1;
      }
    }
  });

  const combinedNumber = `${firstDigit}${lastDigit}`;
  return total + Number(combinedNumber);
}, 0);

console.log(sumAllCalibrationValues);
