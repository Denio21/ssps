const Question = require("./Question");

class TextQuestion extends Question {

    getName() {
        return "box";
    }

    getHelp(question, settings) {
        return undefined;
    }

    generateSolution(question, settings) {
        return "<div class='box'>" + question.valid + "</div>";
    }

    generateAssignment(question, settings) {
        let output = "";
        output = "<div class='box'></div>"

        return output;
    }

}

module.exports = TextQuestion;