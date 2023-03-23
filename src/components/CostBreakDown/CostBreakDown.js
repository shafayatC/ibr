import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderContextManager } from "../../App";
import logo from '../../images/logo.png'

const CostBreakDown = () => {
    const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId] = useContext(OrderContextManager);


    useEffect(() => {
        fetch(`http://103.197.204.22:8007/api/2023-02/cost-breakdown?order_master_image_id=${getOrderMasterId}`)
            .then(res => res.json())
            .then(data => console.log(data))


    }, [getOrderMasterId]);


    return (
        <div className="container mx-auto">
            <div >
                <div className="bg-white flex flex-col items-center mt-2">  <img className="h-6 w-32 " src={logo} alt="" />
                    <p className="text-xl font-bold">COST BREAKDOWN</p>
                </div>
                <div className="flex justify-center mx-auto mt-2 gap-36 border-black border py-1 w-[600px] ">
                    <div className="flex justify-between gap-5">
                        <div><p className="font-semibold text-sm">Date:</p>
                            <p className="font-semibold text-sm">Order No: </p>
                            <p className="font-semibold text-sm">Order Status: </p>
                            <p className="font-semibold text-sm">Raw Images: </p>
                        </div>

                        <div>
                            <p className=" text-sm">18-Mar-23</p>
                            <p className=" text-sm"> AI-0001-IMG</p>
                            <p className=" text-sm">incomplete</p>
                            <p className=" text-sm">10</p>
                        </div>

                    </div>
                    <div className="flex justify-between gap-5">
                        <div>
                            <p className="font-semibold text-sm">Service Type: </p>
                            <p className="font-semibold text-sm">Subscription: </p>
                            <p className="font-semibold text-sm">Payment Status: </p>
                        </div>

                        <div>

                            <p className=" text-sm">Manual</p>
                            <p className=" text-sm">AI Premium</p>
                            <p className=" text-sm">Pending</p>
                        </div>
                    </div>
                </div>

                <div className=" w-[600px] mx-auto mt-2 ">
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
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">1</td>
                                                <td className="whitespace-nowrap px-6 py-0">Remove BG (AI)</td>
                                                <td className="whitespace-nowrap px-6 py-0">10</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.00</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">2</td>
                                                <td className="whitespace-nowrap px-6 py-0">Remove BG (Manua)</td>
                                                <td className="whitespace-nowrap px-6 py-0">10</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.20</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">3</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Retouch</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$1.00</td>
                                                <td className="whitespace-nowrap px-6 py-0">$5.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">4</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">6</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">7</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">8</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">9</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">10</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">11</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-0 font-medium">12</td>
                                                <td className="whitespace-nowrap px-6 py-0">Image Masking</td>
                                                <td className="whitespace-nowrap px-6 py-0">5</td>
                                                <td className="whitespace-nowrap px-6 py-0">$0.40</td>
                                                <td className="whitespace-nowrap px-6 py-0">$2.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end w-[600px]  mt-3 mx-auto gap-5">
                    <div>
                        <p className="font-semibold text-sm">Total Charge </p> <hr></hr>
                        <p className="font-semibold text-sm">Discount </p><hr></hr>
                        <p className="font-semibold text-sm">Net Charge </p><hr></hr>
                    </div>

                    <div className="mr-5">

                        <p className="font-semibold text-sm">$9.00</p>
                        <p className="font-semibold text-sm">$0.00</p>
                        <p className="font-semibold text-sm">$9.00</p>
                    </div>
                </div>
                <div className="w-[700px] mx-auto mt-12 " >
                    <hr className="mb-3"></hr>
                    <p className="text-xs text-center  mb-2"> <span className="font-bold">Address:</span> 2nd Floor, Navana DH Tower, Plot:06, Panthapath, Dhaka, Bangladesh   <span className="font-bold">Phone:</span> 02-55013583   <span className="font-bold">Email:</span> info@retouched.ai</p>
                </div>
                <Link to="/file-uploads">
                    <button
                        className=" w-10 h-10 border border-theme-shade rounded-full"
                        style={{
                            position: "absolute",
                            top: 50,
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
    )
}
export default CostBreakDown;
