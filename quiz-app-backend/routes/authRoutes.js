const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const JWT_SECRET=require("../server");
const History=require('../models/History');

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username or password" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update user quiz history or create new user if not found
router.post('/update', async (req, res) => {
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


router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const history = await History.findOne({ username });

        if (!history) {
            return res.status(404).json({ message: "No history found for this user." });
        }

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error });
    }
});




module.exports = router;
