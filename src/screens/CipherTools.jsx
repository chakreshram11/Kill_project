  import React from "react";
  import { useNavigate } from "react-router-dom";

  const cipherCategories = [
    { title: "Transform", tools: ["ROT13 Cipher", "Atbash Cipher", "Rail Fence Cipher"], path: "transform" },
    { title: "Alphabets", tools: ["Letter Frequency Analysis", "Bacon’s Cipher", "Custom Alphabet Encoding"], path: "alphabets" },
    { title: "Ciphers", tools: ["Caesar Cipher", "Vigenère Cipher", "XOR Cipher"], path: "ciphers" },
    { title: "Encoding", tools: ["Base64 Encoding/Decoding", "URL Encoding/Decoding", "Morse Code Encryption", "ASCII Encoding"], path: "encoding" },
    { title: "Polybius Square Cipher", tools: ["Polybius Square", "Bifid Cipher", "Trifid Cipher" ], path: "polybius_square_cipher" },
    { title: "Mordern Cryptography", tools: ["RC4", "AES", "SHA-256"], path: "mordern_cryptography" }
  ]

  const CipherTools = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center">
        <button 
          className="self-start mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={() => navigate(-1)} // Navigate back
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-white mb-8">Cipher Tools</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {cipherCategories.map((category) => (
            <div
              key={category.title}
              onClick={() => navigate(`/cipher-tool/${category.path}`)}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-2">{category.title}</h2>
              <ul className="text-gray-400 text-sm">
                {category.tools.slice(0, 3).map((tool, i) => (
                  <li key={i}>• {tool}</li>
                ))}
                {category.tools.length > 3 && <li className="text-blue-500">...more</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default CipherTools;
