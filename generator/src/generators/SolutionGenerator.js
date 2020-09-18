const fs = require("fs");

const replace = require("../helper/Replace");

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

        this.solutionTemplate = fs.readFileSync("src/templates/solution.html", "utf-8");
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

    calculateGradesPercentages(points) {
        let gradesPercentages = []

        let lastPoints = undefined;
        let lastGrade = 5;

        for (let percentageLimit of Object.keys(this.gradesPercentageLimits)) {
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

    calculateTotalPoints(questions, special = false) {
        let points = 0;

        for (let question of questions)
            if (special || question.special == undefined || question.special == false)
                points += parseInt(question.points);

        return points;
    }

    generate(fileName, assignment, questionTypes, targetDir) {
        console.log("| Generating solution for " + assignment.name);

        const targetFile = targetDir + fileName.replace(".json", "-solution.html");

        const questions = this.generateQuestions(assignment.questions, assignment.settings, questionTypes);
        const points = this.calculateTotalPoints(assignment.questions);
        const specialPoints = this.calculateTotalPoints(assignment.questions, true);
        const gradesPercentages = this.calculateGradesPercentages(points);
        const grades = this.generateGrades(gradesPercentages, points);

        const solutionData = {
            name: "Řešení | " + assignment.name,
            questions: questions,
            points: "bodový základ: " + this.spellPoints(points) + " (+ " + this.spellPoints(specialPoints - points) + ")",
            grades: grades,
        };

        console.log("\\- | Writing solution to " + targetFile);
        fs.writeFileSync(targetFile, replace(this.solutionTemplate, solutionData));
    }

    generateGrades(gradesPercentages, points) {
        const maxLength = (points + "").split("").length;

        console.log("\\- | Generating solution grades");

        let grades = "<div class='grades'><div class='title'>Známky</div>";

        for (let grade of gradesPercentages) {
            let range = ""

            grade.min = grade.min + "";
            grade.max = grade.max + "";

            while(grade.min.split("").length < maxLength)
                grade.min = "0" + grade.min;

            while(grade.max.split("").length < maxLength)
                grade.max = "0" + grade.max;

            // It looks weird, i dont want to use it now, keep for future.
            //
            //if (grade.min == grade.max)
            //    range = this.spellPoints(grade.max);
            //else
            range = grade.min + " - " + this.spellPoints(grade.max);


            grades += "<div class='grade'><div class='range'>" + range + "</div> => " + grade.grade + "</div>";
        }

        grades += "</div>"

        return grades;
    }
    
    generateQuestions(questions, settings, questionTypes) {
        console.log("\\- | Generating solution questions");

        let questionCount = 1;
        let output = "";
        
        for (let q of questions) {
            const question = q;
            const type = questionTypes[question.type];

            if (type == undefined)
                console.log("   \\- | Question type " + question.type + " not registered!");

            const data = {
                type: question.type,
                suffix: question.special == true ? "B" : questionCount,
                label: question.label,
                points: `<p>(` + question.points + `)</p>`,
                help: (type != undefined && type.getHelp(question, settings) != undefined ? "<p>(" + type.getHelp(question, settings) + ")</p>" : "") + (question.help ? "<p>(" + question.help + ")</p>" : ""),
                content: type != undefined ? type.generateSolution(question, settings) : ""
            }

            output += replace(this.questionTemplate, data);

            if (!question.special)
                questionCount++;
        }

        return output;
    }
}

module.exports = SolutionGenerator;