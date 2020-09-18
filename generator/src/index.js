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

const PDFGenerator = require("./generators/PDFGenerator");
const pdfGenerator = new PDFGenerator();

(async () => {
    for (let testFileName of testFiles) {
        if (!testFileName.includes(".json"))
            continue;
    
        const data = JSON.parse(fs.readFileSync("data/" + testFileName));
    
        const targetDir = __dirname + "/../out/" + testFileName.replace(".json", "/");
        if(!fs.existsSync(targetDir))
            fs.mkdirSync(targetDir);
    
        if (testFileName.includes("test")) {
            solutionGenerator.generate(testFileName, data, questions, targetDir);
    
            testGenerator.generate(testFileName, data, questions, targetDir);
    
            await pdfGenerator.generate(testFileName, targetDir);
        }
    } 
})();