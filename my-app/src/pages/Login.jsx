import React, { useState } from 'react';

function Login() {
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