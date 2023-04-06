import React, { useContext, useEffect, useState } from "react";
import { OrderContextManager, apiUrlContextManager, userContextManager } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Page2 from "../Page2/Page2";

function ServiceTypePage() {

    const [getServiceInfo, setServiceInfo] = useState({});
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId] = useContext(OrderContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
    const naviagate = useNavigate();

    const serviceTypeFunc = () => {

        fetch(getApiBasicUrl + '/service-types', {
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

    const setServiceTypeFunc = (id) => {
        setServiceTypeId(id)
        naviagate('/file-uploads')
    }
    useEffect(() => {
        serviceTypeFunc();
    }, [getServiceTypeId])
    return (
        <>
        {console.log(getServiceTypeId)}
        <Page2>

            {
                Object.keys(getServiceInfo).length > 0 && getServiceInfo.results.no_of_services > 1 &&

                <div className="fixed left-[50%] top-0 h-68 w-[620px] rounded-md text-white m-auto mt-40 bg-[#202123] z-50" style={{ transform: 'translateX(-50%)' }}>
                    <div className="flex justify-between ">
                        <h2 className="px-4 py-3 font-bold ">Your Account</h2>
                        <Link to={"/file-uploads"}>
                                <i
                                    className="fa-solid fa-xmark pr-6 py-3 text-xl cursor-pointer text-[#8E8EA0]"
                                ></i>
                        </Link>
                    </div>
                    <hr></hr>
                    <div className="flex">
                        {Object.keys(getServiceInfo).length > 0 && getServiceInfo.results.service_type_list.map((data, index) =>
                            <div key={index} className={`w-full px-4 py-4  ${index == 0 && "border-r-2 border-r-white"}`}>
                                <p className="text-xl font-semibold">{data.description}</p>
                                <button onClick={() => setServiceTypeFunc(data.id)} className={`${data.id == getServiceTypeId ? "bg-[#8E8EA0]  hover:bg-theme-shade" : "bg-theme-shade hover:bg-[#10A37F]"} w-full rounded-md text-center font-semibold text-gray-700 py-2 mt-2 mb-3`}>
                                    {data.is_default ? "Your Current Plan" : "Upgrade Plan"}
                                </button>
                                {data.service_type_description_list.map((srvData, index_2) =>
                                    <p key={index_2} className="text-sm leading-6">
                                        <i className={`fa-solid fa-circle-check ${data.id != getServiceTypeId && 'text-green-600'}`}></i> {srvData.description}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            }
        </Page2>
        </>
    );
}
export default ServiceTypePage;