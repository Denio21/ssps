const Question = require("./Question");
const shuffle = require("../helper/Shuffle");

class FillQuestion extends Question {

    getName() {
        return "fill";
    }

    getHelp(question, settings) {
        return undefined;
    }

    generateSolution(question, settings) {
        let output = "";

        output += "<div class='sentences'>"

        for (let sentence of question.sentences) {
            let i = 0;
            let text = sentence.sentence;

            while (text.includes("*"))
                text = text.replace("*", "<span>" + sentence.fill[i++] + "</span>");

                output += "<div class='sentence'>" + text + "</div>";
        }

        output += "</div>"

        return output;
    }

    generateTest(question, settings) {
        let output = "";

        if (settings.shuffle.includes("options"))
            shuffle(question.sentences);

        output += "<div class='sentences'>"

        for (let sentence of question.sentences)
            output += "<div class='sentence'>" + sentence.sentence.replace(/\*/g, "<span class='space'></span>") + "</div>";

        output += "</div>"

        return output;
    }

}

module.exports = FillQuestion;