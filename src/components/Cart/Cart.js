import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrlContextManager, menuContextManager, OrderContextManager, userContextManager } from "../../App";
import logo from '../../images/logo.png'
import Page2 from "../Page2/Page2";
// import { Steps } from 'antd';

const Cart = () => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    // const [getCostDetails, setCostDetails] = useState({})

    const constDetailFunc = () => {

        fetch(`${getApiBasicUrl}/cost-breakdown?order_master_image_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                setCostDetails(data)
                console.log(data)
            })
    }

    const removeCouponOffer = () => {
        console.log(getOrderMasterId)
        const promData = {
            "order_master_image_id": getOrderMasterId,
            "user_promotions_settings_id": null,
            "is_used": true
        }
        fetch(getApiBasicUrl + "/apply-voucher", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(promData),
        }
        )
            .then(res => res.json())
            .then(data => {
                if (data.status_code == 200) {
                    console.log(data)
                    constDetailFunc()
                    document.getElementById("cross").style.display = 'none';
                }
            })
    }

    const checkoutFunc = () => {

        fetch(`${getModelBaseUrl}checkout?order_image_master_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
           // data.status_code == 200 && window.open(data.results.checkout_url, "_blank");
            data.status_code == 200 && window.open(data.results.checkout_url);
        })
    }

    useEffect(() => {
        getOrderMasterId.length > 0 && constDetailFunc()
    }, [getOrderMasterId]);

    return (
        <Page2>
            <div className="container mx-auto">
                <div className="bg-white absolute top-0 left-0  w-full h-full">
                    {/* <div className="bg-white flex flex-col items-center mt-2">  <img className="h-8 w-44 mb-2" src={logo} alt="" />
                        <p className="text-3xl font-bold">CART</p>
                    </div> */}
                    <div className="flex justify-center mb-5">
                        <h2 className="text-4xl mt-4 text-green-700 font-semibold">CART |</h2>
                        <img className="h-12 w-60 mt-3" src={logo} alt="" />
                    </div>

                    <div className="w-[600px] mx-auto mt-5">
                        <div>
                            <h2 className="sr-only">Steps</h2>

                            <div
                                className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                            >
                                <ol
                                    className="relative z-10 flex justify-between text-sm font-medium text-gray-500"
                                >
                                    <li className="flex items-center gap-2 bg-white p-2">
                                        <span
                                            className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px] font-bold leading-6"
                                        >
                                            1
                                        </span>

                                        <span className="hidden sm:block"> Upload </span>
                                    </li>

                                    <li className="flex items-center gap-2 bg-white p-2">
                                        <span
                                            className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px] font-bold leading-6 "
                                        >2
                                        </span>

                                        <span className="hidden sm:block"> Process </span>
                                    </li>

                                    <li className="flex items-center gap-2 bg-white p-2">
                                        <span
                                            className="h-6 w-6 rounded-full  bg-green-400 text-center text-white text-[10px] font-bold leading-6"
                                        >
                                            3
                                        </span>

                                        <span className="hidden sm:block"> Payment </span>
                                    </li>
                                </ol>
                            </div>
                        </div>

                    </div>
                    <div className=" w-[650px] mx-auto mt-12 ">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-0 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr className="bg-gray-400">
                                                    <th scope="col" className="px-6 py-0">SL</th>
                                                    <th scope="col" className="px-6 py-0">Service</th>
                                                    <th scope="col" className="px-6 py-0">No.of Services</th>
                                                    <th scope="col" className="px-6 py-0">Charge/Image</th>
                                                    <th scope="col" className="px-6 py-0">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(getCostDetails).length > 0 && typeof getCostDetails.results.order_detail_charge_breakdown !== 'undefined' &&
                                                    getCostDetails.results.order_detail_charge_breakdown.map((data, index) => (
                                                        < tr className="border-b dark:border-neutral-500" >
                                                            <td className="whitespace-nowrap px-6 py-0 font-medium">{index + 1}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.name}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.no_of_services_in_images}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.charge_per_image}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.total}</td>
                                                        </tr>
                                                    ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end w-[690px] mt-4 mx-auto gap-5">
                        <div>
                            <p className="font-semibold text-sm">Net Charge:</p> <hr></hr>
                            <p className="font-semibold text-sm">Discount: </p><hr></hr>
                            <p className="font-semibold text-sm">Total Charge: </p><hr></hr>
                        </div>
                        {Object.keys(getCostDetails).length > 0 && typeof getCostDetails.results.order_master_charge_breakdown !== 'undefined' &&
                            <div className="mr-4">
                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].net_charge} </p>
                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].discount}
                                    {getCostDetails.results.order_master_charge_breakdown[0].discount !== '$ 0.00' &&
                                        <span className="pl-3 cursor-pointer"> <i onClick={removeCouponOffer} id="cross" className="fa-regular text-red-600 fa-circle-xmark"></i></span>
                                    }
                                </p>
                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].total_charge}</p>
                            </div>
                        }
                    </div>



                    <Link to="/apply-voucher">
                        <button className="bg-teal-500 text-white mx-auto rounded-md absolute bottom-5 hover:bg-green-400 left-10 p-2 w-[160px]">
                            <p className="flex items-center gap-3"><i class="text-xl fa-solid fa-gift"></i>
                                <span className="text-sm  font-semibold"> Apply a voucher</span></p>
                        </button>

                    </Link>
                    {/*
                    <Link to="/checkout" state={{ totalPrice: typeof getCostDetails.results !== 'undefined' && getCostDetails.results.order_master_charge_breakdown[0].total_charge }}>
                        <button className="bg-teal-500 text-white font-semibold mx-auto rounded-md absolute bottom-5 hover:bg-green-400 right-4 p-2 w-[160px]">
                            <p>Checkout</p>
                        </button>
                    </Link>
                    */}
                        <button onClick={checkoutFunc} className="bg-teal-500 text-white font-semibold mx-auto rounded-md absolute bottom-5 hover:bg-green-400 right-4 p-2 w-[160px]">
                            <p>Checkout</p>
                        </button>
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
                        // onClick={handleCloseClick}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </Link>

                </div>

            </div>
        </Page2>
    )
}
export default Cart;
