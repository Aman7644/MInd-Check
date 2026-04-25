const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Fake database (memory)
let checkins = [];
let assessments = [];

// Home route (test)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Check-in API
app.post("/checkin", (req, res) => {
  const { mood, note } = req.body;

  if (!mood) {
    return res.status(400).json({ error: "Mood is required" });
  }

  const data = {
    mood,
    note,
    date: new Date()
  };

  checkins.push(data);

  res.json({
    message: "Check-in saved",
    data
  });
});

// Assessment API
app.post("/assessment", (req, res) => {
  const { answers } = req.body;

  if (!answers || answers.length === 0) {
    return res.status(400).json({ error: "Answers required" });
  }

  const score = answers.reduce((sum, val) => sum + Number(val), 0);

  const data = {
    answers,
    score,
    date: new Date()
  };

  assessments.push(data);

  res.json({
    message: "Assessment saved",
    score
  });
});

// Get all data
app.get("/data", (req, res) => {
  res.json({
    checkins,
    assessments
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});