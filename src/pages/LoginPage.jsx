// src/pages/LoginPage.jsx
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return(/^\S+@\S+\.\S+$/.test(email))
         
    };
 
    const validatePassword = (password) => {
        return password.trim() !== "";
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let emailError = "";
        let passwordError = "";
    
        if (!validateEmail(email)) {
          emailError = "Enter a valid email address ";
        }
        if (!validatePassword(password)) {
          passwordError = "Password cannot be empty";
        }
    
        if (emailError || passwordError) {
          setErrors({ email: emailError, password: passwordError });
          return;
        }
    
        navigate('/home');
      };
  

  return (
    <div className={`d-flex flex-column align-items-center vh-100 d-flex justify-content-center bg-light ${styles.custombg}`} centered >

      <img
        src="/linkedinL.png"
        alt="LinkedIn Logo"
        className="mb-3 "
        style={{ width: "150px" }}
      />
      <div className={`card p-4 shadow-sm  ${styles.customloginformcontainer}`}  style={{ width: "350px" }}>
        <h3 className="mb-1">Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="email"
              className={`form-control  ${styles.custominput}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <small className={`text-danger  ${styles.customerror}`}>{errors.email}</small>}
          </div>
          <div className="mb-2 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control  ${styles.custominput}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={`position-absolute end-0 top-50 translate-middle-y me-3 text-primary  ${styles.customshow}`}
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && <small className={`text-danger  ${styles.customerror}`}>{errors.password}</small>}
          </div>
          <div className="mb-3 form-check mt-4">
            <input type="checkbox" className={`form-check-input  ${styles.customcheckbox}`} id="keepLoggedIn" />
            <label className="form-check-label" htmlFor="keepLoggedIn">
              Keep me logged in
            </label>
          </div>
          <button type="submit" className={`btn btn-primary w-100  ${styles.customsignin}`}>Sign in</button>
        </form>
        
        </div>
        <p className="mt-4 text-center">
          New to LinkedIn? <a href="#" style={{textDecoration:"none", fontWeight:"500"}}>Join now</a>
        </p>
    </div>
  );
};

export default LoginPage;
