const express = require('express');
const History = require('../models/History');

const historyrouter = express.Router();

// Update user quiz history or create new user if not found
historyrouter.post('/update', async (req, res) => {
    try {
        const { username, quizName, score } = req.body; // Get data from frontend

        let userHistory = await History.findOne({ username });

        if (!userHistory) {
            // If user not found, create new history entry
            userHistory = new History({
                username,
                noOfQuizzesPlayed: 1,
                noOfRightAnswers: score,
                quizzes: [{ quizName, score }]
            });
        } else {
            // Update existing history
            userHistory.noOfQuizzesPlayed += 1;
            userHistory.noOfRightAnswers += score;
            userHistory.quizzes.push({ quizName, score });
        }

        await userHistory.save(); // Save to MongoDB
        res.json({ message: "History updated successfully", history: userHistory });
    } catch (error) {
        res.status(500).json({ message: "Error updating history", error });
    }
});


historyrouter.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const history = await History.findOne({ username });

        if (!history) {
            return res.status(404).json({ message: "No history found for this user." });
        }

        console.log(username);

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error });
    }
});

module.exports = historyrouter;