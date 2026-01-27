// models/Feedback.js - Feedback and Unanswered Query Schema
const mongoose = require('mongoose');

/**
 * Feedback Schema
 * Tracks user feedback (thumbs up/down) on bot responses
 * and stores questions that were poorly answered for improvement
 */
const feedbackSchema = new mongoose.Schema({
  // Unique identifier for the chat message
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  // The user's original question
  userQuestion: {
    type: String,
    required: true,
  },
  // The bot's response
  botResponse: {
    type: String,
    required: true,
  },
  // Feedback type: 'positive' (👍) or 'negative' (👎)
  feedbackType: {
    type: String,
    enum: ['positive', 'negative'],
    required: true,
  },
  // Session ID to track which conversation this belongs to
  sessionId: {
    type: String,
    default: 'default',
  },
  // Timestamp of when feedback was given
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Flag to mark if this needs review (negative feedback)
  needsReview: {
    type: Boolean,
    default: false,
  },
});

// Query performance indexes
// Quickly list problematic queries needing review, newest first
feedbackSchema.index({ needsReview: 1, timestamp: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
