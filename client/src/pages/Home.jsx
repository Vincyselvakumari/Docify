import "./Pages.css"; 
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
     <div className="contents"> <h1>Welcome to Docify</h1>
      <p>Keep Track of Everything</p>
      <Link to="/register" className="btn-start">Get Started</Link></div>
    </div>
  );
};

export default Home;