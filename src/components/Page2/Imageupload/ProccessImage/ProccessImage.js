import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FileContextManager, userContextManager } from '../../../../App';
import CompareImage from '../../../CompareImage/CompareImage';
import ViewDwnld from '../../../Page3/ViewDwnld';
import ServiceMenu from '../../ServiceMenu/ServiceMenu';
import bg from '../../../../img/Background-for-RA.png';

const ProccessImage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [imageShow, setImageShow] = useState([]);
    const [getImgIndex, setImgIndex] = useState();
    const [actionStatus, setActionStatus] = useState("");
    const [LoadProgress, setLoadProgress] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [getOrderInfo, setOrderInfo] = useState({});
    const [getFilterText, setFilterText] = useState("");
    const [getCurrImageData, setCurrImageData] = useState({});
    const [isImageVisible, setImageVisibility] = useState(false);
    const [checked, setChecked] = useState(true);
    const [getServicMenu, setServiceMenu] = useState({});
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

    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentImages = fileInfo.slice(indexOfFirstItem, indexOfLastItem);

    const checkServerData = () => {
        /*
        const imgFile = getAfterBeforeImg.find(fl => fl.output_urls[0].order_image_detail_sequence_no == imgData.sequence_no)
        if (typeof imgFile !== 'undefined' && typeof imgFile.output_urls !== 'undefined') {
            setCurrImageData(imgFile.output_urls[0])
        }
        */
    }
    const handleCloseClick = () => {
        setImageVisibility(!isImageVisible)
        // proccessImgIndex = 0;
        // setImageVisibility(false);
        //document.body.style.overflow = "unset";
    };

    const viewDownloadFunc = (imgInt) => {
        const ImageIndex = getAfterBeforeImg.map((fl) => { return parseInt(fl.output_urls[0].order_image_detail_sequence_no) }).indexOf(imgInt);

        ImageIndex > -1 &&
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

        setImgIndex(ImageIndex)
        setImageVisibility(!isImageVisible)
        // callBackImgIndex(imgData.sequence_no);
        //  setImageData(imgData.sequence_no)
    }

    const newIndexReturn = (img_ind) => {

        console.log("my index: " + img_ind)
    }
    useEffect(() => {
        checkServerData()
    }, [getAfterBeforeImg, getImgIndex])

    return (
        <div>
            {console.log(getAfterBeforeImg)}
            {console.log(fileInfo)}
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-5 pr-3">

                {
                    currentImages.map((data, index) => (
                        <div key={index}>
                            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
                                <div className="relative h-full">
                                    <LazyLoadImage
                                        className="rounded-t-lg img-bag-2"
                                        effect="blur"
                                        src={data.imageUrl}
                                        height="100%"
                                        width="100%"
                                    />
                                    {getAfterBeforeImg.some(fl => fl.output_urls[0].order_image_detail_sequence_no == data.sequence_no) &&
                                        <>
                                            <i className="fa-solid fa-circle-check absolute right-1 top-1 text-green-400"></i>
                                            <i className="fa-solid fa-check absolute right-6 top-1 text-green-400"></i>
                                            <button className="absolute top-0 left-0 h-full w-full" onClick={() => viewDownloadFunc(data.sequence_no)}></button>
                                        </>
                                    }
                                </div>
                                <div className=""></div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {isImageVisible &&
                <div>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9,
                            display: "flex",
                            justifyContent: "center",
                            backgroundImage: `url(${bg})`
                        }}
                    >
                        <div className="h-[540px] w-[800px] bg-white mt-10 relative rounded-lg z-50">
                            <p className="bg-theme-shade text-black absolute top-2 left-0 font-semibold py-1 px-7 rounded-r-3xl">Free</p>
                            <div className="  pt-12 pl-16 absolute ">
                                <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                                    <CompareImage
                                        topImage={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                        bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                    />
                                    <p className="absolute top-0 right-0  bg-theme-shade px-3 text-xs py-1  rounded-l-3xl z-10">{typeof getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no !== 'undefined' && getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                </div>

                                <div className="flex gap-2 border mt-2 pb-1 border-gray-400 justify-center">
                                    <div>
                                        <button className="  w-20 py-1 hover:bg-white ">
                                            <i class="fa-regular fa-share-from-square"></i>
                                        </button>
                                        <p className="text-xs text-center ">
                                            Share
                                        </p>
                                    </div>
                                    <div>
                                        <button className=" w-20 py-1 hover:bg-white ">
                                            <i class="fa-solid fa-download"></i>
                                        </button>
                                        <p className="text-xs text-center ">
                                            HD
                                        </p>
                                    </div>
                                    <div>
                                        <button className="w-20 py-1 hover:bg-white ">
                                            <i class="fa-solid fa-download"></i>
                                        </button>
                                        <p className="text-xs text-center ">
                                            HD
                                        </p>
                                    </div>
                                    <div>
                                        <button className=" w-20 py-1 hover:bg-white">
                                            <i class="fa-solid fa-arrow-rotate-right"></i>
                                        </button>
                                        <p className="text-xs text-center ">
                                            Refresh
                                        </p>
                                    </div>


                                </div>
                            </div>
                            <ServiceMenu ImageIndex={getImgIndex} newIndexReturn={newIndexReturn} />
                            {/*
                            <div id="rightMenuBarWrap" className="hfull  w-52   bg-white   ">
                                <ul className="space-y-2">
                                    {Object.keys(getServicMenu).length > 0 &&
                                        getServicMenu.results.order_image_services.map((data, index) => (
                                            <li key={index}>
                                                <div
                                                    className="flex items-center p-2  text-xs font-normal hover:border-r-2 rounded-l-3xl bg-green-700 hover:border-r-white text-white mb-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={data.is_checked}
                                                        onChange={() => setChecked(!checked)}
                                                        id={"check_" + index}
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
                                <TextArea showCount maxLength={40} />
                                <button className="bg-green-700 mt-3 font-semibold px-8 rounded-3xl hover:bg-white border border-green-700 hover:text-black py-1 text-white">
                                    Send
                                </button>
                            </div>
*/}

                        </div>

                        <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                            <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-52 cursor-pointer text-black disabled:text-gray-200 ">
                                <i className="fa-solid fa-arrow-left text-4xl "></i>
                            </button>
                            <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-52 cursor-pointer text-black  disabled:text-gray-200 ">
                                <i className="fa-solid fa-arrow-right text-4xl "></i>
                            </button>
                        </div>
                        <button
                            className="bg-white w-10 h-10 border border-theme-shade rounded-full"
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                backgroundColor: "white",
                                border: "none",
                                padding: "10px 15px",
                            }}
                            onClick={handleCloseClick}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            }
            {/*
            
                <div className='fixed w-full h-full top-0 left-0'>
                    <button onClick={() => setImageVisibility(!isImageVisible)} className='absolute right-0 top-0 p-3 bg-gray-400 rounded'>x</button>
                    <img className='w-[300px] m-auto' src={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                </div>

            */}


            <div className="flex fixed bg-light-black w-full justify-center  bottom-0">
                {/* preveiouse button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="cursor-pointer text-white disabled:text-gray-600"
                >
                    <i className="fa-solid fa-arrow-left mr-4"></i>
                </button>

                <div><i className="fa-solid fa-arrows-spin  pt-1 text-center text-black text-4xl cursor-pointer font-bold"></i></div>
                {/* next page */}
                <button

                    disabled={currentPage === Math.ceil(getAfterBeforeImg.length / itemsPerPage)}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="cursor-pointer text-white disabled:text-gray-600"
                >
                    <i className="fa-solid fa-arrow-right ml-4"></i>
                </button>

                {/* Image/total count */}
                <div className="text-white ml-60 text-sm mt-2">
                    <p>Image Count : {fileInfo.length}</p>
                    <p>Total Bill :</p>
                </div>

            </div>
        </div>
    );
};

export default ProccessImage;