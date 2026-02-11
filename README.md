# 🤖 FAQ Chatbot with Groq AI

An intelligent FAQ chatbot powered by Groq's lightning-fast LLaMA 3.3 70B model. Features a modern chat interface with Markdown rendering, code syntax highlighting, MongoDB persistence, and comprehensive feedback system.

## 🌐 Live Demo

Try the chatbot now: **[https://faq-chatbot-groqapi.onrender.com/react-chat.html](https://faq-chatbot-groqapi.onrender.com/react-chat.html)**

---

## 🌐 Live Demo

**Try it now:** [https://faq-chatbot-groqapi.onrender.com/react-chat.html](https://faq-chatbot-groqapi.onrender.com/react-chat.html)

Experience the chatbot in action! The app is deployed on Render and ready to use.

---

## ✨ Features

### 🚀 AI & Performance
- 🤖 **Groq AI Integration** - Uses Groq's llama-3.3-70b-versatile model for ultra-fast responses
- ⚡ **Session-Based Context** - Maintains conversation history for contextual responses
- 💬 **Markdown Support** - Full Markdown rendering with DOMPurify sanitization

### 🎨 Modern UI/UX
- 💬 **Chat Bubble Design** - Modern interface inspired by ChatGPT, DeepSeek, and Copilot
- 📝 **Code Blocks** - Syntax-highlighted code with one-click copy functionality
- 🕐 **Timestamps** - Every message shows when it was sent
- ⌨️ **Smart Input** - Textarea with Enter to send, Shift+Enter for new lines
- 🎯 **Responsive Design** - TailwindCSS-based adaptive layout

### 💾 Database & Persistence
- 📊 **MongoDB Atlas** - Cloud-based chat history storage
- 🔄 **30-Day Retention** - Automatic TTL cleanup for old conversations
- 📈 **Performance Indexes** - Optimized compound indexes for fast queries
- 👍👎 **Feedback System** - Track user satisfaction with thumbs up/down
- 📋 **Review Dashboard** - Monitor questions that need improvement

### 🛠️ Technical
- 🔐 **Environment Variables** - Secure configuration management
- 🌐 **REST API** - Express.js backend with multiple endpoints
- 📱 **Cross-Platform** - Works on desktop, tablet, and mobile devices

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Groq API key (free tier available at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JustusFaby/faq_chatbot_groqapi.git
   cd faq_chatbot_groqapi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faq_chatbot
   ```

   **Getting API Keys:**
   - **Groq API Key**: Sign up at [console.groq.com](https://console.groq.com), go to API Keys section
   - **MongoDB URI**: Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

4. **Start the server**
   ```bash
   npm run server
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

#
