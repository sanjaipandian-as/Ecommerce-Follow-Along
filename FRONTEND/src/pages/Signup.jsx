import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle form input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(""); // Clear previous errors when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful", response.data);
      alert("Signup Successful! You can now log in.");
    } catch (err) {
      console.error("Signup error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
      <div
        className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-md w-full"
        style={{
          backgroundImage:
            "url('https://www.tamilnadutourism.tn.gov.in/img/pages/vertical/ooty-1658377980_e8b569cbd5d3506c3e17.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Join our community</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-900">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-900 placeholder-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="text-gray-900">Password</label>
            <div className="flex items-center mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="p-2 w-full border rounded-md bg-white text-gray-900 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 cursor-pointer text-gray-700 p-2"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
