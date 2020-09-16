const fs = require("fs");

//const template = fs.readFileSync("template.html", "utf-8");
const files = fs.readdirSync("data/");

const SolutionGenerator = require("./generators/SolutionGenerator");
const solutionGenerator = new SolutionGenerator();
const TestGenerator = require("./generators/TestGenerator");
const testGenerator = new TestGenerator();

for (let fileName of files) {
    if(!fileName.includes(".json"))
        continue;

    const data = JSON.parse(fs.readFileSync("data/" + fileName));

    if(fileName.includes("test")) {
        solutionGenerator.generate(fileName, data);
        testGenerator.generate(fileName, data);
    }

    // TODO: idk if needed
    if(fileName.includes("homework")) {

    }

    /*
    if(data.shuffle.includes("questions"))
        shuffleArray(data.questions);*/
} 