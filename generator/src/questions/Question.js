class Question {

    getName() {
        throw new Error("You have to implement the method getName!");
    }

    getHelp(question, settings) {
        throw new Error("You have to implement the method getHelp!");
    }

    generateSolution(question, settings) {
        throw new Error("You have to implement the method generateSolution!");
    }

    generateAssignment(question, settings) {
        throw new Error("You have to implement the method generateAssignment!");
    }

}

module.exports = Question;