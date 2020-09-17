const fs = require("fs");

const replace = require("../helper/Replace");
const shuffle = require("../helper/Shuffle");

class TestGenerator {
    constructor() {
        this.testsTemplate = fs.readFileSync("src/templates/tests.html", "utf-8");
        this.testTemplate = fs.readFileSync("src/templates/test.html", "utf-8");
        this.questionTemplate = fs.readFileSync("src/templates/question.html", "utf-8");
    }

    spellPoints(point) {
        if (point == 0)
            return "0 bodů";

        if (point == 1)
            return "1 bod";

        if (point >= 2 && point <= 4)
            return point + " body";

        return point + " bodů";
    }

    calculateTotalPoints(questions) {
        let points = 0;

        for (let question of questions)
            if (question.special == undefined)
                points += question.points;

        return points;
    }

    generate(fileName, test, questionTypes) {
        console.log("| Generating test for " + test.name);

        const variants = test.settings.variants != undefined ? test.settings.variants : 1;

        if (variants <= 0)
            console.log("\\- | Number of variants is below or zero. Cant generate anything.");

        const targetFile = "out/" + fileName.replace(".json", ".html");
        const points = this.calculateTotalPoints(test.questions);
        const info = this.generateInfo(test.settings.informations, points);

        let testsContent = "";

        for (let i = 0; i < variants; i++) {
            console.log("\\- | Variant " + (i + 1));

            const questions = this.generateQuestions(test.questions, test.settings, questionTypes);

            const testData = {
                name: test.name,
                questions: questions,
                points: this.spellPoints(points),
                info: info
            };

            testsContent += replace(this.testTemplate, testData);
        }

        const testsData = {
            name: test.name,
            tests: testsContent
        }

        console.log("\\- | Writing test to " + targetFile);
        fs.writeFileSync(targetFile, replace(this.testsTemplate, testsData));
    }

    generateInfo(required, points) {
        console.log("\\- | Generating test required info");

        let info = "";

        if (required.includes("name"))
            info += `<div class="name"><p>Jméno a příjmení</p><div class="input"></div></div>`;
        
            if (required.includes("class"))
            info += `<div class="class"><p>Třída</p><div class="input"></div></div>`;
            
        if (required.includes("date"))
            info += `<div class="date"><p>Datum</p><div class="input"></div></div>`;
        
        if (required.includes("grade"))
            info += `<div class="grade"><p>Hodnocení</p><div class="input"><span class="space"></span> / ` + points + `</div></div>`;
        return info;
    }

    generateQuestions(testQuestions, settings, questionTypes) {
        console.log("\\- | Generating test questions");

        let questionCount = 1;
        let output = "";

        let questions = testQuestions;

        if(settings.shuffle.includes("questions")) {
            let specialQuestions = questions.filter(q => q.special);
            questions = questions.filter(q => !q.special);
            
            shuffle(questions);

            questions = questions.concat(specialQuestions);
        }
        
        for (let q of questions) {
            const question = q;
            const type = questionTypes[question.type];

            if (type == undefined)
                console.log("   \\- | Question type " + question.type + " not registered!");

            const data = {
                type: question.type,
                suffix: question.special == true ? "B" : questionCount,
                label: question.label,
                points: question.points,
                help: (type != undefined && type.getHelp(question, settings) != undefined ? "<p>(" + type.getHelp(question, settings) + ")</p>" : "") + (question.help ? "<p>(" + question.help + ")</p>" : ""),
                content: type != undefined ? type.generateTest(question, settings) : ""
            }

            output += replace(this.questionTemplate, data);

            if (!question.special)
                questionCount++;
        }

        return output;
    }
}

module.exports = TestGenerator;