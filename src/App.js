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
import ResetPasswordForm from "./components/Login/ResetPasswordForm";
import Navbar from "./components/Home/Navbar/Navbar";
import QuestionAnswer from "./components/QuestionAnswer/QuestionAnswer";

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
        <Navbar></Navbar>
        <Routes>
          {/* <Route path="/" element={<Navigation />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/price" element={<PriceCard />} />
          <Route path="/file-uploads" element={<Page2 />} />
          <Route path="/processed-img" element={<Page3 />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/resetpasswordform/" element={<ResetPasswordForm />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/newuserconfirmation/:token" element={<SetPassword />} />
          <Route path="/question-answer" element={<QuestionAnswer />} />
        </Routes>
      </div>
    </FileContextManager.Provider>
  );
}

export default App;
