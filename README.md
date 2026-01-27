# 🤖 FAQ Chatbot

An AI-powered FAQ chatbot built with React, Node.js, and Google Gemini AI. Features a beautiful dark theme, real-time responses, feedback system, and MongoDB persistence.

---

## ✨ Features

- 🤖 **AI-Powered** - Uses Google Gemini 2.0 Flash for intelligent responses
- ⚡ **Real-time Chat** - Instant responses with typing indicators
- 👍👎 **Feedback System** - Rate responses to help improve accuracy
- 📊 **Review Dashboard** - Track questions that need improvement
- 💾 **MongoDB Storage** - Persistent chat history and feedback tracking
- 🎨 **Modern UI** - ChatGPT-inspired dark theme with smooth animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔄 **Session Management** - Maintains conversation context

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Google Gemini API key (free tier)

### Installation

1. **Clone the repository**
   ```bash
   cd gemini-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   ```

4. **Start the server**
   ```bash
   npm run ser
   ```
   Or use the full command:
   ```bash
   npm run server
   ```
   Or run directly with Node:
   ```bash
   node server.js
   ```

5. **Open your browser**
   
   Navigate to: `http://localhost:3000`

---

## 📁 Project Structure

```
gemini-chatbot/
├── server.js              # Express server with API endpoints
├── db.js                  # MongoDB connection
├── models/
│   ├── Chat.js           # Chat history schema
│   └── Feedback.js       # Feedback tracking schema
├── public/
│   └── react-chat.html   # Main React application
├── package.json          # Dependencies
├── .env                  # Environment variables (not in repo)
└── .gitignore           # Git ignore rules
```

---

## � Available Scripts

| Command | Description |
|---------|-------------|
| `npm run ser` | **Quick start** - Start the server (shortcut) |
| `npm run server` | Start the server (full command) |
| `npm start` | Run the command-line chatbot |
| `npm run stream` | Run the streaming chatbot version |
| `npm run advanced` | Run the advanced chatbot version |

**Recommended:** Use `npm run ser` for quick startup! 🚀

---

## �🔧 API Endpoints

### Chat
- `POST /api/chat` - Send a message and get AI response
- `POST /api/clear` - Clear chat session

### History
- `GET /api/history/:sessionId?` - Get chat history (all or by session)

### Feedback
- `POST /api/feedback` - Submit feedback (👍/👎)
- `GET /api/unanswered` - Get queries needing improvement

---

## 🎯 How to Use

### For Users:

1. **Ask Questions** - Type your question and press Send
2. **Get Instant Answers** - AI responds in real-time
3. **Rate Responses** - Click 👍 (helpful) or 👎 (not helpful)
4. **View History** - Click "History" to see past conversations
5. **Clear Chat** - Click "Clear" to start fresh

### For Administrators:

1. **Monitor Feedback** - Check the "Review" button badge count
2. **Review Problems** - Click "Review" to see questions with negative feedback
3. **Improve Responses** - Use insights to enhance FAQ knowledge
4. **Track Performance** - Monitor which topics need better answers

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Babel Standalone** - JSX transformation

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Google Generative AI** - Gemini API client
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud database

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSy...` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |

### Getting API Keys:

1. **Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key (free tier available)

2. **MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string from "Connect" → "Connect your application"

---

## 📊 Database Schema

### Chat Collection
```javascript
{
  messageId: String,      // Unique message identifier
  userMessage: String,    // User's question
  botResponse: String,    // AI's answer
  sessionId: String,      // Session identifier
  hasFeedback: Boolean,   // Whether feedback was given
  feedbackType: String,   // 'positive', 'negative', or null
  timestamp: Date         // When message was sent
}
```

### Feedback Collection
```javascript
{
  messageId: String,      // Links to chat message
  userQuestion: String,   // Original question
  botResponse: String,    // AI's response
  feedbackType: String,   // 'positive' or 'negative'
  sessionId: String,      // Session identifier
  needsReview: Boolean,   // Flag for negative feedback
  timestamp: Date         // When feedback was given
}
```

---

## 🎨 UI Features

### Animations
- ✨ Gradient background animation
- 💬 Message fade-in effect
- ⏳ Typing indicator with pulsing dots
- 🌊 Smooth scrolling

### Theme
- 🌙 Dark mode (black, gray, teal accents)
- 🎭 ChatGPT-inspired design
- 📱 Fully responsive layout
- ♿ Accessible components

---

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify `.env` file exists with correct values
- Ensure MongoDB Atlas IP whitelist includes your IP

### Can't connect to database
- Verify MongoDB connection string in `.env`
- Check database user credentials
- Ensure network access is configured in Atlas

### API not responding
- Verify Gemini API key is valid
- Check API quota limits
- Look for errors in server console

### Feedback not saving
- Check MongoDB connection
- Verify `messageId` is being generated
- Check browser console for errors

---

## 📈 Performance

- **Response Time:** < 2 seconds (typical)
- **Database Queries:** Optimized with indexes
- **UI Rendering:** React virtualization for long histories
- **Memory Usage:** Efficient session management

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

Built as an AI-Powered FAQ Chatbot project using modern web technologies.

---

## 🎓 Requirements Satisfied

✅ **Objective:** Build a chatbot that answers FAQ using NLP/ML model  
✅ **Tools:** React ✓ | Gemini API ✓ | Node.js ✓  
✅ **Features:**  
- Train/use FAQ model ✓
- Messaging UI ✓
- AI logic for Q&A ✓
- Feedback buttons ✓
- Store unanswered queries ✓

