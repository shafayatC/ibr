import React, { useState } from "react";

function UpgradeAccount({upgradCallBack}) {

  const HandleClose = () => {
    upgradCallBack(false);
  };
  return (
    <>
        <div className="container mx-auto">
          <div className=" h-68 w-[620px] rounded-md text-white m-auto mt-40 bg-[#202123]">
            <div className="flex justify-between ">
              <h2 className="px-4 py-3 font-bold ">Your Account</h2>
              <i
                onClick={HandleClose}
                className="fa-solid fa-xmark pr-6 py-3 text-xl cursor-pointer text-[#8E8EA0]"
              ></i>
            </div>
            <hr></hr>
            
            <div className="flex">
              <div className="w-full px-4 py-4  border-r-2 border-r-white">
                <p className="text-xl font-semibold">Free Plan (AI)</p>
                <button className="bg-[#8E8EA0] w-full rounded-md text-center font-semibold text-gray-700 py-2 mt-2 mb-3 hover:bg-theme-shade">
                  Your Current Plan
                </button>
                <p>
                  <i className="fa-solid fa-circle-check"></i> AI Based Services
                </p>
                <p>
                  <i className="fa-solid fa-circle-check"></i> Low Resolution Output
                  Image
                </p>
                <p>
                  <i className="fa-solid fa-circle-check"></i> No Editing Services
                </p>
                <p>
                  <i className="fa-solid fa-circle-check"></i> No Adjustmnet
                  Supports
                </p>
              </div>
              <div className="w-full px-4 py-4">
                <p className="text-xl font-semibold">
                  Premium AI{" "}
                  <span className="text-[#8E8EA0]">USD $0.20/Image</span>
                </p>
                <button className="bg-theme-shade w-full rounded-md text-center text-white font-semibold py-2 mt-2 mb-3 hover:bg-[#10A37F]">
                  Upgrade Plan
                </button>
                <p>
                  <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
                  AI-Professional Collaboration
                </p>
                <p>
                  <i className="fa-solid fa-circle-check text-green-600"></i> HD
                  Quality Output Image
                </p>
                <p>
                  <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
                  Supports Other Editing Services
                </p>
                <p>
                  <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
                  Unlimited No. of Adjustments
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
export default UpgradeAccount;
