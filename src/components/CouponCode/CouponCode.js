import React, { useContext, useEffect, useState } from "react";
import offer from "../CouponCode/img/coupon_2.jpg"
import logo from "../../images/logo.png"
import { apiUrlContextManager, userContextManager } from "../../App";
import { Link } from "react-router-dom";
import Page2 from "../Page2/Page2";




function CouponCode() {

    const [getStatus, setStatus] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getCouponDetails, setCouponDetails] = useState([])


    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };



    const getOfferFunc = () => {

        console.log(getToken)
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


    const getCouponFunc = (promoId) => {

        const promData = {
            "promotions_settings_id": promoId
        }
        fetch(getApiBasicUrl + "/user-promotions",
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
                    console.log(data)
                    document.getElementById(promoId).innerText = 'Redeemed';
                    document.getElementById(promoId).disabled = true
                }
            })
    }


    useEffect(() => {
        getOfferFunc()

    }, []);


    return (
        <Page2>
            {console.log(getStatus)}
            <div className="container mx-auto ">

                <div className="bg-white absolute top-0 left-0 -ml-2 w-full h-full">
                    <div className="flex justify-center mb-10">
                        <h2 className="text-4xl mt-4 text-green-700 font-semibold">VOUCHER |</h2>
                        <img className="h-12 w-60 mt-3" src={logo} alt="" />
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mx-10 justify-items-center mt-10">
                        {console.log(getCouponDetails)}
                        {Object.keys(getCouponDetails).length > 0 && typeof getCouponDetails.results.promotions_list !== 'undefined' &&
                            getCouponDetails.results.promotions_list.map((data, index) => (

                                <div className="">
                                    <div className=" card p-2 border border-green-400  bg-white shadow-xl">
                                        <img className="" src={offer} alt="" />

                                        <div className="card-body ml-2">
                                            <p className="font-semibold">{data.title}</p>
                                            <h2 className="card-title ">CODE <span className="text-orange-500 pl-2 font-semibold">{data.code}</span></h2>
                                            <p className="text-sm">{data.description}</p>

                                            <div className="card-actions flex justify-between">
                                                <p className="text-xs pt-2">2K Users use this today.</p>
                                                {getUserInfo.status_code == 200 ?
                                                    <button id={data.id} onClick={() => getCouponFunc(data.id)} className="bg-green-400 text-sm px-4 py-1 mr-3 hover:bg-teal-400 text-white font-semibold rounded-md disabled:bg-red-800">
                                                        {data.status}
                                                    </button>
                                                    :
                                                    <button onClick={openModal} className="bg-green-400 text-sm px-4 text-white font-semibold py-1 mr-3 hover:bg-teal-400 text-font-semibold rounded-md">
                                                        {data.status}
                                                    </button>
                                                }
                                            </div>
                                            <>


                                                {isOpen && (
                                                    <div className="fixed inset-0 z-50 top-48 ">
                                                        <div className="flex  opacity-90 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                            <div
                                                                className="fixed inset-0 "
                                                                aria-hidden="true"
                                                                onClick={closeModal}
                                                            >
                                                                <div className="absolute inset-0 bg-gray-500 opacity-30"></div>

                                                            </div>

                                                            <div
                                                                className="inline-block w-[450px] h-[160px] align-bottom border border-teal-700 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                                                                role="dialog"
                                                                aria-modal="true"
                                                                aria-labelledby="modal-headline"
                                                            >
                                                                <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                    <div className="sm:flex sm:items-start">

                                                                        <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                            <h3
                                                                                className="text-2xl leading-6 font-medium text-gray-900"
                                                                                id="modal-headline"
                                                                            >
                                                                                Please Login to your account
                                                                            </h3>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" py-4 flex gap-4 justify-center ">

                                                                    <Link to="/log-in">
                                                                        <button

                                                                            className="text-white w-20 bg-green-400  px-1 py-1 rounded-md"
                                                                        >
                                                                            Login
                                                                        </button>
                                                                    </Link>
                                                                    <button

                                                                        className="text-white w-20 bg-red-400  px-1 py-1 rounded-md"
                                                                        onClick={closeModal}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>

                <Link to="/file-uploads">
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
export default CouponCode;
