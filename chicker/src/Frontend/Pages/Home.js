import "./Home.css";
import Sidebar from '../components/sidebar.js';
import PostList from '../components/posts.js';
import image from "../Pictures/image.png";
import video from "../Pictures/video.png";

export default function Home() {
  return (
    <div className="Home">
    <Sidebar className="SideBar" />
    <div className="grid-container">
      <div className="newPost">
        <div className="title">Share something?!</div>
        <textarea className="newPostText" cols="1"></textarea>
        <div class="button-container">
          <button class="left-button">
            <img src={image}></img>
          </button>
          <button class="left-button">
            <img src={video}></img>
          </button>
          <button class="right-button">
            Post
          </button>
        </div>
      </div>
      <PostList />
    </div>
    </div>
  );
}
