import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordComplexity() {
  const [password, setPassword] = useState("");
  const [passwordResult, setPasswordResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to check password strength
  const checkPassword = () => {
    const errors = {};
    if (password.length < 8) errors.length = "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) errors.uppercase = "Include at least one uppercase letter.";
    if (!/[a-z]/.test(password)) errors.lowercase = "Include at least one lowercase letter.";
    if (!/[0-9]/.test(password)) errors.number = "Include at least one number.";
    if (!/[^A-Za-z0-9]/.test(password)) errors.special = "Include at least one special character (@, #, $, etc.).";

    if (Object.keys(errors).length === 0) {
      setPasswordResult({ status: "strong", message: "✔ Your password is strong!" });
    } else {
      setPasswordResult({ status: "weak", message: "✘ Your password is weak!", errors });
    }
  };

  return (
    <div className="relative">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 space-y-6">
        {/* Back Button */}
        <button 
          className="self-start absolute top-4 left-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-white">🔐 Password Complexity Checker</h1>

        {/* Password Input Field with Toggle */}
        <div className="relative w-full max-w-md">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 pr-10 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Check Password Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all shadow-md"
          onClick={checkPassword}
        >
          Check Password
        </button>

        {/* Display Result */}
        {passwordResult && (
          <div 
            className={`mt-4 p-4 w-full max-w-md rounded-lg shadow-md transition-all ${passwordResult.status === "strong" ? "bg-green-700" : "bg-red-700"}`}
          >
            <h3 className="text-lg font-bold">
              {passwordResult.status === "strong" ? "✔ Strong Password" : "✘ Weak Password"}
            </h3>
            <p className="text-sm">{passwordResult.message}</p>

            {/* Show Weaknesses if Password is Weak */}
            {passwordResult.errors && (
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                {Object.values(passwordResult.errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordComplexity;
