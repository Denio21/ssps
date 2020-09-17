const fs = require("fs");

console.log("| Loading question types");
const questions = {};

const questionFiles = fs.readdirSync("src/questions");

for (let questionFileName of questionFiles) {
    if (questionFileName == "Question.js")
        continue;

    const q = require("./questions/" + questionFileName);
    const question = new q();

    questions[question.getName()] = question;

    console.log("\\- | Loaded question type " + question.getName());
}


const testFiles = fs.readdirSync("data/");

const SolutionGenerator = require("./generators/SolutionGenerator");
const solutionGenerator = new SolutionGenerator();

const TestGenerator = require("./generators/TestGenerator");
const testGenerator = new TestGenerator();

for (let testFileName of testFiles) {
    if (!testFileName.includes(".json"))
        continue;

    const data = JSON.parse(fs.readFileSync("data/" + testFileName));

    if (testFileName.includes("test")) {
        //solutionGenerator.generate(testFileName, data);

        testGenerator.generate(testFileName, data, questions);
    }
} 