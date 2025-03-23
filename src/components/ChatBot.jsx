import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";


// ✅ Initialize Gemini AI with API Key from process.env
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;


if (!apiKey) {
  console.error("❌ ERROR: REACT_APP_GEMINI_API_KEY is not defined. Check your .env file!");
}

const genAI = new GoogleGenerativeAI(apiKey);

const ChatBot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();


  // Scroll to the latest message smoothly
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch response from Gemini API
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    console.log("Sending request to Gemini API...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: inputText }] }] });

      console.log("Response:", result);

      // ✅ Extract AI response correctly
      const botMessage = {
        sender: "bot",
        text: result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Oops! Something went wrong. Try again." }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <button 
        className="self-start mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={() => navigate(-1)} // Navigate back
      >
        ← Back
      </button>
      <h2 className="text-4xl font-bold text-center mb-6 tracking-wide text-blue-400">AI Chatbot</h2>

      {/* Chat Window */}
      <div className="flex flex-col flex-grow bg-gray-800 rounded-xl shadow-lg p-5 overflow-y-auto h-[500px] border border-gray-700">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
          >
            <div
              className={`p-4 max-w-[75%] rounded-xl shadow-md text-sm leading-relaxed tracking-wide ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-4 bg-gray-700 text-gray-300 rounded-lg animate-pulse">Typing...</div>
          </div>
        )}

        <div ref={chatRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center bg-gray-700 p-4 rounded-xl mt-5 shadow-md border border-gray-600">
        <input
          className="w-full p-4 bg-transparent text-white outline-none placeholder-gray-400 text-lg"
          type="text"
          placeholder="Ask about Ciphers, Linux, CTF..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-white ml-3 shadow-md transition-all duration-200 flex items-center justify-center"
          onClick={handleSend}
        >
          <FaPaperPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
