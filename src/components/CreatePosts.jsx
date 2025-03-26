import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "../styles/CreatePost.module.css";
import { FaImage, FaVideo, FaNewspaper,FaPaperclip } from "react-icons/fa";

const CreatePost = ({profileUrl}) => {
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePost = () => {
    alert("Post has been published!");
    setPostContent("");
    setFile(null);
    setShowModal(false);
  };

  return (
    <div className={styles.createPost}>
      {/* Post Input Area */}
      <div className={styles.postInput} onClick={() => setShowModal(true)}>
        <div className={styles.postInputTop}> 
        <img
          src={profileUrl}
          alt="User"
          className={styles.userAvatar}
        />
        <input type="text" placeholder="Start a post" readOnly />
        </div>
      
      <div className={styles.uploadButtons}>
            <label className={styles.uploadButton}>
              <FaImage className={styles.mypostBtn} style={{color:"blue", fontSize:"20px"}}/> Photo
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            <label className={styles.uploadButton}>
            <FaVideo className={styles.mypostBtn} style={{color:"green",fontSize:"20px"}}/> Video
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </label>

            <label className={styles.uploadButton}>
            <FaNewspaper className={styles.mypostBtn} style={{color:"red",fontSize:"20px"}}/> Write Article
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </label>
          </div>
          </div>
      {/* Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            rows="4"
            placeholder="What do you want to talk about?"
            className={styles.postTextarea}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {/* File Upload */}
          {file && (
            <div className={styles.filePreview}>
              <p><FaPaperclip/> {file.name}</p>
            </div>
          )}

<div className={styles.uploadButtons}>
            <label className={styles.uploadButton}>
              <FaImage className={styles.mypostBtn} style={{color:"blue", fontSize:"20px"}}/> Photo
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            <label className={styles.uploadButton}>
            <FaVideo className={styles.mypostBtn} style={{color:"green",fontSize:"20px"}}/> Video
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </label>

            <label className={styles.uploadButton}>
            <FaNewspaper className={styles.mypostBtn} style={{color:"red",fontSize:"20px"}}/> Write Article
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          
          <button
            className={styles.postButton}
            onClick={handlePost}
            disabled={!postContent.trim() && !file}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
