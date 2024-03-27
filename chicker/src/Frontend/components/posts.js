import React, {useState} from 'react';
import "./posts.css";
import like from "../Pictures/like.png";
import liked from "../Pictures/liked.png"
import comment from "../Pictures/comment.png";
import share from "../Pictures/share.png";

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
    commentContent: [{commenter: "John", comment: "Nice"}, {commenter: "Jack", comment: "Nice"}, {commenter: "Jason", comment: "Fantastic"}],
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
    commentContent: [{commenter: "John", comment: "Nice"}, {commenter: "Jason", comment: "Fantastic"}],
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
    commentContent: [{commenter: "John", comment: "Nice"}, {commenter: "Jack", comment: "Nice"}, {commenter: "Jason", comment: "Fantastic"}],
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
    commentContent: [{commenter: "Jack", comment: "Nice"}, {commenter: "Jason", comment: "Fantastic"}],
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
    commentContent: [{commenter: "John", comment: "Nice"}, {commenter: "Jack", comment: "Nice"}],
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
              <button className="post-button">
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
    </div>
  );
}

export default PostList;