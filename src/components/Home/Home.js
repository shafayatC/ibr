// import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import NewHome from "../NewHome/HomeNew/HomeNew";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <NewHome></NewHome>

      {/* <Banner/> */}
    </div>
  );
}

export default Home;
