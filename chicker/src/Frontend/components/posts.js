import React, {useState} from 'react';
import "./posts.css";
import like from "../Pictures/like.png";
import liked from "../Pictures/liked.png"
import comment from "../Pictures/comment.png";
import share from "../Pictures/share.png";
import send from "../Pictures/send.png";

import dummy1 from "../Pictures/dummyPictures/dummy (1).png";
import dummy2 from "../Pictures/dummyPictures/dummy (2).png";
import dummy3 from "../Pictures/dummyPictures/dummy (3).png";
import dummy4 from "../Pictures/dummyPictures/dummy (4).png";
import dummy5 from "../Pictures/dummyPictures/dummy (5).png";
import dummy6 from "../Pictures/dummyPictures/dummy (6).png";
import video1 from "../Pictures/dummyPictures/video.mp4";

import profile1 from "../Pictures/dummyPictures/profile (1).jpg";
import profile2 from "../Pictures/dummyPictures/profile (2).jpg";
import profile3 from "../Pictures/dummyPictures/profile (3).jpg";
import profile4 from "../Pictures/dummyPictures/profile (4).jpg";
import profile5 from "../Pictures/dummyPictures/profile (5).jpg";

const posts = [
  {
    postID: 1,
    user: {
      username: 'JohnDoe',
      profilePicture: profile1,
    },
    timestamp: '2 hours ago',
    text: 'This is the first post. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button\'s className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button\'s text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button\'s className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button\'s text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button\'s className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button\'s text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button\'s className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button\'s text color will toggle based on the value of isTextColored.',
    image: dummy1,
    video: null,
    likes: 10,
    comments: 5,
    commentContent: [{image: profile1, commenter: "John", comment: "On 1st post"}, {image: profile2, commenter: "Jack", comment: "1st post. post. dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable."}, {image: profile3, commenter: "Jason", comment: "1st post, fantastic"}],
    shares: 3,
  },
  {
    postID: 2,
    user: {
      username: 'JaneSmith',
      profilePicture: profile2,
    },
    timestamp: '1 day ago',
    text: 'Check out this beautiful view!',
    image: null,
    video: video1,
    likes: 7,
    comments: 2,
    commentContent: [{image: profile1, commenter: "John", comment: "2nd post, Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable."}, {image: profile2, commenter: "Jack", comment: "2nd post, Nice"}],
    shares: 1,
  },
  {
    postID: 3,
    user: {
      username: 'MikeJohnson',
      profilePicture: profile3,
    },
    timestamp: '3 days ago',
    text: 'Just had an amazing meal at the new restaurant!',
    image: null,
    video: null,
    likes: 15,
    comments: 8,
    commentContent: [{image: profile1, commenter: "John", comment: "3rd post, Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable."}, {image: profile2, commenter: "Jack", comment: "3d post, Nice"}, {image: profile3, commenter: "John", comment: "3rd post, Nice"}, {image: profile4, commenter: "Jack", comment: "3rd post, Nice"}],
    shares: 2,
  },
  {
    postID: 4,
    user: {
      username: 'Johnny',
      profilePicture: profile4,
    },
    timestamp: '4 day ago',
    text: 'Check out this beautiful view!',
    image: dummy4,
    video: null,
    likes: 7,
    comments: 2,
    commentContent: [],
    shares: 1,
  },
  {
    postID: 5,
    user: {
      username: 'JamesMcGill',
      profilePicture: profile5,
    },
    timestamp: '8 day ago',
    text: 'Check out this beautiful view!',
    image: dummy5,
    video: null,
    likes: 7,
    comments: 2,
    commentContent: [{image: profile1, commenter: "Jack", comment: "5th post, Nice"}],
    shares: 1,
  },
];

function PostList() {

  const [likeStates, setLikeStates] = useState(posts.map(() => false));
  const [showMore, setShowMore] = useState(false);

  const handleButtonClick = (index) => {
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates);
  };

  const commentPopup = () => {
    const myPopup = document.getElementById('commentPopup');
    myPopup.classList.add('show');
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
              {post.text.length > 1000 ? <span className="see-more-button" onClick={() => setShowMore(!showMore)}>{showMore ? " Show less" : " ...Show more"}</span> : <></>}
            </p>
            {post.image && <img className="post-image" src={post.image} alt="Post Image" />}
            {post.video && <video className="post-image" controls><source src={post.video} type="video/mp4" /></video>}
            <div className="button-container">
              <button id="like" className="post-button" onClick={() => handleButtonClick(index)}>
                {likeStates[index] ? (<img src={liked} alt="Liked" />) : (<img src={like} alt="Like" />)}
                <span className={`post-count ${likeStates[index] ? 'colored' : ''}`}>
                  {likeStates[index] ? post.likes+1 : post.likes}
                </span>
              </button>
              <button className="post-button" onClick={commentPopup}>
                <img src={comment}></img>
                <span className="post-count">{post.comments}</span>
              </button>
              <button className="post-button">
                <img src={share}></img>
                <span className="post-count">{post.shares}</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Comment popup window */}
      <div id="commentPopup" className="commentPopup">
        <div className="allComment">
        <button className="closeButton" id="closeCommentPopup" onClick={closeCommentPopup}>Close</button>
        {/* {posts.map((post, index) => (
          <div className="eachComment">
            <img class="comment-avatar" src={post.commentContent[index]?.image} alt="User Avatar" />
            <div class="comment-content">
              <h4 class="comment-author">{post.commentContent[index]?.commenter}</h4>
              <p class="comment-text">{post.commentContent[index]?.comment}</p>
            </div>
          </div>
        ))} */}

          <div className="eachComment">
            <img class="comment-avatar" src={profile1} alt="User Avatar" />
            <div class="comment-content">
              <h4 class="comment-author">John Doe</h4>
              <p class="comment-text">This is a comment.</p>
            </div>
          </div>
          <div className="eachComment">
            <img class="comment-avatar" src={profile2} alt="User Avatar" />
            <div class="comment-content">
              <h4 class="comment-author">John Eve</h4>
              <p class="comment-text">Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable.</p>
            </div>
          </div>
          <div className="eachComment">
            <img class="comment-avatar" src={profile3} alt="User Avatar" />
            <div class="comment-content">
              <h4 class="comment-author">Peter Doe</h4>
              <p class="comment-text">This is a comment.</p>
            </div>
          </div>
          <div class="enterComment">
            <textarea class="enterCommentText"placeholder="Post your comment"></textarea>
            <img class="sendIcon" src={send}></img>
          </div>

        </div>
      </div>

    </div>
  );
}

export default PostList;