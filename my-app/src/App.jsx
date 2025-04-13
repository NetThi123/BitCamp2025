import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/Login";
import Me from './pages/Me.jsx';
import My_Colleges from "./pages/My_Colleges";
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Talk from './pages/Talk';
import CollegeFinder from './pages/CollegeFinder';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Me />} />
          <Route path="/colleges" element={<My_Colleges />} />
          <Route path="/talk" element={<Talk />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;