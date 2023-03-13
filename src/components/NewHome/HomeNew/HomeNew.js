import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContextManager } from "../../../App";
import Loading from "../../Loading/Loading";
import Services from "../../NewService/Services/Services";
import "./style.css";

const Home = () => {

  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu] = useContext(OrderContextManager); 
  
  return (
    <div id="home">
      <div className=" container m-auto ">
        <div className="home_right">
          <h2>AI-Professionals Collaboration</h2>
          {getMenu.map(data=>
            data.type == "upload" &&
                <Link onClick={()=>setMenuId(data.id)} to={data.url}>
                <button>Get Started</button>
              </Link>
            )}
        </div>
      </div>
      <Loading></Loading>
      <Services></Services>
    </div>
  );
};

export default Home;
