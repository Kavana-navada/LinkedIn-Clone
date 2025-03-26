import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FaPen,
  FaEye,
  FaUserFriends,
  FaChartBar,
  FaSearch,
} from "react-icons/fa";
import users from "../data/users.json";
import posts from "../data/posts.json";
import SuggestedConnections from "../components/SuggestedConnections";
import CreatePost from "../components/CreatePosts";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Profile.module.css";
import Navigationbar from "../components/Navigationbar";
import NotFound from "../pages/NotFoundPage";

const Profile = () => {
  const { username } = useParams();
  const [bio, setBio] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [bioHeadline, setBioHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState("true");
  const [connections, setConnections] = useState(() => {
    try {
      const storedConnections = JSON.parse(localStorage.getItem("connections"));
      return Array.isArray(storedConnections) &&
        storedConnections.every((conn) => typeof conn === "object")
        ? storedConnections
        : [];
    } catch {
      return [];
    }
  });
  const user = users.find((u) => u.name === username);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (user) {
        setBio(localStorage.getItem(`bio-${username}`) || user.bio);
        setBioHeadline(
          localStorage.getItem(`bioheadline-${username}`) || user.bioheadline
        );
        setJobTitle(localStorage.getItem(`job-${username}`) || user.headline);
        setLocation(
          localStorage.getItem(`location-${username}`) || user.location
        );
      }
      setLoading(false);
    }, 300);
  }, [user, username]);

  const handleSave = () => {
    localStorage.setItem(`bio-${username}`, bio);
    localStorage.setItem(`bioheadline-${username}`, bioHeadline);
    localStorage.setItem(`location-${username}`, location);
    localStorage.setItem(`job-${username}`, jobTitle);
    setShowModal(false);
  };
  const handleConnect = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const updatedConnections = [...connections, user];
      setConnections(updatedConnections);
      localStorage.setItem("connections", JSON.stringify(updatedConnections));
    }
  };

  const userPosts = useMemo(
    () => (user ? posts.filter((post) => post.userId === user.id) : []),
    [user]
  );

  if (!user)
    return (
      <div>
        <NotFound />
      </div>
    );

  return (
    <>
      <Navigationbar />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" style={{ marginTop: "200px" }} />
          <p>Loading</p>
        </div>
      ) : (
        <div className={styles.container}>
          <Container>
            <Row className="mt-4 ">
              {/* Left Column - Profile Details */}
              <Col md={8}>
                <Card className={styles.profileHeaderCard}>
                  <div className={styles.profileHeader}>
                    <div
                      className={styles.profileBackground}
                      style={{
                        backgroundImage: `url(${user.backgroundImage})`,
                      }}
                    ></div>
                    <img
                      className={styles.profileAvatar}
                      src={user.avatar}
                      alt={user.name}
                    />
                    <FaPen
                      className={styles.editIcon}
                      onClick={() => setShowModal(true)}
                    />
                    <div className={styles.profileInfo}>
                      <div className={styles.bio}>
                        <h2>{user.name}</h2>
                        <div className={styles.rightbio}>
                          <img src={user.companylogo} alt={user.company} />
                          <span>{user.company}</span>
                        </div>
                      </div>
                      <p>{bioHeadline}</p>
                      <p className="m-0" style={{ color: "#00000099" }}>
                        {jobTitle}
                      </p>
                      <p style={{ color: "#00000099" }}>{location}</p>
                      <p style={{ color: "blue" }}>
                        {user.connections} Connections
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Analytics Section */}
                <Card className={`mb-3 p-3 mt-3 ${styles.card}`}>
                  <div>
                    <h5>Analytics</h5>
                    <FaEye />
                    <span style={{ fontSize: "14px", color: "#00000099" }}>
                      {" "}
                      Private to you
                    </span>
                  </div>
                  <div className={styles.analyticsContainer}>
                    <div className={styles.analyticsItem}>
                      <FaUserFriends className={styles.analyticsIcon} />
                      <div>
                        <strong>{user.profileview} profile views</strong>
                        <p style={{ color: "#00000099", fontSize: "14px" }}>
                          Discover who's viewed your profile.
                        </p>
                      </div>
                    </div>
                    <div className={styles.analyticsItem}>
                      <FaChartBar className={styles.analyticsIcon} />
                      <div>
                        <strong>{user.postimpressions} post impressions</strong>
                        <p style={{ color: "#00000099", fontSize: "14px" }}>
                          Start a post to increase engagement.
                        </p>
                      </div>
                    </div>
                    <div className={styles.analyticsItem}>
                      <FaSearch className={styles.analyticsIcon} />
                      <div>
                        <strong>
                          {user.searchapperences} search appearances
                        </strong>
                        <p style={{ color: "#00000099", fontSize: "14px" }}>
                          See how often you appear in search results.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* About Section */}
                <Card className={`mb-3 p-3 mt-3 ${styles.card}`}>
                  <Card.Title>About</Card.Title>

                  <p>{bio}</p>
                </Card>

                {/* Activity Section */}
                <Card className={`p-3 mb-3  ${styles.card}`}>
                  <Card.Title className="mb-3">Activity</Card.Title>
                  <CreatePost profileUrl={user.avatar} />
                  <Row>
                    {userPosts.length > 0 ? (
                      userPosts.map((post) => {
                        // Get stored likes from localStorage
                        const storedLikes =
                          JSON.parse(localStorage.getItem("likes")) || {};
                        // Use stored likes if available, otherwise fallback to post.likes
                        const postLikes =
                          storedLikes[post.id] !== undefined
                            ? storedLikes[post.id]
                            : post.likes;

                        return (
                          <Col lg={6} className="mb-3" key={post.id}>
                            <Card>
                              <Card.Body>
                                <div
                                  style={{
                                    color: "#00000099",
                                    fontSize: "14px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  {new Date(post.createdAt).toDateString()}
                                </div>
                                <Card.Text>{post.content}</Card.Text>
                                {post.image && (
                                  <img
                                    src={post.image}
                                    alt="post"
                                    className="img-fluid"
                                  />
                                )}
                                {post.video && (
                                  <video
                                    src={post.video}
                                    controls
                                    className="w-100"
                                  />
                                )}
                                <p className="mt-2">Likes: {postLikes}</p>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })
                    ) : (
                      <div>
                        <p>You haven’t posted yet</p>
                        <p style={{ color: "#00000099" }}>
                          Posts you share will be displayed here.
                        </p>
                      </div>
                    )}
                  </Row>
                </Card>
              </Col>

              {/* Right Sidebar - People You May Know */}
              <Col md={4}>
                <SuggestedConnections
                  connections={connections}
                  handleConnect={handleConnect}
                  currentUsername={username}
                />
              </Col>
            </Row>

            {/* Edit Profile Modal */}
            <Modal
              className={styles.modal}
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>Bio:</label>
                <textarea
                  className="form-control"
                  value={bioHeadline}
                  onChange={(e) => setBioHeadline(e.target.value)}
                  placeholder="Bio"
                />
                <label>Job Title:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                />
                <label>Location:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Job Location"
                />
                <label>About:</label>
                <textarea
                  className="form-control"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="About"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className={styles.savebtn}
                  variant="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
      )}
    </>
  );
};

export default Profile;
