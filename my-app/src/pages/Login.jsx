import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { login, signup, getProtectedResource } from '../util/auth';
import '../styles/LoginStyle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { isLoggedIn, do_login } = useAuth();
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!loginUser || !loginPassword) {
            toast.error("Please enter both username and password.");
            return;
        } else {
            console.log("Logging i11n with:", loginUser, loginPassword);
            let data = await login(loginUser, loginPassword)
            console.log(data)

            if (data.success) {
                toast.success("logged in successfully!");   
                do_login()
                navigate('/me')
                                                // <---------------------
            } else {
                toast.error("failed to login! make sure your username and password are correct!");    // <---------------------
            }

            //console.log(resp)
        }
        setLoginPassword("");
        setLoginUser("");

    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!newUser || !newPassword) {
            toast.error("Please enter both username and password.");   // <---------------------
            return;
        } else {
            console.log("Logging2in with:", newUser, newPassword);
            let data = await signup(newUser, newPassword);

            if (data.success) {
                toast.success("account created successfully!");        // <---------------------

                // since we just signed up, log in as well
                data = await login(newUser, newPassword)
                if (data.success) {
                    toast.success("logged in successfully!");            // <---------------------
                    do_login()
                    navigate('/me')
                } else {
                    toast.error("failed to login! make sure your username and password are correct!"); // <---------------------
                }
                
            } else {
                toast.error("failed to create account! username must be taken!"); // <---------------------
            }

            //console.log(resp)
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
                <button type="submit" className="login-button" onClick={handleLogin}>LOGIN</button>
            </form>
        </div>
        <div class = "login-block">
            <h2 class = "login-header">SIGN UP</h2>
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
                <button type="submit" className="login-button" onClick={handleSignup}>SIGN UP</button>
            </form>
        </div>
        <ToastContainer />
      </div>
    );
  }
  
  export default Login;