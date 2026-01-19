import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success("Login successfull");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen font-orbitron flex-col space-y-5">
        <div className=" text-center py-2 px-2  text-xl font-bold bg-gray-800 text-white rounded-sm w-80">
          Msg_Loop
        </div>
        <div className="border-none rounded-xl shadow-2xl shadow-gray-400 px-1 w-80">
          <div className="flex justify-center items-center flex-col ">
            <h2 className="mt-5 text-center text-[24px] font-semibold ">
              Login
            </h2>
            <div>
              <form onSubmit={handleLogin} className="mt-3 p-5 ">
                <label className="block " htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border text-[14px] px-1.5 w-50 rounded-md  mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block mt-3" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border text-[14px] px-1.5 w-50 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-gray-800 cursor-pointer text-white px-4  mt-2 py-1 rounded-sm text-[16px]"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <p className="text-sm text-center mb-5">
                Don't have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
