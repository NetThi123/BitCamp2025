import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <HomePage/>
      </BrowserRouter>

    </div>
  );
}

export default App;