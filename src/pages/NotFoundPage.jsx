import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";

const NotFound = () => {

  return (
    <div >
        <div className={styles.topContainer}>
      <img src="/linkedinL.png" alt="LinkedIn" className={styles.linkedinLogo} />
      </div>
      <div className={styles.notfoundContainer}>
      <div className={styles.illustrationContainer}>
        <img src="/notfound.png" alt="Error" className={styles.illustration} />
      </div>

      <h2 className={styles.errorTitle}>This page doesn’t exist</h2>
      <p className={styles.errorText}>
        Please check your URL or return to LinkedIn home.
      </p>

      <Link to="/home">
        <button className={styles.backBtn} >Go to your feed</button>
      </Link>
      </div>

      <footer className={styles.footerLinks}>
        <span>LinkedIn © 2025</span>
        <a href="#">User Agreement</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Community Guidelines</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Copyright Policy</a>
        <a href="#">Guest Controls</a>
      </footer>
      
    </div>
  );
};

export default NotFound;
