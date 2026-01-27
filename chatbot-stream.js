// chatbot-stream.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runChatbot() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  const chat = model.startChat({
    history: [],
  });

  console.log("=".repeat(60));
  console.log("🤖 Gemini Chatbot with Streaming");
  console.log("=".repeat(60));

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

      if (!userInput.trim()) {
        askQuestion();
        return;
      }

      try {
        process.stdout.write("\n🤖 Chatbot: ");

        // Stream the response
        const result = await chat.sendMessageStream(userInput);

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          process.stdout.write(chunkText);
        }

        console.log("\n");
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