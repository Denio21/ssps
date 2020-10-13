const Question = require("./Question");
const shuffle = require("../helper/Shuffle");

class TextQuestion extends Question {

    getName() {
        return "list";
    }

    getHelp(question, settings) {
        return "zvolte jednu z možností pro každé tvrzení";
    }

    generateSolution(question, settings) {
        let output = "";
        output += "<div class='statements'>";

        for (let statement of question.statements){
        output += "<div class='statement'><div class='valid'>"+statement.valid+"</div> "+statement.label+"</div>";}

        output += "</div>";

        return output;
    
    }

    generateAssignment(question, settings) {
        let output = "";
        let i = 1;

        output += "<div class='answers'><p>";
        for(let choice of question.choices){
            if(i != question.choices.length)
                output += choice+"  •  ";
            else
                output += choice;
            i++;
        }
        output += "</p></div>";

        if (settings.shuffle.includes("options"))
            shuffle(question.statements);

        output += "<div class='statements'>";

        for (let statement of question.statements)
            output += "<div class='statement'><span class='space'></span>"+statement.label+"</div>";

        output += "</div>";
        return output;
    }

}

module.exports = TextQuestion;
