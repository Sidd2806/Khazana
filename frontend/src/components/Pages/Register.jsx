import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterGirl from "../../assets/register.webp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    // const userData = {
    //     name,
    //     email,
    //     password,
    // }
    setEmail("");
    setName("");
    setPassword("");
    console.log('User Registered: ', name, email, password);
  };
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-lg  bg-blue-200
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
        >
          <div className="flex justify-center mb-6">
            <h2 className="font-semibold text-xl">MoodWear</h2>
          </div>
          <h2 className="font-bold text-2xl text-center mb-6">
            Hey there !👋🏻 Create Account
          </h2>
          <p className="text-center mb-6 tracking-tighter">
            REGISTER BUDDY BE THE PART OF MoodWear 🛍️
          </p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Name :</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded border-gray-400"
              placeholder="Enter Your Name..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded border-gray-400"
              placeholder="Enter Your Email Address..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password :
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded border-gray-400 mb-2"
              placeholder="Enter Your Password..."
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Sign Up
          </button>
          <p className="text-sm tracking-tighter text-center mt-4 mb-4">
            Already have an Account ?
            <Link to="/login" className="text-blue-500">
              {" "}
              Login
            </Link>
          </p>
          <p className="tracking-tighter text-sm font-semibold text-center text-gray-600">
            By clicking continue, you agree to our{" "}
            <a className="text-blue-500" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-blue-500" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={RegisterGirl}
            alt="Login to Account"
            className="object-cover h-187.5 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;