import React from 'react';
import { useNavigate } from 'react-router-dom';

function LinuxTools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center">
       {/* Back Button */}
       <button 
        className="self-start top-4 left-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">🛠 Linux Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Password Complexity Checker Card */}
        <div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform cursor-pointer"
          onClick={() => navigate('/linux-tools/password-complexity')}
        >
          <h2 className="text-xl font-semibold text-blue-400 mb-2">🔐 Password Complexity Checker</h2>
          <p className="text-gray-400 text-sm">
            Check password strength and improve security.
          </p>
        </div>

        {/* Subdomain Finder Card */}
        <div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform cursor-pointer"
          onClick={() => navigate('/linux-tools/subdomain-finder')}
        >
          <h2 className="text-xl font-semibold text-blue-400 mb-2">🔎 Subdomain Finder</h2>
          <p className="text-gray-400 text-sm">
            Find subdomains of a website for security analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LinuxTools;
