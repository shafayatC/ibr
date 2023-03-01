import Navbar from "../Home/Navbar/Navbar";
import Leftsidebar from "../Page2/Left-sidebar/Leftsidebar";
import Rightsidebar from "../Page2/Right-sidebar/Rightsidebar";
import UpdatedImage from "./UpdatedImage";

const Page3 = () => {
  return (
    <>
      <Navbar />
      <div className="grid sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-1">
        <div className="...">
          <Leftsidebar />
        </div>

        <div className="col-span-3 ...">
          <UpdatedImage />
        </div>
        <div className="...">
          <Rightsidebar />
        </div>
      </div>
    </>
  );
};

export default Page3;
