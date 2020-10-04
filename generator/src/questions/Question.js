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

    generateTest(question, settings) {
        throw new Error("You have to implement the method generateTest!");
    }

}

module.exports = Question;