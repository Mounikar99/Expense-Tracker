import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword    } from "firebase/auth";
import { auth } from "../store/Firebase";
import '../styles/loginSignup.css'

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin();
    } else {
      onSignup();
    }
    
  };

  async function onLogin() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  }

  async function onSignup() {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
  return (
    <div id="loginSignupContainer">
      <form>
          <input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />

        <button type="submit" onClick={onSubmit}>
          {!isLogin ? "Sign up" : "Login"}
        </button>
      </form>
      {
        !isLogin ? 
        (
            <p>
                Already have an account? <span id="loginBtn" onClick={() => setIsLogin(true)}>Sign in</span>
            </p>
        ): 
        (
            <p>
                Create an account? <span id="loginBtn" onClick={() => setIsLogin(false)}>Sign up</span>
            </p>
        )
      }
      
    </div>
  );
}

export default LoginSignup;
