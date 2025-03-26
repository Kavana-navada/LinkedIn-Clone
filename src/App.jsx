import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Spinner } from "react-bootstrap";


const LoginPage = lazy(() => import('./pages/LoginPage'));
const Home = lazy(() => import('./pages/Home'));
const Connections = lazy(() => import('./pages/Connections'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center">
          <Spinner animation="border" style={{ marginTop: "200px" }} />
          <p>Loading</p>
        </div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
