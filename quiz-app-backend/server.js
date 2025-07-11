require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Quiz = require("./models/Quiz");
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enable CORS for frontend-backend communication

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("❌ Database connection error:", err));

// Simple Route
app.get('/', (req, res) => {
    res.send("Welcome to the QuizPlay Backend!");
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes" });
    }
});

const historyRoutes = require('./routes/historyRoutes');
app.use('/api/history', historyRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

