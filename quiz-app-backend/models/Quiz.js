const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    topic: { type: String, required: true }, // e.g., "Maths", "Science"
    questions: [
        {
            questionText: { type: String, required: true },
            options: { type: [String], required: true }, // Array of 4 options
            correctAnswer: { type: String, required: true } // The correct option
        }
    ]
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;