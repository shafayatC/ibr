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
import ApplyVoucher from "./components/ApplyVoucher/ApplyVoucher";
import CheckOutPage from "./components/Payment/CheckOutPage";
import ThankYouPage from "./components/Payment/ThankYouPage";
import MyOrder from "./components/MyOrder/MyOrder";
import localforage from "localforage";
import ServiceTypePage from "./components/ServiceTypePop/ServiceTypePage";
import MyOrderDetailPage from "./components/MyOrder/MyOrderDetailPage/MyOrderDetailPage";

export const FileContextManager = createContext();
export const OrderContextManager = createContext();
export const userContextManager = createContext();
export const menuContextManager = createContext();
export const apiUrlContextManager = createContext(); 

function App() {
  const [getMainFile, setMainFile] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);
  const [getImageData, setImageData] = useState()
  const [getMenuId, setMenuId] = useState("")
  const [getLockMenuBool, setLockMenuBool] = useState(false);
  const [getServiceTypeId, setServiceTypeId] = useState("")
  const [getMenu, setMenu] = useState([]);
  const [getDashboardMenu, setDashboardMenu] = useState([])
  const [getUserInfo, setUserInfo] = useState({});
  const [getToken, setToken] = useState("p_k_hKqzczG8QEAdqdy0h5OMOO0ngQ4nawou");
  const [getOrderMasterId, setOrderMasterId] = useState("");
  const [getSubscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [actionStatus, setActionStatus] = useState("");
  const [getTotalImage, setTotalImage] = useState(0);
  const [getProccessImgIndex, setProccessImgIndex] = useState(0);
  const [getCostDetails, setCostDetails] = useState({})
  const [getOrderDetailInfo, setOrderDetailInfo] = useState([])
  const [getSrvPopBool, setSrvPopBool] = useState(true); 
  const [getModelBaseUrl, setModelBaseUrl] = useState("");
  const [getApiBasicUrl, setApiBasicUrl] = useState("http://103.197.204.22:8007/api/2023-02");

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
        setProccessImgIndex,
        getTotalImage,
        setTotalImage
      ]}
    >
      <OrderContextManager.Provider value={[getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails, getSrvPopBool, setSrvPopBool, getOrderDetailInfo, setOrderDetailInfo]}>
        <userContextManager.Provider value={[getUserInfo, setUserInfo, getToken, setToken]}>
          <menuContextManager.Provider value={[getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu]}>
            <apiUrlContextManager.Provider value={[getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl]}>
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
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/confirm-password/:token" element={<SetPassword />} />
                <Route path="/question-answer" element={<QuestionAnswer />} />
                <Route path="/upgrade-account" element={<UpgradeAccount />} />
                <Route path="/coupon-code" element={<CouponCode />} />
                <Route path="/cost-breakdown" element={<CostBreakDown />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/apply-voucher" element={<ApplyVoucher />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/thank-you-page" element={<ThankYouPage />} />
                <Route path="/my-order" element={<MyOrder />} />
                <Route path="/editing-package" element={<ServiceTypePage />} />
                <Route path="/order-info-page/:orderId" element={<MyOrderDetailPage />} />
              </Routes>
            </div>
            </apiUrlContextManager.Provider>
          </menuContextManager.Provider>
        </userContextManager.Provider>
      </OrderContextManager.Provider>
    </FileContextManager.Provider>
  );
}

export default App;
