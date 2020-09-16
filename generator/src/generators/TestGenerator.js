const fs = require("fs");


class TestGenerator {
    constructor() {
        this.testsTemplate = fs.readFileSync("src/templates/tests.html", "utf-8");
        this.testTemplate = fs.readFileSync("src/templates/test.html", "utf-8");
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

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    calculateTotalPoints(questions) {
        let points = 0;

        for (let question of questions)
            if (question.special == undefined)
                points += question.points;

        return points;
    }

    generate(fileName, test) {
        console.log("| Generating test for " + test.name);

        if (!test.variants)
            test.variants = 1;

        const targetFile = "out/" + fileName.replace(".json", ".html");
        const points = this.calculateTotalPoints(test.questions);
        const info = this.generateInfo(test.required);

        let generatedTestsTemplate = this.testsTemplate + "";
        let testsContent = "";

        for (let i = 0; i < test.variants; i++) {
            console.log("\\- | Variant " + (i + 1));

            const questions = this.generateQuestions(test.questions, test.shuffle);

            const templateParameters = {
                "name": test.name,
                "questions": questions,
                "points": this.spellPoints(points),
                "info": info
            };

            let generatedTemplate = this.testTemplate + "";

            for (let key of Object.keys(templateParameters)) {
                generatedTemplate = generatedTemplate.replace("%" + key + "%", templateParameters[key]);
            }

            testsContent += generatedTemplate;
        }

        generatedTestsTemplate = generatedTestsTemplate.replace("%tests%", testsContent);

        console.log("\\- | Writing test to " + targetFile);
        fs.writeFileSync(targetFile, generatedTestsTemplate);
    }

    generateInfo(required) {
        console.log("\\- | Generating test required info");

        let info = "";

        if (required.includes("name"))
            info += `<div class="name"><p>Jméno a příjmení</p><div class="input"></div></div>`;
        if (required.includes("class"))
            info += `<div class="class"><p>Třída</p><div class="input"></div></div>`;
        if (required.includes("date"))
            info += `<div class="date"><p>Datum</p><div class="input"></div></div>`;
        if (required.includes("points"))
            info += `<div class="points"><p>Hodnocení</p><div class="input"></div></div>`;
        return info;
    }

    generateQuestions(questions, shuffle) {
        console.log("\\- | Generating test questions");

        let questionsGenerated = "";

        let count = 1;

        let realQuestions = questions

        if(shuffle.includes("questions")) {
            let specialQuestions = questions.filter(q => q.special);
            realQuestions = questions.filter(q => !q.special);
            
            this.shuffleArray(realQuestions);

            realQuestions = realQuestions.concat(specialQuestions);
        }

        console.log(realQuestions);

        for (let question of realQuestions) {
            questionsGenerated += "<div class='question " + question.type + "'>";

            questionsGenerated += "<div class='label'><span>" + (question.special == true ? "B" : count++) + ".</span>" + question.label + " <small>(___ / " + this.spellPoints(question.points) + ")</small></div>"

            if (question.help)
                questionsGenerated += "<p class='help'>(" + question.help + ")</p>"

            switch (question.type) {
                case "text":
                    let lines = 1;

                    if (question.multiline != undefined)
                        lines = question.multiline;

                    for (let i = 0; i < lines; i++)
                        questionsGenerated += "<div class='input'></div>"
                    break;
                case "selectone":
                    questionsGenerated += "<p class='help'>(označte jednu správnou odpověď)</p>"

                    if (shuffle.includes("options"))
                        this.shuffleArray(question.option);

                    questionsGenerated += "<div class='options'>"

                    for (let option of question.option)
                        questionsGenerated += "<div class='option'>" + option.label + "</div>";

                    questionsGenerated += "</div>"
                    break;
                case "selectmultiple":
                    questionsGenerated += "<p class='help'>(označte správné odpověďi, všechny odpovědi mohou být správné i nesprávné)</p>"

                    if (shuffle.includes("options"))
                        this.shuffleArray(question.option);

                    questionsGenerated += "<div class='options'>"

                    for (let option of question.option)
                        questionsGenerated += "<div class='option'>" + option.label + "</div>";

                    questionsGenerated += "</div>"
                    break;
                case "choices":
                    let choices = "";

                    if (shuffle.includes("options"))
                        this.shuffleArray(question.statements);

                    for (let choice of question.choices)
                        choices += "<div class='choice'>" + choice + "</div>"

                    questionsGenerated += "<p class='help'>(zvolte jednu z možností pro každé tvrzení)</p>"

                    questionsGenerated += "<div class='statements'>"

                    for (let statement of question.statements)
                        questionsGenerated += "<div class='statement'><div class='choices'>" + choices + "</div>" + statement.label + "</div>";

                    questionsGenerated += "</div>"
                    break;
                case "fill":
                    if (shuffle.includes("options"))
                        this.shuffleArray(question.sentences);

                    questionsGenerated += "<div class='sentences'>"

                    for (let sentence of question.sentences)
                        questionsGenerated += "<div class='sentence'>" + sentence.sentence.replace(/\*/g, "<span>_____________________</span>") + "</div>";

                    questionsGenerated += "</div>"
                    break;
            }

            questionsGenerated += "</div>";
        }
        return questionsGenerated;
    }
}

module.exports = TestGenerator;