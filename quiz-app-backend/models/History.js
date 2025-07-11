const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    noOfQuizzesPlayed: { type: Number, default: 0 },
    noOfRightAnswers: { type: Number, default: 0 },
    quizzes: [
        {
            quizName: String,
            score: Number
        }
    ]
});

module.exports = mongoose.model('History', historySchema);
