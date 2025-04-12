import React, { useState } from 'react';

function Login() {
    return (
      <div class = "block">
        <div class = "login-block">
            <h2 class = "login-header">Login</h2>
            <form class = "login-form">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
        <div class = "sign-up">
        <h2 class = "sign-up-header">New? Sign Up!</h2>
            <form class = "sign-up-form">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;