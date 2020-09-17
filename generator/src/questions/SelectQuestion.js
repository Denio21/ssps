const Question = require("./Question");
const shuffle = require("../helper/Shuffle");

class SelectQuestion extends Question {

    getName() {
        return "select";
    }

    getHelp(question, settings) {
        return question.options.filter(o => o.valid).length > 1 ? "označte správné odpověďi, všechny odpovědi mohou být správné i nesprávné" : "označte jednu správnou odpověď";
    }

    generateSolution(question, settings) {
        let output = "";

        output += "<div class='options'>"

        for (let option of question.options.filter(o => o.valid))
            output += "<div class='option valid'>" + option.label + "</div>";

        output += "</div>"

        return output;
    }

    generateTest(question, settings) {
        let output = "";

        if (settings.shuffle.includes("options"))
            shuffle(question.options);

        output += "<div class='options'>"

        for (let option of question.options)
            output += "<div class='option'>" + option.label + "</div>";

        output += "</div>"

        return output;
    }

}

module.exports = SelectQuestion;