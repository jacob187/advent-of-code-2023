import { readFileSync } from "fs";

const input = readFileSync("example2.txt", "utf-8").trim().split("\n");

const maxColorBlocks = {
  red: 12,
  green: 13,
  blue: 14,
};
const solutionOne = (lines) => {
  return lines
    .map((game) => game.split(":")[1].split(";"))
    .map((game) => {
      return game
        .map((draw) => {
          return draw
            .split(",")
            .map((pick) => pick.trim())
            .map((pick) => {
              const [number, color] = pick.split(" ");
              return maxColorBlocks[color] >= Number(number);
            })
            .every((val) => val);
        })
        .every((val) => val);
    })
    .reduce((acc, val, i) => (val === true ? acc + val + i : acc));
};

console.log(solutionOne(input));

const solutionTwo = (lines) => {
  return lines
    .map((game) => {
      let maxBlocks = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const draws = game.split(":")[1].split(";");
      draws.forEach((draw) => {
        draw.split(",").forEach((pick) => {
          const [number, color] = pick.trim().split(" ");
          const blockNumber = Number(number);
          if (maxBlocks[color] < blockNumber) {
            maxBlocks[color] = blockNumber;
          }
        });
      });
      // Return the maxBlocks object for each game
      return { maxBlocks };
    })
    .map((game) => {
      return Object.values(game.maxBlocks).reduce((acc, val) => acc * val);
    })
    .reduce((acc, val) => acc + val);
};

console.log(solutionTwo(input));
