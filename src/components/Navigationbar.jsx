import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaBriefcase, FaSearch, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const username = "Ravindra";

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container fluid className={styles.topcontainer}>
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} to="/home" className={styles.logo}>
            <img src="/linkedinLogo.png" alt="LinkedIn" height="35" />
          </Navbar.Brand>

          <div className={styles.searchWrapper} ref={searchRef}>
            <FaSearch className={styles.searchIcon} onClick={() => setShowSearch(!showSearch)} />
            {showSearch && (
              <Form className={styles.searchContainer}  onSubmit={(e) => e.preventDefault()}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className={styles.searchBar}
                  value={searchTerm}
                  onChange={handleSearch}
                  autoFocus
                />
              </Form>
            )}
          </div>
        </div>

        <Nav className={`d-flex flex-row align-items-center ${showSearch ? styles.hideIcons : ""}`}>
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