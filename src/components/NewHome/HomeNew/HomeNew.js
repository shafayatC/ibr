import { useContext } from "react";
import { Link } from "react-router-dom";
import { menuContextManager, OrderContextManager } from "../../../App";
import Loading from "../../Loading/Loading";
import Services from "../../NewService/Services/Services";
import Service_2 from "../../NewService/Service_2";
import video from "../VideoViewer/Video/demo.mp4";
import applelogo from "../HomeNew/img/apple_logo.png";
import googlelogo from "../HomeNew/img/google_logo.png";
import box from "../../NewService/Services/img/box.png";
import x from "../../NewService/Services/img/x.png";
import o from "../../NewService/Services/img/o.png";
import control from "../../NewService/Services/img/control.png";

import "./style.css";
import Loading_2 from "../../Loading/Loading_2";

const Home = () => {
  const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)

  return (
    <div id="home">
      <div className=" container m-auto ">
        <div className="home_right flex">
          <div>
            <p className="text-white font-bold text-7xl text-left ml-10 mb-4">IMAGE EDITING <br></br>SERVICES</p>
            {/* <h2>Services</h2> */}
            <video
              className="mt-0 ml-10 mb-10"
              width="65%"
              height="450"
              controls
              autoPlay
              muted
              loop
            >
              <source src={video} type="video/mp4" />
            </video>
            <div className="flex ml-10">
              <img className="h-20 w-52 mr-2" src={applelogo} alt="" />
              <img className="h-16 w-40 mt-2" src={googlelogo} alt="" />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-3xl text-left mt-28  mb-4">AI-PROFESSIONALS COLLABORATION </p>

            {getMenu.map(
              (data, index) =>
                data.type == "upload" && (
                  <Link key={index} onClick={() => setMenuId(data.id)} to={data.url}>
                    <button>Get Started</button>
                  </Link>
                )
            )}
            <div className="w-[650px]">

              <p className="mt-16 mb-6 text-white font-bold text-4xl">
                SERVICES
              </p>
              <div className="grid grid-cols-5  justify-items-center gap-5">
                <div  >
                  <img className="h-12 w-12  " src={box} alt="" />
                  <p className="text-white text-xs">Photo Retouch</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={x} alt="" />
                  <p className="text-white text-xs">Ghost Mannequin</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={o} alt="" />
                  <p className="text-white text-xs">Image Beautification</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={control} alt="" />
                  <p className="text-white text-xs">Shadow Creation</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={box} alt="" />
                  <p className="text-white text-xs">Image Masking</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={o} alt="" />
                  <p className="text-white text-xs">Image Resizing</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={x} alt="" />
                  <p className="text-white text-xs">Photo Restoration</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={x} alt="" />
                  <p className="text-white text-xs">Background Removal</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={x} alt="" />
                  <p className="text-white text-xs">Objects Removal</p>
                </div>
                <div>
                  <img className="h-12 w-12 " src={x} alt="" />
                  <p className="text-white text-xs">Color Correction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Loading></Loading>
      <Services></Services>
      <Service_2></Service_2> */}
    </div>
  );
};

export default Home;
