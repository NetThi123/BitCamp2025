import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { login, signup, getProtectedResource } from '../util/auth';
import '../styles/LoginStyle.css'

function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!loginUser || !loginPassword) {
            alert("Please enter both username and password.");
            return;
        } else {
            console.log("Logging in with:", loginUser, loginPassword);
            console.log(login(loginUser, loginPassword))
        }
        setLoginPassword("");
        setLoginUser("");

    };

    const handleSignup = (e) => {
        e.preventDefault();
        
        if (!newUser || !newPassword) {
            alert("Please enter both username and password.");
            return;
        } else {
            console.log("Logging in with:", newUser, newPassword);
            console.log(signup(newUser, newPassword))
        }
        setNewPassword("");
        setNewUser("");

    };

    const test = (e) => {
        e.preventDefault();
        
        console.log(getProtectedResource())
    };

    

    return (
      <div class = "block">
        <div class = "login-block">
            <h2 class = "login-header">LOGIN </h2>
            <form class = "login-form">
                <div class = "form-field">
                <p>USERNAME</p>
                <input type="text" placeholder="example@gmail.com" value={loginUser}
                    onChange={() => {setLoginUser(event.target.value)}}/>
                </div>
                <br></br>
                <div class = "form-field">
                <p>PASSWORD</p>
                <input type="password" placeholder="makegoodpasswordpls123" value={loginPassword}
                    onChange={() => {setLoginPassword(event.target.value)}}/>
                </div>
                <br></br>
                <button type="submit" onClick={handleLogin}>LOGIN</button>
            </form>
        </div>
        <div class = "login-block">
            <h2 class = "login-header">NEW? SIGN UP</h2>
            <form class = "login-form">
            <div class = "form-field">
                <p>USERNAME</p>
                <input type="text" placeholder="example@gmail.com" value={newUser}
                    onChange={() => {setNewUser(event.target.value)}}/>
                </div>
                <br></br>
                <div class = "form-field">
                <p>PASSWORD</p>
                <input type="password" placeholder="makegoodpasswordpls123" value={newPassword}
                    onChange={() => {setNewPassword(event.target.value)}}/>
                </div>
                <br></br>
                <button type="submit" onClick={handleSignup}>SIGN UP</button>
                <button type="submit" onClick={test}>TEST</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;