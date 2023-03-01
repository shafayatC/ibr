import Navbar from "../Home/Navbar/Navbar";
import Footer from "./Footer";
import Imageupload from "./Imageupload/Imageupload";
import Leftsidebar from "./Left-sidebar/Leftsidebar";
import Rightsidebar from "./Right-sidebar/Rightsidebar";
import "./style.css";

function Page2() {
  return (
    <div className="Page2 bg-gray-shade">
      <Navbar />
      <div className="pageContent_wrap grid grid-cols-1 md:grid-cols-5 lg:grid-cols-8 gap-1">
        <div className="leftSideBarWrap">
          <Leftsidebar />
        </div>

        <div className="md:col-span-3 lg:col-span-6  leftSideBarWrap">
          <Imageupload />
          {/* <Footer /> */}
        </div>
        <div className="leftSideBarWrap">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}

export default Page2;
