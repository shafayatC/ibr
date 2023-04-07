import React, { useContext, useEffect, useState } from "react";
import { userContextManager } from "../../App";
import { Popover } from 'antd';
import { Radio } from 'antd';
import logo from '../../images/logo.png'
import { Input, Space } from 'antd';

const MyOrder = () => {

    const { Search } = Input;

    const downloadContent = (
        // <div>
        //     <p>JPG</p>
        //     <p>PNG</p>
        //     <p>PSD</p>
        // </div>
        <div>
            <Radio.Group defaultValue={1}>
                <Radio value={1}>JPG</Radio>
                <Radio value={2}>PNG</Radio>
                <Radio value={3}>PSD</Radio>


            </Radio.Group>
            <div className="flex justify-end text-xs">
                <button className="bg-green-400 text-white rounded-lg py-1 px-2 mt-2 font-semibold">Download</button>
            </div>
        </div>
    );

    const shareContent = (
        <div className=" p-2">
            <p className="text-xs mb-3 font-bold text-teal-800 ">Share with</p>
            <div className="grid grid-cols-4 gap-3 justify-items-center">
                <p className="cursor-pointer"><i class="fa-brands text-blue-400 text-2xl fa-facebook-messenger"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-blue-500 fa-facebook"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-green-500 fa-whatsapp"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-blue-400 fa-twitter"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-blue-500 fa-linkedin"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-green-500 fa-google-drive"></i></p>
                <p className="cursor-pointer"><i class="fa-brands text-2xl text-red-400 fa-instagram"></i></p>
                <p className="cursor-pointer"><i class="fa-solid text-2xl text-green-400 fa-envelope"></i></p>
            </div>

        </div>


    )

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getOrderDetailsInfo, setOrderDetailsInfo] = useState([])

    const getOrderDetailFunc = () => {

        console.log(getToken)
        fetch('http://103.197.204.22:8007/api/2023-02/user-order-master-info', {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrderDetailsInfo(data)
            })
    }

    useEffect(() => {
        getOrderDetailFunc()

    }, []);

    return (
        <div className="container mx-auto bg-gray-100  pb-10">
            <div className="flex justify-center ml-10 mb-5">
                <h2 className="text-4xl mt-4 text-green-700 font-bold"><i class="fa-solid mr-5 fa-basket-shopping"></i>ORDERS |</h2>
                <img className="h-12 w-60 mt-3" src={logo} alt="" />
                <div className="ml-9 mt-5">
                    <Space direction="vertical" size="middle">
                        <Space.Compact>
                            <Search placeholder="Search Your Order" allowClear />
                        </Space.Compact>
                    </Space>
                </div>
            </div>



            {/* <h2 className="text-3xl font-bold py-5 text-teal-600 text-center"><i class="fa-solid mr-5 fa-basket-shopping"></i>My Order</h2> */}
            <div className="grid lg:grid-cols-4 justify-items-center gap-y-6 mx-20">
                {console.log(getOrderDetailsInfo)}
                {Object.keys(getOrderDetailsInfo).length > 0 && typeof getOrderDetailsInfo.results.user_order_master_info_list !== 'undefined' &&
                    getOrderDetailsInfo.results.user_order_master_info_list.map((data, index) => (
                        <div className="w-64 bg-white rounded-lg h-full  p-6">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="font-semibold text-lg">{data.custom_code} </p>
                                    <p className="text-xs  text-gray-400">Delivery Status : Pending</p>
                                </div>
                                <p className="h-10 w-10 rounded-full bg-teal-400 text-xs font-bold flex items-center text-white justify-center">{data.no_of_images}</p>
                            </div>

                            <p className="">Order Date </p>
                            <p className="text-xs  text-gray-400">{data.order_date}</p>

                            <p className=" mt-5">Delivery Date </p>
                            <p className="text-xs  text-gray-400">{data.delivery_date}</p>



                            <hr className="mt-6"></hr>

                            <div className="flex  justify-between mt-6">
                                <div className="cursor-pointer">
                                    <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                                    <p className="text-sm">View</p>
                                </div>
                                <Popover content={shareContent} trigger="click">
                                    <div className="cursor-pointer">
                                        <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                                        <p className="text-sm">Share</p>
                                    </div>
                                </Popover>
                                <Popover content={downloadContent} trigger="click">
                                    <div className="cursor-pointer">
                                        <p><i class="fa-solid fa-download flex justify-center"></i></p>
                                        <p className="text-sm">Download</p>
                                    </div>
                                </Popover>

                            </div>

                        </div>
                    ))}
                {/* <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div>
                <div className="w-64 rounded-lg bg-white h-full p-6">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">#23769850 </p>
                            <p className="text-xs  text-gray-400">06/04/2023 - 14:24</p>
                        </div>
                        <p className="h-10 w-10 rounded-full bg-teal-300 text-xs flex items-center text-white justify-center">100 $</p>
                    </div>

                    <p className="">GTA-Slot 2 </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>

                    <p className=" mt-5">FR-Cartel City Info </p>
                    <p className="text-xs  text-gray-400">du 06/04/2023 au 10/04/2023</p>


                    <hr className="mt-6"></hr>

                    <div className="flex  justify-between mt-6">
                        <div className="cursor-pointer">
                            <p><i class="fa-regular fa-eye flex justify-center"></i></p>
                            <p className="text-sm">View</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-share-from-square flex justify-center"></i></p>
                            <p className="text-sm">Share</p>
                        </div>
                        <div className="cursor-pointer">
                            <p><i class="fa-solid fa-download flex justify-center"></i></p>
                            <p className="text-sm">Download</p>
                        </div>

                    </div>

                </div> */}
            </div>

        </div>

    )
}

export default MyOrder