import React from "react";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const genAI = new GoogleGenerativeAI("AIzaSyAMgmz9UwYgipbjlYvTM-Djp5D4qo5UWgg");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleContent= async () => {
    if (!inputText) {
      alert("Please enter a question first!");
      return;
    }
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Question: " + inputText + "\nContext: league of legends (use this website https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki)" + "\nAnswer: (be concise, clear, and restrict to <50 words)";
    const result = await model.generateContent([prompt]);
    setResult(result.response.text());
    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center flex-col text-left h-screen'>

      <div className='p-10 m-10' style={{border: '1px solid white', width: '50%'}}>
        <div className='flex justify-center py-5'>
          <h1>AI Assistant for League of Legends Questions:</h1>
        </div>
        <div className='flex justify-center'>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text here"
            rows="5"
            cols="50"
            style={{ padding: '1rem', borderRadius: '10px' }}
          />
        </div>

        <div className='flex justify-center py-5'>
          <button className='bg-blue-900' onClick={handleContent}>Generate Content</button>
        </div>

        {loading && (
          <div className='py-10'>
            <p>Loading...</p>
          </div>
        )}

        {result && (
          <div className='py-10'>
            <p>{result}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Chatbot;