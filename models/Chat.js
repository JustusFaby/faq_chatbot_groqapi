// models/Chat.js - Chat History Schema
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  // Unique identifier for each message (used for feedback tracking)
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
  botResponse: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sessionId: {
    type: String,
    default: 'default',
  },
  // Track if this message has received feedback
  hasFeedback: {
    type: Boolean,
    default: false,
  },
  // Store the feedback type if given
  feedbackType: {
    type: String,
    enum: ['positive', 'negative', null],
    default: null,
  },
});

// Query performance indexes
// Fast retrieval of chat history per session ordered by time
chatSchema.index({ sessionId: 1, timestamp: 1 });

// Optional retention: auto-delete chats older than 30 days
// Note: TTL index expiration is approximate and handled by MongoDB background thread
chatSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
