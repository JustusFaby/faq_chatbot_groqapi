// chatbot-advanced.js
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const readline = require("readline");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Generation configuration
const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

async function runChatbot() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    safetySettings,
    generationConfig,
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello! What kind of assistant are you?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello! I'm a helpful AI assistant powered by Google's Gemini. I can help you with questions, provide information, assist with coding, creative writing, and much more. How can I help you today?",
          },
        ],
      },
    ],
  });

  console.log("=".repeat(60));
  console.log("🤖 Advanced Gemini Chatbot");
  console.log("Commands: 'quit' to exit, 'history' to view chat history");
  console.log("=".repeat(60));

  let chatHistory = [];

  const askQuestion = () => {
    rl.question("\n🧑 You: ", async (userInput) => {
      if (
        userInput.toLowerCase() === "quit" ||
        userInput.toLowerCase() === "exit"
      ) {
        console.log("\n🤖 Chatbot: Goodbye! 👋");
        rl.close();
        return;
      }

      if (userInput.toLowerCase() === "history") {
        console.log("\n📜 Chat History:");
        chatHistory.forEach((entry, index) => {
          console.log(`\n${index + 1}. ${entry.role}: ${entry.message}`);
        });
        askQuestion();
        return;
      }

      if (!userInput.trim()) {
        askQuestion();
        return;
      }

      try {
        // Save user message
        chatHistory.push({ role: "You", message: userInput });

        // Send message
        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        const text = response.text();

        // Save bot response
        chatHistory.push({ role: "Chatbot", message: text });

        console.log(`\n🤖 Chatbot: ${text}`);

        askQuestion();
      } catch (error) {
        console.error("\n❌ Error:", error.message);
        askQuestion();
      }
    });
  };

  askQuestion();
}

runChatbot();