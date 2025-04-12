import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/Login";
import College_Finder from "./pages/College_Finder";
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;