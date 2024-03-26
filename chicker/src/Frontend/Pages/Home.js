import "./Home.css";
import Sidebar from '../components/sidebar.js';
import PostList from '../components/posts.js';


export default function Home() {
  return (
    <div className="Home">
    <Sidebar className="SideBar" />
    <div className="grid-container">
      <PostList />
    </div>
    </div>
  );
}
