import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../Context/AdminContext";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(password);
    if (result.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">BookNest</h1>
          <p className="text-gray-500 mt-2">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Admin password enter karein"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Default password: <code className="bg-gray-100 px-2 py-1 rounded">booknest2024</code>
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700"
        >
          ← Website par wapas jayein
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
