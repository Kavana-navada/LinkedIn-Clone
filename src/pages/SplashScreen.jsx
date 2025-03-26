import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login"); // Redirect to login after 2 seconds
    }, 1000);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"-20px",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <img
        src="/linkedinL.png"
        alt="LinkedIn Logo"
        style={{ width: "150px", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "160px",
          height: "4px",
          background: "linear-gradient(to right, #0077b5, #00a0dc)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "100%",
            backgroundColor: "#005582",
            position: "absolute",
            left: "-10%",
            animation: "loadingAnimation 1s infinite linear",
          }}
        ></div>
      </div>

      {/* Internal CSS Animation */}
      <style>
        {`
          @keyframes loadingAnimation {
            0% { left: -30%; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
