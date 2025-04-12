import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Login() {
    return (
      <div class = "block">
        <div class = "login-block">
            <h2 class = "login-header">LOGIN: </h2>
            <form class = "login-form">
                <p>USERNAME</p>
                <input type="text" placeholder="Enter" />
                <br></br>
                <p>PASSWORD</p>
                <input type="password" placeholder="Enter" />
                <br></br>
                <button type="submit">LOGIN</button>
            </form>
        </div>
        <div class = "login-block">
            <h2 class = "login-header">SIGN UP:</h2>
            <form class = "login-form">
                <p>USERNAME</p>
                <input type="text" placeholder="Enter" />
                <br></br>
                <p>PASSWORD</p>
                <input type="password" placeholder="Enter" />
                <br></br>
                <button type="submit">SIGN UP</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;