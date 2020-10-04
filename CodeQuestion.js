const Question = require("./Question");

class TextQuestion extends Question {

    getName() {
        return "code";
    }

    getHelp(question, settings) {
        return "oprav část kódu, která je chybná"
    }

    generateSolution(question, settings) {
        let output = "";

        output += "<div class='code-container'>";
        output += "<div class='code'>" + question.valid.map(line => "<code>" + line.replace(/</gim, "&lt;").replace(/>/gim, "&gt;") + "</code>").join('\n') + "</div>";
        output += "</div>";

        return output;
    }

    generateAssigment(question, settings) {
        let output = "";

        output += "<div class='code-container'>";
        output += "<div class='code'>" + question.wrong.map(line => "<code>" + line.replace(/</gim, "&lt;").replace(/>/gim, "&gt;") + "</code>").join('\n') + "</div>";
        output += "<div class='code'>" + question.base.map(line => "<code>" + line.replace(/</gim, "&lt;").replace(/>/gim, "&gt;") + "</code>").join('\n') + "</div>";
        output += "</div>";

        return output;
    }

}

module.exports = TextQuestion;
