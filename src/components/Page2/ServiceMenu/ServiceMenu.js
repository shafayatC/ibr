import { Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FileContextManager, userContextManager } from '../../../App';

const ServiceMenu = ({ ImageIndex }) => {

    const [getServicMenu, setServiceMenu] = useState({});
    const [getImageDetail, setImageDetail] = useState({}); 
    const [getServices, setServices] =  useState([]); 
    const [getNotes, setNotes] =  useState(""); 

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

    const onChangeService=(e, data)=>{
       //e.preventDefault(); 
        if(e.target.checked){
            setServices(getServices => [...getServices, data]); 
        }else {
            const removeService = getServices.filter(res => res !==data )
            setServices(removeService); 
        }
    }

    const onChangeNotes =(e)=>{
        setNotes(e.target.value); 
    }
    const updateImagerServiceFunc = () => {

        const serviceData = {
            "order_image_detail_id": getImageDetail.order_image_detail_id,
            "service_item_ids": getServices.toString(),
            "notes": getNotes,
            "is_for_rework": false
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
            console.log(data)
        })
    }

    const orderImageDetail = () => {

        if(typeof getAfterBeforeImg[ImageIndex] !== 'undefined'){

            setImageDetail(getAfterBeforeImg[ImageIndex].output_urls[0])

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
    useEffect(() => {
        orderImageDetail()
    }, [ImageIndex])
    return (

        <div id="rightMenuBarWrap" className="hfull  w-52   bg-white">
            {console.log(getServicMenu)}
            {console.log(getNotes)}
            <ul className="space-y-2">
                {Object.keys(getServicMenu).length > 0 &&
                    getServicMenu.results.order_image_service_list.map((data, index) => (
                        <li key={index}>
                            <div
                                className="flex items-center p-2  text-xs font-normal hover:border-r-2 rounded-l-3xl bg-green-700 hover:border-r-white text-white mb-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    defaultChecked={data.is_checked}
                                    id={"check_" + index}
                                    onChange={(e)=>onChangeService(e, data.service_item_id)}
                                    className=" checked:bg-orange-400 checked:border-orange-400"
                                />
                                <label
                                    htmlFor={"check_" + index}
                                    className="ml-3"
                                >
                                    {data.name}
                                </label>
                            </div>
                        </li>
                    ))}
            </ul>
            <TextArea showCount maxLength={40} onChange={onChangeNotes} />
            <button onClick={updateImagerServiceFunc} className="bg-green-700 mt-3 font-semibold px-8 rounded-3xl hover:bg-white border border-green-700 hover:text-black py-1 text-white">
                Done
            </button>
        </div>

    );
};

export default ServiceMenu;