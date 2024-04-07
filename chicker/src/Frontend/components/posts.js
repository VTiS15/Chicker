import React, { useState, useRef, useEffect } from 'react';
import './posts.css';
import like from '../Pictures/like.png';
import liked from '../Pictures/liked.png';
import comment from '../Pictures/comment.png';
import share from '../Pictures/share.png';
import send from "../Pictures/send.png";

function CommentPopup({ post, onClose }) {
    const commentSectionRef = useRef(null);

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
              <img class="comment-avatar" src={comment.image} alt="User Avatar" />
              <div class="comment-content">
                <h4 class="comment-author">{comment.commenter}</h4>
                <p class="comment-text">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div class="enterComment">
          <textarea class="enterCommentText"placeholder="Post your comment"></textarea>
          <img class="sendIcon" src={send}></img>
        </div>
      </div>
    </div>
  );
}

function PostList( {posts} ) {
  const [likeStates, setLikeStates] = useState(posts.map(() => false));
  const [showMore, setShowMore] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post for comments

  const handleButtonClick = (index) => {
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates);
  };

  const openCommentPopup = (post) => {
    setSelectedPost(post);
    const myPopup = document.getElementById('commentPopup');
    if (myPopup) {
      myPopup.classList.add('show');
    }
  };
  const closeCommentPopup = () => {
    const myPopup = document.getElementById('commentPopup');
    myPopup.classList.remove('show');
  };
  window.addEventListener('click', (event) => {
    const myPopup = document.getElementById('commentPopup');
    if (event.target === myPopup) {
      myPopup.classList.remove('show');
    }
  });

  return (
    <div className="grid-item">
      {posts.map((post, index) => (
        <div key={post.postID} className="post">
          <div className="user-info">
            <img src={post.user.profilePicture} alt="Profile Picture" />
            <span className="username">{post.user.username}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
          <div className="content">
            <p className="post-text">
              {post.text.length > 1000 && showMore ? post.text : `${post.text.substring(0, 500)}`}
              {post.text.length > 1000 ? (
                <span className="see-more-button" onClick={() => setShowMore(!showMore)}>
                  {showMore ? ' Show less' : ' ...Show more'}
                </span>
              ) : (
                <></>
              )}
            </p>
            {post.image && <img className="post-image" src={post.image} alt="Post Image" />}
            {post.video && (
              <video className="post-image" controls>
                <source src={post.video} type="video/mp4" />
              </video>
            )}
            <div className="button-container">
              <button id="like" className="post-button" onClick={() => handleButtonClick(index)}>
                {likeStates[index] ? <img src={liked} alt="Liked" /> : <img src={like} alt="Like" />}
                <span className={`post-count ${likeStates[index] ? 'colored' : ''}`}>
                  {likeStates[index] ? post.likes + 1 : post.likes}
                </span>
              </button>
              <button
                className="post-button"
                onClick={() => openCommentPopup(post)} // Pass the post to openCommentPopup
              >
                <img src={comment} alt="Comment" />
                <span className="post-count">{post.comments}</span>
              </button>
              <button className="post-button">
                <img src={share} alt="Share" />
                <span className="post-count">{post.shares}</span>
              </button>
            </div>
          </div>
          {selectedPost && (
            <CommentPopup post={selectedPost} onClose={closeCommentPopup} />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;