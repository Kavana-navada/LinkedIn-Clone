import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Modal,
  Button,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import jobData from "../data/jobs.json";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaBookmark,
} from "react-icons/fa";
import Navigationbar from "../components/Navigationbar";
import styles from "../styles/Jobs.module.css";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  const [savedJobs, setSavedJobs] = useState(
    new Set(JSON.parse(localStorage.getItem("savedJobs")) || [])
  );
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setJobs(jobData);
      setFilteredJobs(jobData);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify([...savedJobs]));
  }, [savedJobs]);

  useEffect(() => {
    let updatedJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
    );

    if (showSavedOnly) {
      updatedJobs = updatedJobs.filter((job) => savedJobs.has(job.id));
    }

    setFilteredJobs(updatedJobs);
  }, [searchTerm, jobs, showSavedOnly, savedJobs]);


  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSavedJobs = new Set(prev);
      newSavedJobs.has(jobId)
        ? newSavedJobs.delete(jobId)
        : newSavedJobs.add(jobId);
      return newSavedJobs;
    });
  };

  return (
    <>
      <Navigationbar />
      <div className={styles.container}>
        <div className="container mt-4">
          

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading</p>
            </div>
          ) : (
            <div className={styles.jobinfo}>
              <div className={styles.jobTop} >
              <h5 >Top job picks for you </h5>
              <Form.Check
                type="checkbox"
                label="Show saved jobs only"
                checked={showSavedOnly}
                onChange={() => setShowSavedOnly(!showSavedOnly)}
                className={styles.searchInput}
              />
              </div>
              <span>
                Based on your profile, preferences, and activity like applies,
                searches, and saves.
              </span>
              <p>{filteredJobs.length} results</p>
              <div className="row">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="col-md-6 mb-3">
                    <Card
                      className={`h-100 d-flex flex-column ${styles.animatedCard}`}
                    >
                      <Card.Body
                        className={`d-flex flex-column ${styles.cardBody}`}
                      >
                        <div className="d-flex align-items-start">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="me-3"
                            width="50"
                            height="50"
                            style={{ objectFit: "contain" }}
                          />
                          <div>
                            <h6 style={{ color: "blue" }}>{job.title}</h6>
                            <p className="text-muted">{job.company}</p>
                          </div>
                        </div>
                        <p className="mt-2">
                          <FaMapMarkerAlt className={styles.icon} />{" "}
                          {job.location}
                        </p>
                        <p>
                          <FaBriefcase className={styles.icon} /> {job.type}
                        </p>
                        <p>
                          <FaMoneyBillAlt className={styles.icon} />{" "}
                          {job.salary}
                        </p>
                        <p>
                          <FaCalendarAlt className={styles.icon} /> Posted on{" "}
                          {new Date(job.postedAt).toDateString()}
                        </p>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-between">
                        <Button
                          variant="link"
                          onClick={() => setSelectedJob(job)}
                          className={styles.viewDetails}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => toggleSaveJob(job.id)}
                          style={{ textDecoration: "none" }}
                        >
                          <FaBookmark
                            className={
                              savedJobs.has(job.id)
                                ? "text-primary"
                                : "text-muted"
                            }
                          />
                          {savedJobs.has(job.id) ? "Saved" : "Save Job"}
                        </Button>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedJob && (
            <Modal show={true} onHide={() => setSelectedJob(null)} className={styles.modal}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedJob.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={selectedJob.logo}
                    alt={selectedJob.company}
                    width="50"
                    height="50"
                    className="me-3"
                  />
                  <div>
                    <h6>{selectedJob.company}</h6>
                    <p style={{color: "#666"}}>
                      <FaCalendarAlt /> Posted on{" "}
                      {new Date(selectedJob.postedAt).toDateString()}
                    </p>
                  </div>
                </div>
                <p>
                  <FaMapMarkerAlt /> {selectedJob.location}
                </p>
                <p>
                  <FaBriefcase /> {selectedJob.type}
                </p>
                <p>
                  <FaMoneyBillAlt /> {selectedJob.salary}
                </p>
                <h6 style={{marginTop:"15px"}}>Job Description</h6>
                <p>{selectedJob.description}</p>
                <h6>Requirements</h6>
                <ul>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </Modal.Body>
              <Modal.Footer className={styles.modalFooter}>
                <Button
                  className={styles.savebtn}
                  variant="outline-primary"
                  onClick={() => toggleSaveJob(selectedJob.id)}
                >
                  {/* <FaBookmark
                    className={
                      savedJobs.has(selectedJob.id)
                        ? "text-primary" 
                        : "text-muted"
                    }
                    
                  /> */}
                  {savedJobs.has(selectedJob.id) ? "Saved" : "Save Job"}
                </Button >
                <Button className={styles.applybtn} variant="primary" onClick={()=>alert(`Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted`)}>Apply Now</Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
