import "./Home.css";
import Sidebar from '../components/sidebar.js';

export default function Home() {
  return (
    <div className="Home">
    <Sidebar className="SideBar" />
    <div className="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>  
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>  
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div> 
    </div>
    </div>
  );
}
