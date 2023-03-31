import { Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FileContextManager, userContextManager } from '../../../App';
import './service.css';

const ServiceMenu = ({ ImageIndex }) => {

    const [getServicMenu, setServiceMenu] = useState({});
    const [getImageDetail, setImageDetail] = useState({});
    const [getServices, setServices] = useState([]);
    const [getNotes, setNotes] = useState("");
    const [getOrderImageInfo, setOrderImageInfo] = useState({})
    const [getImagePrice, setImagePrice] = useState();
    const [checked, setChecked] = useState(true);
    const [
        getMainFile,
        setMainFile,
        fileInfo,
        setFileInfo,
        getAfterBeforeImg,
        setAfterBeforeImg,
        getLockMenuBool,
        setLockMenuBool,
        getImageData,
        setImageData
    ] = useContext(FileContextManager);
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const { TextArea } = Input;

    const onChangeService = (e, data) => {
        //e.preventDefault(); 
        if (e.target.checked) {
            setServices(getServices => [...getServices, data]);
        } else {
            const removeService = getServices.filter(res => res !== data)
            setServices(removeService);
        }
    }

    const onChangeNotes = (e) => {
        setNotes(e.target.value);
    }
    const updateImagerServiceFunc = (e, data) => {

        /*
        const serviceData = {
            "order_image_detail_id": getImageDetail.order_image_detail_id,
            "service_item_ids": getServices.toString(),
            "notes": getNotes,
            "is_for_rework": false
        }
*/
        console.log(e.target.checked)

        const serviceData = {
            "order_image_detail_id": getImageDetail.order_image_detail_id,
            "service_item_id": data,
            "is_checked": e.target.checked
        }
        fetch("http://103.197.204.22:8007/api/2023-02/order-image-service-update",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'bearer ' + getToken
                },
                body: JSON.stringify(serviceData),
            }
        )
            .then(res => res.json())
            .then(data => {

                setImagePrice(data.results.order_detail_per_image_charge[0].per_image_charge)
                console.log(data)
            })
    }

    const orderImageDetail = () => {

        if (typeof getAfterBeforeImg[ImageIndex] !== 'undefined') {

            setImageDetail(getAfterBeforeImg[ImageIndex].output_urls[0])

            fetch(`http://103.197.204.22:8007/api/2023-02/order-detail-info-by-id?order_image_detail_id=${getAfterBeforeImg[ImageIndex].output_urls[0].order_image_detail_id}`, {
                headers: {
                    'Authorization': 'bearer ' + getToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.status_code == 200) {
                        setOrderImageInfo(data);
                        setImagePrice(data.results.order_detail_per_image_charge[0].per_image_charge)
                    }
                })


            fetch(`http://103.197.204.22:8007/api/2023-02/order-image-service?order_image_detail_id=${getAfterBeforeImg[ImageIndex].output_urls[0].order_image_detail_id}`, {
                headers: {
                    'Authorization': 'bearer ' + getToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.json())
                .then(data => {
                    data.status_code == 200 && setServiceMenu(data)
                })
        }

    }

    var x = 0;
    useEffect(() => {
        setServiceMenu({})
        setOrderImageInfo({})
        orderImageDetail()
    }, [ImageIndex])
    return (
        <>
            <p className="bg-red-500 text-white text-xs absolute top-1 left-0 font-bold py-1 px-2 rounded-r-full ">{getImagePrice}</p>
            <div id="rightMenuBarWrap" className="  w-60   bg-white">
                {console.log(getServicMenu)}
                <ul className="space-y-2">
                    {Object.keys(getServicMenu).length > 0 &&
                        getServicMenu.results.order_image_service_list.map((data, index) => (
                            <li key={index}>
                                <div
                                    className="flex items-center border border-teal-600 px-4 py-2 text-xs font-normal rounded-lg  bg-white  text-black mb-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        disabled={data.is_locked}
                                        defaultChecked={data.is_checked}
                                        id={"check_" + index}
                                        onChange={(e) => updateImagerServiceFunc(e, data.service_item_id)}
                                        className=" checked:bg-teal-500 rounded-full disabled:bg-red-400 "
                                    />
                                    <label
                                        htmlFor={"check_" + index}
                                        className="ml-3 text-sm"
                                    >
                                        {data.name}
                                        <p className='text-xs'>Hello from Retouched</p>

                                    </label>
                                </div>
                            </li>
                        ))}
                </ul>
                {/* <TextArea className='mb-5' showCount maxLength={40} onChange={onChangeNotes} /> */}
                {/* <button className="bg-green-700 text-sm font-semibold px-8 rounded-3xl hover:bg-white border border-green-700 hover:text-black py-1 text-white">
                    Done
                </button> */}
            </div>

        </>

    );
};

export default ServiceMenu;