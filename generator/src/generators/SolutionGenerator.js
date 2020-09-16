const fs = require("fs");


class SolutionGenerator {
    constructor() {
        this.gradesPercentageLimits = {
            0: 5,
            40: 4,
            55: 3,
            70: 2,
            85: 1,
            100: 1
        }

        this.template = fs.readFileSync("src/templates/solution.html", "utf-8");
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

    calculateGradesPercentages(points) {
        let gradesPercentages = []

        let lastPoints = undefined;
        let lastGrade = 5;

        for (let percentageLimit of Object.keys(this.gradesPercentageLimits)) {
            /*console.log(lastPoints);
            console.log(lastGrade);
            console.log(percentageLimit);
            console.log(((points -1) / 100 * percentageLimit));
            console.log();*/

            if (lastPoints == undefined) {
                lastPoints = Math.floor((points / 100 * (Math.max(0, percentageLimit - 0.01))));
                continue;
            }

            gradesPercentages.push({
                min: lastPoints,
                max: Math.floor((points / 100 * (percentageLimit - 0.01))),
                grade: lastGrade
            })

            lastPoints = Math.floor((points / 100 * (percentageLimit - 0.01))) + 1;
            lastGrade = this.gradesPercentageLimits[percentageLimit]
        }

        gradesPercentages[gradesPercentages.length - 1].max = points;

        return gradesPercentages;
    }

    calculateTotalPoints(questions) {
        let points = 0;

        for (let question of questions)
            if (question.special == undefined)
                points += question.points;

        return points;
    }

    generate(fileName, test) {
        console.log("| Generating solution for " + test.name);

        const targetFile = "out/" + fileName.replace(".json", "-solution.html");

        const questions = this.generateQuestions(test.questions);
        const points = this.calculateTotalPoints(test.questions);
        const gradesPercentages = this.calculateGradesPercentages(points);
        const grades = this.generateGrades(gradesPercentages);

        const templateParameters = {
            "name": test.name + " - ŘEŠENÍ",
            "questions": questions,
            "points": this.spellPoints(points),
            "grades": grades,
        };

        let generatedTemplate = this.template + "";

        for (let key of Object.keys(templateParameters)) {
            generatedTemplate = generatedTemplate.replace("%" + key + "%", templateParameters[key]);
        }

        console.log("\\- | Writing solution to " + targetFile);
        fs.writeFileSync(targetFile, generatedTemplate);
    }

    generateGrades(gradesPercentages) {
        console.log("\\- | Generating solution grades");

        let grades = "<div class='grades'><div class='title'>Známky</div>";

        for (let grade of gradesPercentages) {
            let range = ""

            if (grade.min == grade.max)
                range = this.spellPoints(grade.max);
            else
                range = grade.min + " - " + this.spellPoints(grade.max);


            grades += "<div class='grade'><div class='range'>" + range + "</div> => " + grade.grade + "</div>";
        }

        grades += "</div>"

        return grades;
    }
    generateQuestions(questions) {
        console.log("\\- | Generating solution questions");

        let questionsGenerated = "";

        let count = 1;

        for (let question of questions) {
            questionsGenerated += "<div class='question " + question.type + "'>";

            questionsGenerated += "<div class='label'><span>" + (question.special == true ? "B" : count++) + ".</span>" + question.label + " <small>(" + this.spellPoints(question.points) + ")</small></div>"

            if (question.help)
                questionsGenerated += "<p class='help'>(" + question.help + ")</p>"

            switch (question.type) {
                case "text":
                    questionsGenerated += "<div class='input'>" + question.valid + "</div>"
                    break;
                case "selectone":
                    questionsGenerated += "<p class='help'>(jen jedna odpoveď je správná)</p>"

                    questionsGenerated += "<div class='options'>"
                    for (let option of question.option.filter(o => o.valid))
                        questionsGenerated += "<div class='option valid'>" + option.label + "</div>";

                    questionsGenerated += "</div>"
                    break;
                case "selectmultiple":
                    questionsGenerated += "<p class='help'>(více odpovědí může být správně / žádná nemusí)</p>"

                    questionsGenerated += "<div class='options'>"
                    for (let option of question.option.filter(o => o.valid))
                        questionsGenerated += "<div class='option valid'>" + option.label + "</div>";

                    questionsGenerated += "</div>"
                    break;
                case "choices":
                    questionsGenerated += "<p class='help'>(jedna z možností je správná pro každé tvrzení)</p>"

                    questionsGenerated += "<div class='statements'>"
                    for (let statement of question.statements) {
                        let choices = "";

                        for (let choice of question.choices) {
                            choices += "<div class='choice'>" + (statement.valid == choice ? "<b>" + choice + "</b>" : choice) + "</div>"
                        }

                        questionsGenerated += "<div class='statement'><div class='choices'>" + choices + "</div>" + statement.label + "</div>";
                    }

                    questionsGenerated += "</div>"
                    break;
                case "fill":
                    questionsGenerated += "<div class='sentences'>"


                    for (let sentence of question.sentences) {
                        let i = 0;
                        let text = sentence.sentence;

                        while (text.includes("*"))
                            text = text.replace("*", "<span>" + sentence.fill[i++] + "</span>");

                        questionsGenerated += "<div class='sentence'>" + text + "</div>";
                    }

                    questionsGenerated += "</div>"
                    break;
            }

            questionsGenerated += "</div>";
        }
        return questionsGenerated;
    }
}

module.exports = SolutionGenerator;