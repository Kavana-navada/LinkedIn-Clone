import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/Navbar.module.css"
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Home = lazy(() => import("./pages/Home"));
const Connections = lazy(() => import("./pages/Connections"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner animation="border" style={{ marginTop: "200px" }} />
            <p>Loading</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
        <ToastContainer
  position="top-center"
  autoClose={1500}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  theme="colored"
  toastClassName={styles.customToastBody} 
/>


      </Suspense>
    </Router>
  );
} 

export default App;
