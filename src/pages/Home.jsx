import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigationbar from "../components/Navigationbar";
import CreatePost from "../components/CreatePosts";
import SuggestedConnections from "../components/SuggestedConnections";
import { Modal, Button, Spinner } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import postsData from "../data/posts.json";
import usersData from "../data/users.json";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likes")) || {};
    } catch {
      return {};
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [connections, setConnections] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("connections")) || {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
      let updatedLikes = {};

      postsData.forEach((post) => {
        updatedLikes[post.id] = storedLikes[post.id] || post.likes;
      });

      setLikes(updatedLikes);
      setPosts(postsData);
      setLoading(false);
    }, 300);
  }, []);

  const handleLike = (postId) => {
    let storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    let updatedLikes = { ...likes };

    if (storedLikes[postId]) {
      
      updatedLikes[postId] = Math.max(
        (updatedLikes[postId] ||
          posts.find((p) => p.id === postId)?.likes ||
          0) - 1,
        0
      );
      delete storedLikes[postId];
    } else {
     
      updatedLikes[postId] =
        (updatedLikes[postId] ||
          posts.find((p) => p.id === postId)?.likes ||
          0) + 1;
      storedLikes[postId] = updatedLikes[postId]; 
    }

    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(storedLikes));
  };
  const handleAddComment = () => {
    if (commentText.trim() !== "" && selectedPost) {
      const newComment = {
        id: `comment-${Date.now()}`,
        userId: "user-you",
        content: commentText,
        createdAt: new Date().toISOString(),
      };

      let storedComments = {};
      try {
        storedComments = JSON.parse(localStorage.getItem("comments")) || {};
      } catch (error) {
        storedComments = {};
      }

      
      const existingPostComments = selectedPost.comments || [];
      const savedComments = storedComments[selectedPost.id] || [];

     
      const allComments = [
        ...existingPostComments,
        ...savedComments,
        newComment,
      ];
      const uniqueComments = allComments.filter(
        (comment, index, self) =>
          index === self.findIndex((c) => c.id === comment.id)
      );

      // 🔹 Update localStorage
      storedComments[selectedPost.id] = uniqueComments;
      localStorage.setItem("comments", JSON.stringify(storedComments));

      // 🔹 Update UI immediately
      setCurrentComments(uniqueComments);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, comments: uniqueComments } 
            : post
        )
      );

      setCommentText(""); 
    }
  };
  const handleCommentClick = (post) => {
    setSelectedPost(post);

    let storedComments = {};
    try {
      storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    } catch (error) {
      storedComments = {};
    }

    const existingComments = post.comments || [];
    const savedComments = storedComments[post.id] || [];

    // 🔹 Ensure only unique comments are stored
    const mergedComments = [...existingComments, ...savedComments].filter(
      (comment, index, self) =>
        index === self.findIndex((c) => c.id === comment.id)
    );

    setCurrentComments(mergedComments);
    setShowModal(true);
  };

  const getCommentCount = (post) => {
    try {
      const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
      return storedComments[post.id]
        ? storedComments[post.id].length // Get from localStorage if available
        : post.comments.length; // Otherwise, get from posts.json
    } catch (error) {
      console.error("Error reading comments from localStorage", error);
      return post.comments.length; // Fallback to posts.json data
    }
  };
  const handleConnect = (userId) => {
    let storedConnections;
    try {
      storedConnections = JSON.parse(localStorage.getItem("connections"));
      if (!Array.isArray(storedConnections)) {
        storedConnections = [];
      }
    } catch (error) {
      storedConnections = [];
    }

    // Find full user object
    const user = usersData.find((u) => u.id === userId);
    if (!user) return; // Exit if user not found

    // Check if the user is already connected
    const isConnected = storedConnections.some((conn) => conn.id === user.id);
    if (!isConnected) {
      const updatedConnections = [...storedConnections, user];
      localStorage.setItem("connections", JSON.stringify(updatedConnections));
      setConnections(updatedConnections);
    }
  };

  const getUser = (userId) => usersData.find((user) => user.id === userId);

  return (
    <>
      <Navigationbar />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" style={{ marginTop: "200px" }} />
          <p>Loading</p>
        </div>  
      ) : (
        <div>
          <div className={styles.container}>
            <div className={`row ${styles.row}`}>
              {/* Left Section - Posts */}

              <div className="col-md-8">
                <CreatePost profileUrl="https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg" />
                {posts.filter((post) => {
                  const user = getUser(post.userId);
                  return (
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (user && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  );
                }).length === 0 ? (
                  <div className={`text-center ${styles.postCard} minHeight`}>
                    No posts match the search.
                  </div>
                ) : (
                  posts
                    .filter((post) => {
                      const user = getUser(post.userId);
                      return (
                        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (user && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      );
                    })
                    .map((post) => {
                      const user = getUser(post.userId);
                      return (
                        <div key={post.id} className={styles.postCard}>
                          <div className={styles.postHeader}>
                            <img
                              src={user?.avatar}
                              alt={user?.name}
                              className={styles.postAvatar}
                            />
                            <div>
                              <div className={styles.postUser}>
                                {user?.name}
                              </div>
                              <div className={styles.postTimestamp}>
                                {new Date(post.createdAt).toDateString()}
                              </div>
                            </div>
                          </div>
                          <div className={styles.postContent}>
                            {post.content}
                          </div>
                          {post.image && (
                            <img
                              src={post.image}
                              alt="Post"
                              className={styles.postImage}
                            />
                          )}
                          {post.video && (
                            <video controls className={styles.postImage}>
                              <source src={post.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <div className={styles.postActions}>
                            <button onClick={() => handleLike(post.id)}>
                              <FaThumbsUp
                                className={styles.actionButton}
                                color={
                                  localStorage.getItem("likes") &&
                                  JSON.parse(localStorage.getItem("likes"))[
                                    post.id
                                  ]
                                    ? "blue"
                                    : "gray"
                                }
                              />{" "}
                              {likes[post.id] || post.likes} Likes
                            </button>

                            <button onClick={() => handleCommentClick(post)}>
                              <FaComment className={styles.actionButton} />{" "}
                              {getCommentCount(post)} Comments
                            </button>

                            <button>
                              <FaShare className={styles.actionButton} /> Share
                            </button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              {/* Right Section - People You May Know */}

              <div className="col-md-4">
                <SuggestedConnections
                  connections={connections}
                  handleConnect={handleConnect}
                />
              </div>
            </div>
          </div>

          {/* Comment Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            className={styles.modalDialog}
            centered
          >
            <Modal.Header closeButton className={styles.modalHeader}>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.commentContainer}>
                {currentComments.length > 0 ? (
                  currentComments.map((comment, index) => {
                    const user =
                      comment.userId === "user-you"
                        ? {
                            name: "You",
                            avatar:
                              "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
                          }
                        : getUser(comment.userId) || {
                            name: "Unknown User",
                            avatar: "",
                          };

                    return (
                      <div key={index} className={styles.commentItem}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className={styles.commentAvatar}
                        />
                        <div>
                          <strong className={styles.commentUser}>
                            {user.name}
                          </strong>
                          <span className={styles.commentDate}>
                            {" "}
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          <p className={styles.commentText}>
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>

              <textarea
                className={styles.commentInput}
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
              <Button
                className={styles.postbtn}
                variant="primary"
                onClick={handleAddComment}
              >
                Post Comment
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Home;
