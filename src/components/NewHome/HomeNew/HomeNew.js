import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import Services from "../../NewService/Services/Services";
import "./style.css";

const Home = () => {
  return (
    <div id="home">
      <div className=" container m-auto ">
        <div className="home_right">
          <h3>START HERE</h3>
          <h2>AI-Professionals Collaboration</h2>
          <Link to="/file-uploads">
            <button>UPLOAD</button>
          </Link>
        </div>
      </div>
      <Loading></Loading>
      <Services></Services>
    </div>
  );
};

export default Home;
