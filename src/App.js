import Home from "./components/Home/Home";
import Page2 from "./components/Page2/Page2";
import Page3 from "./components/Page3/Page3";

import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import PriceCard from "./components/PriceCard/PriceCard";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import ResetPassword from "./components/Login/ResetPassword";
import SetPassword from "./components/Login/SetPassword";

export const FileContextManager = createContext();

function App() {
  const [getMainFile, setMainFile] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);

  return (
    <FileContextManager.Provider
      value={[
        getMainFile,
        setMainFile,
        fileInfo,
        setFileInfo,
        getAfterBeforeImg,
        setAfterBeforeImg,
      ]}
    >
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Navigation />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/price" element={<PriceCard />} />
          <Route path="/file-uploads" element={<Page2 />} />
          <Route path="/processed-img" element={<Page3 />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Routes>
      </div>
    </FileContextManager.Provider>
  );
}

export default App;
