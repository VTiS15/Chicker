import "./posts.css";
import React, { useState, useRef, useEffect } from "react";
import like from "../Pictures/like.png";
import liked from "../Pictures/liked.png";
import comment from "../Pictures/comment.png";
import share from "../Pictures/share.png";
import send from "../Pictures/send.png";
import profile5 from "../Pictures/dummyPictures/profile (5).jpg";

import { getUserLogin } from "../Pages/LoginPage";
import { post } from "../functions/dummyPosts";
const posts = post;
const date = new Date();

function CommentPopup({ post, onClose }) {
  const [text, setText] = useState('');
  const commentSectionRef = useRef(null);

  const [commentHistory, setCommentHistory] = useState(post.commentContent);
  const handleSend = () => {
    const comment = document.getElementById('textArea').value;
    post.commentContent.unshift({ image: profile5, commenter: "Yuden", comment: comment });
    setCommentHistory([...commentHistory, {}]);
    setText('');
  };

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
    }
  }, []);

  return (
    <div id="commentPopup" className="commentPopup">
      <div className="allComment" ref={commentSectionRef}>
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
        <div className="Comments">
          {post.commentContent.map((comment, index) => (
            <div key={index} className="eachComment">
              <img
                class="comment-avatar"
                src={comment.image}
                alt="User Avatar"
              />
              <div class="comment-content">
                <h4 class="comment-author">{comment.commenter}</h4>
                <p class="comment-text">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div class="enterComment">
          <textarea
            class="enterCommentText"
            placeholder="Post your comment"
            id="textArea"
            value={text} onChange={(e) => setText(e.target.value)}
          ></textarea>
          <img class="sendIcon" src={send} onClick={handleSend}></img>
        </div>
      </div>
    </div>
  );
}

function SharePopup({ selectedPost, onClose }) { 
  const [showMore, setShowMore] = useState(false);
  const [text, setText] = useState('');

  const handleSend = () => {
    const repostText = document.getElementById('repostText').value;
    if (repostText) {
      posts.unshift({
        postID: posts.length + 1,
        user: {
          username: "Yuden",
          profilePicture: profile5,
        },
        timestamp: date.toLocaleTimeString(),
        text: repostText + "\n\nBy @" + selectedPost.user.username + "\n" + selectedPost.text,
        image: selectedPost.image,
        video: selectedPost.video,
        likes: 0,
        comments: 0,
        commentContent: [],
        shares: 0,
      });
      setText('');
      selectedPost.shares = selectedPost.shares + 1;
      onClose();
    } else {
      alert("Share something before repost");
    }
  };

  return (
    <div id="sharePopup" className="commentPopup">
      <div className="SharePopupInner">
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
        <div className="Comments">
          <div key={selectedPost.postID} className="post">
            <div className="user-info">
              <div className="IconAndName">
                <img src={selectedPost.user.profilePicture} alt="Profile Picture" />
                <span className="username">{selectedPost.user.username}</span>
              </div>
              <span className="timestamp">{selectedPost.timestamp}</span>
            </div>
            <div className="content">
              <p className="post-text">
                {selectedPost.text.length > 1000 && showMore
                  ? selectedPost.text
                  : `${selectedPost.text.substring(0, 100)}`}
                {selectedPost.text.length > 1000 ? (
                  <span
                    className="see-more-button"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? " Show less" : " ...Show more"}
                  </span>
                ) : (
                  <></>
                )}
              </p>
              {selectedPost.image && (
                <img
                  className="post-image"
                  src={selectedPost.image}
                  alt="Post Image"
                  style={{ maxWidth: "100%" }}
                />
              )}
              {selectedPost.video && (
                <video className="post-video" controls>
                  <source src={selectedPost.video} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
        <div class="enterComment">
          <textarea
            class="enterCommentText"
            placeholder="Repost with your thoughts"
            id="repostText"
            value={text} onChange={(e) => setText(e.target.value)}
          ></textarea>
          <img class="sendIcon" src={send} onClick={handleSend}></img>
        </div>
      </div>
    </div>
  );
}

function PostList({ posts }) {
  const isLoggedIn = getUserLogin();
  const [likeStates, setLikeStates] = useState(posts.map(() => false));
  const [showMore, setShowMore] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post for comments
  const [zoomIn, setZoomIn] = useState(false);
  const [isCommentPopupOpen, setCommentPopupOpen] = useState(false);
  const [isSharePopupOpen, setSharePopupOpen] = useState(false);

  const handleImageClick = () => {
    if (zoomIn === false) {
      setZoomIn(true);
    } else {
      setZoomIn(false);
    }
  };

  const handleButtonClick = (index) => {
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates);
  };

  const openCommentPopup = (post) => {
    setSelectedPost(post);
    const myPopup = document.getElementById("commentPopup");
    if (myPopup) {
      myPopup.classList.add("show");
    }
    setCommentPopupOpen(true);
  };
  const closeCommentPopup = () => {
    const myPopup = document.getElementById("commentPopup");
    myPopup.classList.remove("show");
    setCommentPopupOpen(false);
  };
  
  const openSharePopup = (post) => {
    setSelectedPost(post);
    const myPopup = document.getElementById("sharePopup");
    if (myPopup) {
      myPopup.classList.add("show");
    }
    setSharePopupOpen(true);
  };
  const closeSharePopup = () => {
    const myPopup = document.getElementById("sharePopup");
    myPopup.classList.remove("show");
    setSharePopupOpen(false);
  };

  return (
    <div className="grid-item">
      {posts.map((post, index) => (
        <div key={post.postID} className="post">
          <div className="user-info">
            <div className="IconAndName">
              <img src={post.user.profilePicture} alt="Profile Picture" />
              <span className="username">{post.user.username}</span>
            </div>
            <span className="timestamp">{post.timestamp}</span>
          </div>
          <div className="content">
            <p  style={{ whiteSpace: "pre-line" }} className="post-text">
              {post.text.length > 1000 && showMore
                ? post.text
                : `${post.text.substring(0, 500)}`}
              {post.text.length > 1000 ? (
                <span
                  className="see-more-button"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? " Show less" : " ...Show more"}
                </span>
              ) : (
                <></>
              )}
            </p>
            {post.image && (
              <img
                className="post-image"
                src={post.image}
                alt="Post Image"
                onClick={handleImageClick}
                style={zoomIn ? { maxWidth: "100%" } : { maxWidth: "20%" }}
              />
            )}
            {post.video && (
              <video className="post-video" controls>
                <source src={post.video} type="video/mp4" />
              </video>
            )}
            <div className="button-container">
              <button
                id="like"
                className="post-button"
                onClick={() => handleButtonClick(index)}
                style={isLoggedIn ? {} : { cursor: "not-allowed" }}
                disabled={!isLoggedIn}
              >
                {likeStates[index] ? (
                  <img src={liked} alt="Liked" />
                ) : (
                  <img src={like} alt="Like" />
                )}
                <span
                  className={`post-count ${likeStates[index] ? "colored" : ""}`}
                >
                  {likeStates[index] ? post.likes + 1 : post.likes}
                </span>
              </button>
              <button
                className="post-button"
                onClick={() => openCommentPopup(post)} // Pass the post to openCommentPopup
                style={isLoggedIn ? {} : { cursor: "not-allowed" }}
                disabled={!isLoggedIn}
              >
                <img src={comment} alt="Comment" />
                <span className="post-count">{post.commentContent.length}</span>
              </button>
              <button
                className="post-button"
                onClick={() => openSharePopup(post)}
                style={isLoggedIn ? {} : { cursor: "not-allowed" }}
                disabled={!isLoggedIn}
              >
                <img src={share} alt="Share" />
                <span className="post-count">{post.shares}</span>
              </button>
            </div>
          </div>
          {selectedPost && (
            <CommentPopup post={selectedPost} onClose={closeCommentPopup} />
          )}
          {selectedPost && (
            <SharePopup selectedPost={selectedPost} onClose={closeSharePopup} />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
