import React, { useContext, useEffect, useState } from "react";
import offer from "../CouponCode/img/coupon_2.jpg"
import logo from "../../images/logo.png"
import { OrderContextManager, apiUrlContextManager, userContextManager } from "../../App";
import { Link } from "react-router-dom";
import Page2 from "../Page2/Page2";




function ApplyVoucher() {

    const [getStatus, setStatus] = useState("")


    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager)
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

    const [getCouponDetails, setCouponDetails] = useState([])

    const getOfferFunc = () => {

        console.log("hello")
        fetch(getApiBasicUrl + '/promotions', {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCouponDetails(data)
            })
    }

    const getApplyCouponFunc = (promoId) => {

        const promData = {
            "order_master_image_id": getOrderMasterId,
            "user_promotions_settings_id": promoId,
            "is_used": true
        }
        fetch(getApiBasicUrl + "/apply-voucher",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'bearer ' + getToken
                },
                body: JSON.stringify(promData),
            }
        ).then(res => res.json())
            .then(data => {
                if (data.status_code == 200) {
                    console.log(promData)

                    document.getElementById(promoId).innerText = 'Apply';
                    document.getElementById(promoId).disabled = true
                }
            })
    }


    useEffect(() => {
        getOfferFunc()

    }, []);


    return (
        <Page2>

            <div className="container mx-auto ">

                <div className="bg-white absolute top-0 left-0 -ml-2 w-full h-full">
                    <div className="flex justify-center mb-10">
                        <h2 className="text-4xl mt-4 text-green-700 font-semibold">Apply Voucher |</h2>
                        <img className="h-12 w-60 mt-3" src={logo} alt="" />
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mx-10 justify-items-center mt-10">
                        {console.log(getCouponDetails)}
                        {Object.keys(getCouponDetails).length > 0 && typeof getCouponDetails.results.promotions_list !== 'undefined' &&
                            getCouponDetails.results.promotions_list.map((data, index) => (
                                data.status == "Redeemed" &&
                                <div className="">
                                    <div className=" card p-2 border border-green-400  bg-white shadow-xl">
                                        <img className="" src={offer} alt="" />

                                        <div className="card-body ml-2">
                                            <p className="font-semibold">{data.title}</p>
                                            <h2 className="card-title ">CODE <span className="text-orange-500 pl-2 font-semibold">{data.code}</span></h2>
                                            <p className="text-sm">{data.description}</p>

                                            <div className="card-actions flex justify-between">
                                                <p className="text-xs pt-2">2K Users use this today</p>

                                                <Link to="/cart">
                                                    <button id={data.id} onClick={() => getApplyCouponFunc(data.id)} className="bg-green-400 text-sm px-4 py-1 mr-3 hover:bg-teal-400 text-white font-semibold rounded-md disabled:bg-green-800">
                                                        Apply
                                                    </button>
                                                </Link>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>

                <Link to="/cart">
                    <button
                        className=" w-10 h-10 border border-theme-shade rounded-full"
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            backgroundColor: "white",

                            padding: "8px 15px",
                        }}

                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </Link>
            </div>
        </Page2 >
    );
}
export default ApplyVoucher;
