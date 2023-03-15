import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContextManager } from "../../../App";
import Loading from "../../Loading/Loading";
import Services from "../../NewService/Services/Services";
import Service_2 from "../../NewService/Service_2";
import video from "../VideoViewer/Video/demo.mp4";
import "./style.css";

const Home = () => {
  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu] =
    useContext(OrderContextManager);

  return (
    <div id="home">
      <div className=" container m-auto ">
        <div className="home_right flex">
          <div>
            <video
              className="mt-0 ml-10 mb-20"
              width="55%"
              height="450"
              controls
              autoPlay
              muted
              loop
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div>
            {" "}
            <h2>AI-Professionals Collaboration</h2>
            {getMenu.map(
              (data) =>
                data.type == "upload" && (
                  <Link onClick={() => setMenuId(data.id)} to={data.url}>
                    <button>Get Started</button>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <Loading></Loading>
      <Services></Services>
      <Service_2></Service_2>
    </div>
  );
};

export default Home;
