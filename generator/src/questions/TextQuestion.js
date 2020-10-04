const Question = require("./Question");

class TextQuestion extends Question {

    getName() {
        return "text";
    }

    getHelp(question, settings) {
        return undefined;
    }

    generateSolution(question, settings) {
        return "<div class='input'>" + question.valid + "</div>";
    }

    generateTest(question, settings) {
        let output = "";

        const lines = question.lines != undefined ? question.lines : 1;
        
        for(let i = 0; i < lines; i++)
            output += "<div class='input'></div>"

        return output;
    }

}

module.exports = TextQuestion;