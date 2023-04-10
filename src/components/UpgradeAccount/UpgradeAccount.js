import React, { useContext, useEffect, useState } from "react";
import { OrderContextManager, userContextManager } from "../../App";

function UpgradeAccount({ upgradCallBack }) {

  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getServiceTypeId, setServiceTypeId] = useContext(OrderContextManager);
  const [getSubscriptionDetailsInfo, setSubscriptionDetailsInfo] = useState([])

  const HandleClose = () => {
    upgradCallBack(false);
  };

  const getSubscriptionDetailFunc = () => {

    console.log(getToken)
    fetch('http://103.197.204.22:8007/api/2023-02/subscription-plan-types', {
      headers: {
        'Authorization': 'bearer ' + getToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSubscriptionDetailsInfo(data)
      })
  }

  const sendSubscriptionFunc = (subId) => {

    const subData = {
      "id": subId
    }
    fetch("http://103.197.204.22:8007/api/2023-02/update-user-supscription-plan-types",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'bearer ' + getToken
        },
        body: JSON.stringify(subData),
      }
    ).then(res => res.json())
      .then(data => {
        // if (data.status_code == 200) {
        //   console.log(data)

        // }
        console.log(data)
      })
  }

  const subFunc = () => {
    setSubscriptionDetailsInfo()
    sendSubscriptionFunc()
  }


  useEffect(() => {

    getSubscriptionDetailFunc()

  }, [getServiceTypeId]);




  return (
    // <>
    //   <div className="container mx-auto">
    //     <div className=" h-68 w-[620px] rounded-md text-white m-auto mt-40 bg-[#202123]">
    //       <div className="flex justify-between ">
    //         <h2 className="px-4 py-3 font-bold ">Your Account</h2>
    //         <i
    //           onClick={HandleClose}
    //           className="fa-solid fa-xmark pr-6 py-3 text-xl cursor-pointer text-[#8E8EA0]"
    //         ></i>
    //       </div>
    //       <hr></hr>

    //       <div className="flex">
    //         {Object.keys(getSubscriptionDetailsInfo).length > 0 &&
    //           typeof getSubscriptionDetailsInfo.results.subscription_plan_type !== 'undefined' &&
    //           getSubscriptionDetailsInfo.results.subscription_plan_type.length > 0 &&
    //           <div className="w-full px-4 py-4  border-r-2 border-r-white">

    //             <p className="text-xl font-semibold">{getSubscriptionDetailsInfo.results.subscription_plan_type[0].title}</p>
    //             <button className="bg-[#8E8EA0] w-full rounded-md text-center font-semibold text-gray-700 py-2 mt-2 mb-3 hover:bg-theme-shade">
    //               Your Current Plan
    //             </button>
    //             <p>
    //               <i className="fa-solid fa-circle-check"></i> {getSubscriptionDetailsInfo.results.subscription_plan_type[0].subscription_plan_type_description[0].description}
    //             </p>
    //             <p>
    //               <i className="fa-solid fa-circle-check"></i> Low Resolution Output
    //               Image
    //             </p>
    //             <p>
    //               <i className="fa-solid fa-circle-check"></i> No Editing Services
    //             </p>
    //             <p>
    //               <i className="fa-solid fa-circle-check"></i> No Adjustmnet
    //               Supports
    //             </p>

    //           </div>
    //         }

    //         <div className="w-full px-4 py-4">
    //           <p className="text-xl font-semibold">
    //             Premium AI{" "}
    //             <span className="text-[#8E8EA0]">USD $0.20/Image</span>
    //           </p>
    //           <button className="bg-theme-shade w-full rounded-md text-center text-white font-semibold py-2 mt-2 mb-3 hover:bg-[#10A37F]">
    //             Upgrade Plan
    //           </button>
    //           <p>
    //             <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
    //             AI-Professional Collaboration
    //           </p>
    //           <p>
    //             <i className="fa-solid fa-circle-check text-green-600"></i> HD
    //             Quality Output Image
    //           </p>
    //           <p>
    //             <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
    //             Supports Other Editing Services
    //           </p>
    //           <p>
    //             <i className="fa-solid fa-circle-check text-green-600"></i>{" "}
    //             Unlimited No. of Adjustments
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      {
        Object.keys(getSubscriptionDetailsInfo).length > 0 && getSubscriptionDetailsInfo.results.subscription_plan_type > 1 &&

        <div className="fixed left-[50%] top-0 h-68 w-[620px] rounded-md text-white m-auto mt-40 bg-[#202123] z-50" style={{ transform: 'translateX(-50%)' }}>
          <div className="flex justify-between ">
            <h2 className="px-4 py-3 font-bold ">Your Service</h2>
            <i onClick={HandleClose}
              className="fa-solid fa-xmark pr-6 py-3 text-xl cursor-pointer text-[#8E8EA0]"
            ></i>
          </div>
          <hr></hr>
          <div className="flex">
            {Object.keys(getSubscriptionDetailsInfo).length > 0 && getSubscriptionDetailsInfo.results.subscription_plan_type.map((data, index) =>
              <div key={index} className={`w-full px-4 py-4  ${index == 0 && "border-r-2 border-r-white"}`}>
                <p className="text-xl font-semibold">{data.title}</p>
                <button onClick={() => subFunc()} className={`${data.id == getServiceTypeId ? "bg-[#8E8EA0]  hover:bg-theme-shade" : "bg-theme-shade hover:bg-[#10A37F]"} w-full rounded-md text-center font-semibold text-gray-700 py-2 mt-2 mb-3`}>
                  {data.is_default ? "Your Current Plan" : "Update Plan"}
                </button>
                {data.subscription_plan_type_description.map((srvData, index_2) =>
                  <p key={index_2} className="text-sm leading-6">
                    <i className={`fa-solid fa-circle-check ${data.id != getServiceTypeId && 'text-green-600'}`}></i> {srvData.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
}
export default UpgradeAccount;
