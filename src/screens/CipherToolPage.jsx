
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CipherProcessor from "../components/CipherProcessor";

const cipherData = {
  transform: ["ROT Cipher", "Atbash Cipher", "Rail Fence Cipher"],
  alphabets: ["Bacon's Cipher", "Custom Alphabet"],
  ciphers: ["Caesar Cipher", "Vigenère Cipher", "XOR Cipher"],
  encoding: ["Base64", "URL", "Morse Code", "ASCII"],
  polybius_square_cipher: ["Polybius Square", "Bifid Cipher", "Trifid Cipher"],
  mordern_cryptography : ["RC4", "AES", "SHA-256"]
};

const CipherToolPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Memoize the tools array
  const tools = useMemo(() => cipherData[category] || [], [category]);

  const [selectedTool, setSelectedTool] = useState("");

  // Set default tool when category changes
  useEffect(() => {
    setSelectedTool(tools.length > 0 ? tools[0] : "");
  }, [category, tools]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center">
      <button 
        className="self-start mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={() => navigate(-1)} // Navigate back
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-white mb-6 capitalize">
        {category.replace("-", " ")}
      </h1>

      {/* Dropdown only if tools exist */}
      {tools.length > 0 ? (
        <>
          <div className="mb-6">
            <select
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              {tools.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
          </div>

          {/* Render the Cipher Processor */}
          {selectedTool && <CipherProcessor tool={selectedTool} />}
        </>
      ) : (
        <p className="text-red-400 text-lg">No tools available for this category.</p>
      )}
    </div>
  );
};

export default CipherToolPage;
