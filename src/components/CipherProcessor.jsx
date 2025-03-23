import React, { useState } from "react";
import { rot13Encrypt, rot13Decrypt, atbashEncrypt, atbashDecrypt, railFenceEncrypt, railFenceDecrypt } from "../ciphers/Transform";
import { baconsCipherEncrypt, baconsCipherDecrypt } from "../ciphers/Alphabets";
import { caesarCipher, vigenereCipher, xorCipher } from "../ciphers/Ciphers";
import { base64Converter, urlConverter, morseConverter, asciiConverter } from "../ciphers/Encoding";
import { polybiusSquareEncrypt, polybiusSquareDecrypt, bifidEncrypt, bifidDecrypt, trifidEncrypt, trifidDecrypt } from "../ciphers/PolybiusSquareCiphers";
import { rc4Encrypt, rc4Decrypt, aesEncrypt, aesDecrypt, hashSHA256 } from "../ciphers/ModernCryptography"; // Import new functions

const CipherProcessor = ({ tool }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [shiftKey] = useState(13);
  const [vigenereKey, setVigenereKey] = useState("KEY");
  const [rails, setRails] = useState(3);
  // const [customAlphabet, setCustomAlphabet] = useState("ZYXWVUTSRQPONMLKJIHGFEDCBA");
  const [mode, setMode] = useState("encode"); // Default to encoding
  const [aesKey, setAesKey] = useState("mysecurekey1234"); // AES Key
  const [aesIV, setAesIV] = useState(""); // AES IV for decryption

  const handleProcess = async () => {
    switch (tool) {
      case "ROT Cipher":
        setOutputText(mode === "encode" ? rot13Encrypt(inputText) : rot13Decrypt(inputText));
        break;
      case "Atbash Cipher":
        setOutputText(mode === "encode" ? atbashEncrypt(inputText) : atbashDecrypt(inputText));
        break;
      case "Rail Fence Cipher":
        setOutputText(mode === "encode" ? railFenceEncrypt(inputText, rails) : railFenceDecrypt(inputText, rails));
        break;
      case "Bacon's Cipher":
        setOutputText(mode === "encode" ? baconsCipherEncrypt(inputText) : baconsCipherDecrypt(inputText));
        break;
      case "Base64":
        setOutputText(base64Converter(inputText, mode));
        break;
      case "URL":
        setOutputText(urlConverter(inputText, mode));
        break;
      case "Morse Code":
        setOutputText(morseConverter(inputText, mode));
        break;
      case "ASCII":
        setOutputText(asciiConverter(inputText, mode));
        break;
      case "Caesar Cipher":
        setOutputText(caesarCipher(inputText, shiftKey, mode));
        break;
      case "Vigenère Cipher":
        setOutputText(vigenereCipher(inputText, vigenereKey, mode));
        break;
      case "XOR Cipher":
        setOutputText(xorCipher(inputText, vigenereKey)); // XOR is symmetric
        break;
      case "Polybius Square":
        setOutputText(mode === "encode" ? polybiusSquareEncrypt(inputText) : polybiusSquareDecrypt(inputText));
        break;
      case "Bifid Cipher":
        setOutputText(mode === "encode" ? bifidEncrypt(inputText) : bifidDecrypt(inputText));
        break;
      case "Trifid Cipher":
        setOutputText(mode === "encode" ? trifidEncrypt(inputText) : trifidDecrypt(inputText));
        break;
      
      /*** MODERN CRYPTOGRAPHY ***/
      case "RC4":
        setOutputText(mode === "encode" ? rc4Encrypt(vigenereKey, inputText) : rc4Decrypt(vigenereKey, inputText));
        break;
      case "AES":
        if (mode === "encode") {
          const encryptedData = await aesEncrypt(aesKey, inputText);
          setAesIV(encryptedData.iv); // Store IV for decryption
          setOutputText(encryptedData.ciphertext);
        } else {
          if (!aesIV) {
            setOutputText("IV required for decryption!");
            return;
          }
          const decryptedData = await aesDecrypt(aesKey, inputText, aesIV);
          setOutputText(decryptedData);
        }
        break;
      case "SHA-256":
        setOutputText(await hashSHA256(inputText)); // SHA-256 is always one-way
        break;

      default:
        setOutputText("Unsupported Cipher");
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-blue-400 mb-2">{tool}</h2>

      {/* Key Input for Certain Ciphers */}
      {(tool === "Caesar Cipher" || tool === "XOR Cipher" || tool === "Vigenère Cipher" || tool === "RC4") && (
        <div className="mb-3">
          <label className="block text-gray-400 mb-1">Key:</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={vigenereKey}
            onChange={(e) => setVigenereKey(e.target.value)}
          />
        </div>
      )}

      {tool === "AES" && (
        <>
          <div className="mb-3">
            <label className="block text-gray-400 mb-1">AES Key:</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={aesKey}
              onChange={(e) => setAesKey(e.target.value)}
            />
          </div>
          {mode === "decode" && (
            <div className="mb-3">
              <label className="block text-gray-400 mb-1">AES IV:</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                value={aesIV}
                onChange={(e) => setAesIV(e.target.value)}
              />
            </div>
          )}
        </>
      )}

      {tool === "Rail Fence Cipher" && (
        <div className="mb-3">
          <label className="block text-gray-400 mb-1">Rails:</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={rails}
            onChange={(e) => setRails(Number(e.target.value))}
            min="2"
          />
        </div>
      )}

      {/* Encode/Decode Mode Selector */}
      {tool !== "SHA-256" && (
        <div className="mb-3">
          <label className="block text-gray-400 mb-1">Mode:</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
        </div>
      )}

      <textarea
        className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
        rows="3"
        placeholder="Enter text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 rounded text-white w-full"
        onClick={handleProcess}
      >
        {mode === "encode" ? "Encode" : "Decode"}
      </button>

      <textarea
        className="w-full p-3 mt-3 rounded bg-gray-700 text-white"
        rows="3"
        value={outputText}
        readOnly
      ></textarea>
    </div>
  );
};

export default CipherProcessor;
