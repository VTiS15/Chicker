import { useState, useRef } from "react";

import "./Home.css";
import Sidebar from "../components/sidebar.js";
import PostList from "../components/posts.js";
import image from "../Pictures/image.png";
import video from "../Pictures/video.png";
import { getStyling } from "../functions/style.js";
import { getUserLogin } from "./LoginPage.js";
import { post } from "../functions/dummyPosts.js";

import profilepic from "../Pictures/UserNeedLogin.jpeg";

const posts = post;
const styling = getStyling();
const commentsOfEachPost = posts.map((post) => post.comments);

export default function Home() {
  const isLoggedIn = getUserLogin();
  const [postText, setPostText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [fileType, setFileType] = useState("");
  const date = new Date();
  const photoInputRef = useRef();

  const handleClickImage = () => {
    photoInputRef.current.click();
    setFileType("image/png, image/jpg, image/jpeg");
  };

  const handleClickVideo = () => {
    photoInputRef.current.click();
    setFileType("video/mp4");
  };

  const handleUplaod = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleClear = () => {
    setPostText("");
    setUploadedImage(null);
    setUploadedVideo(null);
  };

  const handleSubmit = (Text, image, video) => {
    if (Text || image || video) {
      posts.unshift({
        postID: posts.length + 1,
        user: {
          username: "JC",
          profilePicture: profilepic,
        },
        timestamp: date.toLocaleTimeString(),
        text: Text,
        image: image,
        video: video,
        likes: 0,
        comments: 0,
        commentContent: [],
        shares: 0,
      });
      handleClear();
    } else {
      alert("Say something before sending it out");
    }
  };

  return (
    <div className="Home" style={{ styling }}>
      <Sidebar />
      <div className="grid-container">
        {isLoggedIn ? (
          <div className="newPost">
            <div className="title">Share something?!</div>
            <textarea
              className="newPostText"
              cols="1"
              placeholder="write something..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            {(uploadedImage || uploadedVideo) && (
              <img
                style={{ maxWidth: "20%", borderRadius: "12px" }}
                src={uploadedImage}
              />
            )}
            <div class="button-container">
              <input
                type="file"
                accept={fileType}
                ref={photoInputRef}
                onChange={handleUplaod}
                style={{ display: "none" }}
              />
              <button class="left-button" onClick={handleClickImage}>
                <img src={image} />
              </button>

              <button class="left-button" onClick={handleClickVideo}>
                <img src={video} />
              </button>

              {(postText || uploadedImage || uploadedVideo) && (
                <button
                  onClick={() => handleClear()}
                  style={{
                    background: "transparent",
                    cursor: "pointer",
                    padding: "4px",
                    margin: "4px",
                    borderRadius: "12px",
                  }}
                  className="left-button"
                >
                  clear
                </button>
              )}
              <button
                class="right-button"
                onClick={() =>
                  handleSubmit(postText, uploadedImage, uploadedVideo)
                }
              >
                Post
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <PostList posts={posts} comments={commentsOfEachPost} />
      </div>
    </div>
  );
}
