import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Connections from './pages/Connections';
import Jobs from "./pages/Jobs";
import NotFoundPage from './pages/NotFoundPage';
import Profile from './pages/Profile';
function App() {
 

  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/connections" element={<Connections/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
