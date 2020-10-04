const Question = require("./Question");
const shuffle = require("../helper/Shuffle");

class ChoicesQuestion extends Question {

    getName() {
        return "choices";
    }

    getHelp(question, settings) {
        return "zvolte jednu z možností pro každé tvrzení";
    }

    generateSolution(question, settings) {
        let output = "";

        output += "<div class='statements'>"
        for (let statement of question.statements) {
            let choices = "";

            for (let choice of question.choices) {
                choices += "<div class='choice'>" + (statement.valid == choice ? "<b>" + choice + "</b>" : choice) + "</div>"
            }

            output += "<div class='statement'><div class='choices'>" + choices + "</div>" + statement.label + "</div>";
        }

        output += "</div>"

        return output;
    }

    generateTest(question, settings) {
        let output = "";

        if (settings.shuffle.includes("options"))
            shuffle(question.statements);

        let choices = "";

        for (let choice of question.choices)
            choices += "<div class='choice'>" + choice + "</div>"

        output += "<div class='statements'>"

        for (let statement of question.statements)
            output += "<div class='statement'><div class='choices'>" + choices + "</div>" + statement.label + "</div>";

        output += "</div>"

        return output;
    }

}

module.exports = ChoicesQuestion;