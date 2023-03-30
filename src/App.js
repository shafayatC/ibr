import Home from "./components/Home/Home";
import Page2 from "./components/Page2/Page2";
import Page3 from "./components/Page3/Page3";

import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import PriceCard from "./components/PriceCard/PriceCard";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import ResetPassword from "./components/Login/ResetPassword";
import SetPassword from "./components/Login/SetPassword";
import ResetPasswordForm from "./components/Login/ResetPasswordForm";
import Navbar from "./components/Home/Navbar/Navbar";
import QuestionAnswer from "./components/QuestionAnswer/QuestionAnswer";
import MatchSort from "./components/MatchSort/MatchSort";
import UpgradeAccount from "./components/UpgradeAccount/UpgradeAccount";
import InitialDataLoad from "./components/InitialDataLoad/InitialDataLoad";
import CouponCode from "./components/CouponCode/CouponCode";
import CompareImage from "./components/CompareImage/CompareImage";
import CostBreakDown from "./components/CostBreakDown/CostBreakDown";
import Imageupload from "./components/Page2/Imageupload/Imageupload";
import Cart from "./components/Cart/Cart";

export const FileContextManager = createContext();
export const OrderContextManager = createContext();
export const userContextManager = createContext();

function App() {
  const [getMainFile, setMainFile] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);
  const [getImageData, setImageData] = useState()
  const [getMenuId, setMenuId] = useState("")
  const [getLockMenuBool, setLockMenuBool] = useState(false);
  const [getServiceTypeId, setServiceTypeId] = useState("")
  const [getMenu, setMenu] = useState([]);
  const [getUserInfo, setUserInfo] = useState({});
  const [getToken, setToken] = useState("p_k_hKqzczG8QEAdqdy0h5OMOO0ngQ4nawou");
  const [getModelBaseUrl, setModelBaseUrl] = useState("");
  const [getOrderMasterId, setOrderMasterId] = useState("");
  const [getSubscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [actionStatus, setActionStatus] = useState("");
  const [getProccessImgIndex, setProccessImgIndex] = useState(0)
  const [getCostDetails, setCostDetails] = useState({})


  return (
    <FileContextManager.Provider
      value={[
        getMainFile,
        setMainFile,
        fileInfo,
        setFileInfo,
        getAfterBeforeImg,
        setAfterBeforeImg,
        getLockMenuBool,
        setLockMenuBool,
        getImageData,
        setImageData,
        actionStatus,
        setActionStatus,
        getProccessImgIndex,
        setProccessImgIndex
      ]}
    >
      <OrderContextManager.Provider value={[getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails]}>
        <userContextManager.Provider value={[getUserInfo, setUserInfo, getToken, setToken]}>
          <div className="App">
            <InitialDataLoad />
            <Navbar items={getMenu}></Navbar>
            <Routes>
              {/* <Route path="/" element={<Navigation />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/price" element={<PriceCard />} />
              <Route path="/file-uploads" element={<Imageupload />} />
              <Route path="/processed-img" element={<Page3 />} />
              <Route path="/log-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/resetpasswordform/" element={<ResetPasswordForm />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/confirm-password/:token" element={<SetPassword />} />
              <Route path="/question-answer" element={<QuestionAnswer />} />
              <Route path="/upgrade-account" element={<UpgradeAccount />} />
              <Route path="/coupon-code" element={<CouponCode />} />
              <Route path="/cost-breakdown" element={<CostBreakDown />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </userContextManager.Provider>
      </OrderContextManager.Provider>
    </FileContextManager.Provider>
  );
}

export default App;
