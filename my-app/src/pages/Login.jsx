import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/LoginStyle.css'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        console.log("Logging in with:", username, password);
        setUsername("");
        setPassword("");
    };
    return (
      <div class = "block">
        <div class = "login-block">
            <h2 class = "login-header">LOGIN </h2>
            <form class = "login-form">
                <div class = "form-field">
                <p>USERNAME</p>
                <input type="text" placeholder="example@gmail.com" />
                </div>
                <br></br>
                <div class = "form-field">
                <p>PASSWORD</p>
                <input type="password" placeholder="makegoodpasswordpls123" />
                </div>
                <br></br>
                <button type="submit">LOGIN</button>
            </form>
        </div>
        <div class = "login-block">
            <h2 class = "login-header">SIGN UP</h2>
            <form class = "login-form">
            <div class = "form-field">
                <p>USERNAME</p>
                <input type="text" placeholder="example@gmail.com" />
                </div>
                <br></br>
                <div class = "form-field">
                <p>PASSWORD</p>
                <input type="password" placeholder="makegoodpasswordpls123" />
                </div>
                <br></br>
                <button type="submit">SIGN UP</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;