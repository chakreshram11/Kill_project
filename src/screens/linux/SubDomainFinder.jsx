import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubDomainFinder() {
  const [domain, setDomain] = useState("");
  const [subdomains, setSubdomains] = useState([]);
  const [logs, setLogs] = useState(""); // Store logs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const findSubdomains = async () => {
    const trimmedDomain = domain.trim();

    if (!trimmedDomain) {
      setError("⚠️ Please enter a valid domain.");
      return;
    }

    setLoading(true);
    setError("");
    setSubdomains([]);
    setLogs(""); // Reset logs

    try {
      console.log("🔍 Sending request to backend:", trimmedDomain);
      const response = await axios.post("http://127.0.0.1:5000/find-subdomains", { domain: trimmedDomain });

      // console.log("✅ Response received:", response.data);

      if (response.data.error) {
        setError("⚠️ Error: " + response.data.error);
      } else {
        setSubdomains(response.data.subdomains);
        setLogs(response.data.logs); // Save logs
      }
    } catch (err) {
      console.error("❌ Axios error:", err);
      setError("❌ Failed to fetch subdomains. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-6 flex flex-col items-center">
      <button 
        className="self-start mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={() => navigate(-1)} // Navigate back
      >
        ← Back
      </button>
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-8">
        🔎 Subdomain Finder
      </h1>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 w-full max-w-lg">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-400 outline-none"
          placeholder="Enter domain (example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button
          onClick={findSubdomains}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 shadow-md"
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Find"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4 w-full max-w-lg text-center">
          {error}
        </div>
      )}

      {/* Results Section */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4">Results:</h2>
        {subdomains.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-700">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border border-gray-600">#</th>
                  <th className="px-4 py-2 border border-gray-600">Subdomain</th>
                  <th className="px-4 py-2 border border-gray-600">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {subdomains.map((sub, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="px-4 py-2 border border-gray-600 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-600 text-green-400">{sub.subdomain}</td>
                    <td className="px-4 py-2 border border-gray-600 text-yellow-300">{sub.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="text-gray-400">No subdomains found.</p>
        )}
      </div>

      {/* Logs Section */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-white mb-2">Logs:</h2>
        <pre className="text-gray-300 bg-gray-900 p-4 rounded-lg max-h-60 overflow-y-auto whitespace-pre-wrap">
          {logs || "No logs available"}
        </pre>
      </div>
    </div>
  );
}

export default SubDomainFinder;
