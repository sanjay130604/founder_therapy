import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState("");
  const [moodResult, setMoodResult] = useState("");

  const handlePrompt = async () => {
    const res = await axios.post("http://localhost:5000/api/openai/generate-prompt");
    setPrompt(res.data.prompt);
  };

  const handleAnalyze = async () => {
    const res = await axios.post("http://localhost:5000/api/openai/analyze-mood", { content: entry });
    setMoodResult(res.data.moodAndSolution);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Navbar />

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your Journal</h2>
          <p className="text-sm text-gray-500 mb-4">
            Take a moment to reflect on your thoughts and feelings.
          </p>

          {/* Generate Prompt Button */}
          <button
            onClick={handlePrompt}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4 transition transform hover:scale-105 duration-300 ease-in-out"
          >
            💡 Generate Prompt
          </button>

          {/* Prompt Display */}
          {prompt && (
            <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded text-sm mb-4 shadow-sm">
              <strong>Prompt:</strong> {prompt}
            </div>
          )}

          {/* Textarea */}
          <textarea
            className="w-full border border-gray-300 rounded p-4 h-40 mb-4"
            placeholder="Start writing your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded animate-bounce-slow"
            >
              📤 Submit Entry
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              Save Draft
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Your entry is saved locally in your browser.
          </p>
        </div>

        {/* Mood Result */}
        {moodResult && (
          <div className="animate-fade-in-up mt-6 bg-gradient-to-br from-blue-50 to-green-50 border-l-4 border-blue-400 shadow-xl rounded-xl p-6 transition duration-500 ease-in-out transform hover:scale-[1.01]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧠</span>
              <h3 className="text-2xl font-bold text-blue-700 tracking-wide">Mood Analysis Result</h3>
            </div>
            <p className="text-md text-gray-800 leading-relaxed whitespace-pre-line">
              {moodResult}
            </p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
          }

          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
