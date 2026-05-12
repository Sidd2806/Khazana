import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginGirl from "../../assets/login.webp";
import { loginUser } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const user = await dispatch(
        loginUser({ email: email.trim().toLowerCase(), password }),
      ).unwrap();
      toast.success("Logged in successfully");
      navigate(user.role === "admin" ? "/admin" : "/profile");
    } catch (error) {
      toast.error(error?.message || "Invalid email or password");
    }
  };
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-10 rounded-3xl
            bg-blue-200
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
        >
          <div className="flex justify-center mb-6">
            <h2 className="font-semibold text-xl">MoodWear</h2>
          </div>
          <h2 className="font-bold text-2xl text-center mb-6">Hey there !👋🏻</h2>
          <p className="text-center mb-6 tracking-tighter">
            LOGIN BUDDY TO PURCHASE 🛍️
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email :
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded border-gray-400"
              placeholder="Enter Your Email Address..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded border-gray-400 mb-2"
              placeholder="Enter Your Password..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-sm tracking-tighter text-center mt-4">
            Don't have an Account ?
            <Link to="/register" className="text-blue-500">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={LoginGirl}
            alt="Login to Account"
            className="object-cover  h-175 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
