// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const Chat = require("./models/Chat");
const Feedback = require("./models/Feedback");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Redirect root URL to react-chat.html
app.get("/", (req, res) => {
  res.redirect("/react-chat.html");
});

// Groq API base configuration
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Store chat sessions (in production, use Redis or a database)
// Map of sessionId -> messages[]
const chatSessions = new Map();

// Endpoint to send messages
app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or create session message history
    let messages;
    if (chatSessions.has(sessionId)) {
      messages = chatSessions.get(sessionId);
    } else {
      messages = [];
      chatSessions.set(sessionId, messages);
    }

    // Add user message
    messages.push({ role: "user", content: message });

    // Call Groq chat completions via REST
    const { data } = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.3,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = data?.choices?.[0]?.message?.content || "";

    // Add assistant reply to history
    messages.push({ role: "assistant", content: text });

    // Generate unique messageId for feedback tracking
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let timestamp = Date.now();

    // Save chat to MongoDB
    try {
      const chatRecord = new Chat({
        messageId,
        userMessage: message,
        botResponse: text,
        sessionId,
      });
      await chatRecord.save();
      timestamp = chatRecord.timestamp;
      console.log("💾 Chat saved to MongoDB");
    } catch (dbError) {
      console.error("Failed to save to DB:", dbError.message);
    }

    res.json({
      success: true,
      response: text,
      sessionId,
      messageId, // Send messageId to frontend for feedback tracking
      timestamp,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint to clear chat history
app.post("/api/clear", (req, res) => {
  const { sessionId = "default" } = req.body;
  chatSessions.delete(sessionId);
  res.json({ success: true, message: "Chat history cleared" });
});

// Endpoint to get chat history from MongoDB
app.get("/api/history/:sessionId?", async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    
    let history;
    if (sessionId) {
      // Get history for specific session
      history = await Chat.find({ sessionId }).sort({ timestamp: 1 });
    } else {
      // Get ALL history from all sessions
      history = await Chat.find({}).sort({ timestamp: 1 });
    }
    
    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint to submit feedback (thumbs up/down)
app.post("/api/feedback", async (req, res) => {
  try {
    const { messageId, feedbackType, userQuestion, botResponse, sessionId } = req.body;

    if (!messageId || !feedbackType) {
      return res.status(400).json({ error: "messageId and feedbackType are required" });
    }

    // Check if feedback already exists for this message
    let feedback = await Feedback.findOne({ messageId });
    
    if (feedback) {
      // Update existing feedback
      feedback.feedbackType = feedbackType;
      feedback.needsReview = feedbackType === 'negative';
      await feedback.save();
    } else {
      // Create new feedback record
      feedback = new Feedback({
        messageId,
        userQuestion,
        botResponse,
        feedbackType,
        sessionId,
        needsReview: feedbackType === 'negative',
      });
      await feedback.save();
    }

    // Update the Chat record to mark it has feedback
    await Chat.findOneAndUpdate(
      { messageId },
      { hasFeedback: true, feedbackType }
    );

    console.log(`👍👎 Feedback saved: ${feedbackType} for message ${messageId}`);

    res.json({
      success: true,
      message: "Feedback saved successfully",
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint to get unanswered/problematic queries (negative feedback)
app.get("/api/unanswered", async (req, res) => {
  try {
    // Get all queries that received negative feedback
    const unansweredQueries = await Feedback.find({ 
      feedbackType: 'negative',
      needsReview: true 
    }).sort({ timestamp: -1 });

    res.json({
      success: true,
      count: unansweredQueries.length,
      queries: unansweredQueries,
    });
  } catch (error) {
    console.error("Error fetching unanswered queries:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});