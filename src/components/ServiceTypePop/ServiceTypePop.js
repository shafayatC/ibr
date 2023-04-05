import React, { useContext, useEffect, useState } from "react";
import { OrderContextManager, userContextManager } from "../../App";

function ServiceTypePop({ callbackSrvTyepPop }) {

    const [getServiceInfo, setServiceInfo] = useState({});
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId]= useContext(OrderContextManager);

    const HandleClose = () => {
        callbackSrvTyepPop(false);
    };

    const serviceTypeFunc = () => {

        fetch('http://103.197.204.22:8007/api/2023-02/service-types', {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setServiceInfo(data)
            })
    }

    useEffect(() => {
        serviceTypeFunc();
    }, [])
    return (
        <>
        {
            Object.keys(getServiceInfo).length > 0 && getServiceInfo.results.no_of_services > 1 &&
      
            <div className="fixed left-[50%] top-0 h-68 w-[620px] rounded-md text-white m-auto mt-40 bg-[#202123] z-50" style={{ transform: 'translateX(-50%)' }}>
                <div className="flex justify-between ">
                    <h2 className="px-4 py-3 font-bold ">Your Account</h2>
                    <i onClick={HandleClose}
                        className="fa-solid fa-xmark pr-6 py-3 text-xl cursor-pointer text-[#8E8EA0]"
                    ></i>
                </div>
                <hr></hr>
                <div className="flex">
                    {Object.keys(getServiceInfo).length > 0 && getServiceInfo.results.service_type_list.map((data, index) =>
                        <div className={`w-full px-4 py-4  ${index == 0 && "border-r-2 border-r-white"}`}>
                            <p className="text-xl font-semibold">{data.description}</p>
                            <button onClick={()=>setServiceTypeId(data.id)} className={`${data.id == getServiceTypeId ? "bg-[#8E8EA0]  hover:bg-theme-shade" : "bg-theme-shade hover:bg-[#10A37F]"} w-full rounded-md text-center font-semibold text-gray-700 py-2 mt-2 mb-3`}>
                                {data.is_default ? "Your Current Plan" : "Upgrade Plan"}
                            </button>
                            {data.service_type_description_list.map(srvData =>
                                <p className="text-sm leading-6">
                                    <i className={`fa-solid fa-circle-check ${data.id != getServiceTypeId  && 'text-green-600'}`}></i> {srvData.description}
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
export default ServiceTypePop;