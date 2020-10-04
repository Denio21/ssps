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


const assignmentFiles = fs.readdirSync("data/");

const SolutionGenerator = require("./generators/SolutionGenerator");
const solutionGenerator = new SolutionGenerator();

const AssignmentGenerator = require("./generators/AssignmentGenerator");
const assignmentGenerator = new AssignmentGenerator();

const PDFGenerator = require("./generators/PDFGenerator");
const pdfGenerator = new PDFGenerator();

(async () => {
    for (let assignmentFileName of assignmentFiles) {
        if (!assignmentFileName.includes(".json"))
            continue;

        const data = JSON.parse(fs.readFileSync("data/" + assignmentFileName));

        const targetDir = __dirname + "/../out/" + assignmentFileName.replace(".json", "/");
        if (!fs.existsSync(targetDir))
            fs.mkdirSync(targetDir);

        solutionGenerator.generate(assignmentFileName, data, questions, targetDir);

        assignmentGenerator.generate(assignmentFileName, data, questions, targetDir);

        await pdfGenerator.generate(assignmentFileName, targetDir);
    }
})();