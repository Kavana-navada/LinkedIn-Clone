import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserFriends, FaBriefcase, FaBell, FaSearch,FaUser, FaChevronDown } from "react-icons/fa";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import styles from "../styles/Navbar.module.css"; 

const Navigationbar = () => {
  const navigate = useNavigate(); // To navigate dynamically
  const username = "Ravindra";
  
  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container fluid className={`d-flex justify-content-between align-items-center ${styles.topcontainer}`}>
        
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} to="/home" className={styles.logo}>
            <img
              src="/linkedinLogo.png"
              alt="LinkedIn"
              height="35"
            />
          </Navbar.Brand>

          {/* Search Bar for Large Screens */}
          <Form className={`d-none d-md-flex ${styles.searchContainer}`}>
            <FaSearch className={styles.searchIcon} />
            <FormControl type="search" placeholder="Search" className={styles.searchBar} readOnly />
          </Form>

          {/* Search Icon for Small Screens */}
          <FaSearch className={`d-flex d-md-none ${styles.navIconsearch}`} />
        </div>

        
        <Nav className="d-flex flex-row  align-items-center">
          <Nav.Link as={Link} to="/home" className={styles.navItem}>
            <FaHome className={styles.navIcon} />
            <span>Home</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/connections" className={styles.navItem}>
            <FaUserFriends className={styles.navIcon} />
            <span>My Network</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/jobs" className={styles.navItem}>
            <FaBriefcase className={styles.navIcon} />
            <span>Jobs</span>
          </Nav.Link>
          
         
        
          <Nav.Link onClick={() => navigate(`/profile/${username}`)} className={styles.navItem}>
            <FaUser className={styles.navIcon} />
            <span>Me</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
