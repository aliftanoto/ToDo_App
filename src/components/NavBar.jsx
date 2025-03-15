import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import LogoImg from "../assets/logo.png";

const firebaseConfig = {
  apiKey: "AIzaSyAC2YYPFYAVrm_7JwAu9WDXT2k22C0ffz4",
  authDomain: "todo-app-736c1.firebaseapp.com",
  projectId: "todo-app-736c1",
  storageBucket: "todo-app-736c1.appspot.com",
  messagingSenderId: "721268800245",
  appId: "1:721268800245:web:cb9383cffc959f139a23bc",
  measurementId: "G-VZKN2HSFW5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setShowLogin(false);
      setError("");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowRegister(false);
      setShowLogin(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <nav className="flex w-full justify-between items-center bg-amber-100 shadow-md py-3 px-10">
        <div className="flex gap-1 justify-center items-center">
          <img src={LogoImg} alt="logo" className="h-10 w-10" />
          <p className="text-lg font-semibold text-gray-800">ToDo App</p>
        </div>

        <div className="flex gap-6 justify-center items-center text-gray-800 font-semibold">
          {isLoggedIn ? (
            <>
              <p className="text-sm">Welcome, {email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white text-sm py-2 px-6 rounded-md hover:bg-red-500 transition ease-in-out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="#" className="text-sm">My ToDo</a>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md mb-2"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md mb-2"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleLogin}
                className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
            <p className="mt-3 text-sm">
              Don't have an account? {" "}
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                className="text-blue-600 underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Register</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md mb-2"
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md mb-2"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleRegister}
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
              <button
                onClick={() => setShowRegister(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;
