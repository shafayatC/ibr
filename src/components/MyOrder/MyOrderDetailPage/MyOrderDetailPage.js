import React, { useContext, useState } from 'react';
import Page2 from '../../Page2/Page2';
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import CompareImage from '../../CompareImage/CompareImage';
import bg from '../../../img/Background-for-RA.png';
import { Popover } from 'antd';
import { Radio } from 'antd';
import { matchSorter } from 'match-sorter';
import './style.css';
const MyOrderDetailPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showImage, setShowImage] = useState(false);
    const [getImgIndex, setImgIndex] = useState();
    const [getFilterSuggest, setFilterSuggest] = useState([]);
    const [actionStatus, setActionStatus] = useState("");
    const [getFilterText, setFilterText] = useState("");
    const [getSuggestBool, setSuggestBool] = useState(false);

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager)
    const [getOrderDetailInfo, setOrderDetailInfo] = useState([])

    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentImages = actionStatus == "filter" ? getFilterSuggest.slice(indexOfFirstItem, indexOfLastItem) : getOrderDetailInfo.slice(indexOfFirstItem, indexOfLastItem);
    // const currentImages = getOrderDetailInfo.slice(indexOfFirstItem, indexOfLastItem);

    const { orderId } = useParams();

    const viewOrderInfo = () => {

        console.log("order id : " + orderId + " token :  " + getToken)
        fetch(`${getModelBaseUrl}user-order-detail-info?order_image_master_id=${orderId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.status_code == 200 && setOrderDetailInfo(data.results.user_order_detail_info_list);
            })
    }


    const downloadContent = (

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


    const handleClose = () => {
        setShowImage(false);
        // switchLoopFunc()
    };
    const viewImg = (img) => {
        console.log(img);
        setImgIndex(img);
        setShowImage(true);
    };


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const filterFunc = (e) => {

        Promise.all(getOrderDetailInfo).then((data) => {
            // const imagePath = data.output_urls[0].compressed_raw_image_public_url.split('CompressedRaw'); 
            console.log(data);
            const suggestList = matchSorter(data, e.target.value, {
                keys: [(data) => data.file_relative_path],
            });
            setFilterSuggest(suggestList);
        });

        //  setFilterSuggest(getOrderDetailInfo.filter((f, index) => f.file_relative_path.search(getFilterText) > -1));
        setFilterText(e.target.value);

        if (e.target.value.length > 0) {
            setActionStatus("filter");
            setSuggestBool(true);
            setCurrentPage(1);
        } else {
            setActionStatus("");
            setSuggestBool(false);
        }
    }
    const clearFilterText = () => {
        setFilterText("");
        setSuggestBool(false);
        setActionStatus("");
    };
    const filterBysuggest = (txt) => {
        setFilterText(txt);
        setSuggestBool(false);
        if (txt.length > -1) {
            setActionStatus("filter");
        } else {
            setActionStatus("");
        }
    };
    useState(() => {
        getUserInfo.status_code == 200 && viewOrderInfo();
    }, [getToken])
    return (
        <>

            {console.log(getFilterSuggest)}
            <div style={{ backgroundImage: `url(${bg})`, minHeight: 'calc(100vh - 44px)' }} >
                <div className='container mx-auto relative'>
                    <div className="flex items-center justify-center py-3">
                        <i className="fa-solid fa-filter text-white mr-1"></i>
                        <p className="text-white mr-4">Filter</p>
                        <div className="relative w-[395px] z-40">
                            <input
                                value={getFilterText}
                                onChange={filterFunc}
                                maxLength={200}
                                type="text"
                                className="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-5 py-2 pr-10 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Filter File or Folder"
                            />
                            {getFilterText.length > 0 && 
                            <button
                                onClick={clearFilterText}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700  cursor-pointer"
                            >
                                <i className="fa-sharp fa-solid fa-xmark"></i>
                            </button>
                            }

                            <div id="matchsort" className="absolute bg-white z-40 left-[50%] min-w-full">
                                {getSuggestBool == true &&
                                    getFilterSuggest.map(
                                        (data, index) =>
                                            index < 2 && (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        filterBysuggest(data.file_relative_path)
                                                    }
                                                    className="w-full text-left px-[10px] py-[7px] text-gray-900 border-gray-200 border-solid border-b-[1px]"
                                                >
                                                    {data.file_relative_path}
                                                </button>
                                            )
                                    )}
                            </div>
                        </div>
                    </div>

                    {typeof getOrderDetailInfo !== 'undefined' && getOrderDetailInfo.length > 0 &&
                        <div className='px-7'>
                            <div className={`grid sm:grid-cols-1 md:grid-cols-${getOrderDetailInfo.length > 3 ? "4" : getOrderDetailInfo.length} lg:grid-cols-${getOrderDetailInfo.length > 3 ? "4" : getOrderDetailInfo.length} gap-4 pt-2 ml-2  pr-3`}>
                                {currentImages.map((data, index) => (
                                    data.file_relative_path.toLowerCase().indexOf(getFilterText.toLowerCase()) > -1 &&  <div key={index} className={getOrderDetailInfo.length === 1 && "flex justify-center"}>
                                        <div className={`img-container  bg-no-repeat  cursor-pointer img-bag_2 ${getOrderDetailInfo.length === 1 ? "h-[400px] justify-center" : "img-bag"}`}
                                            onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                                            style={{
                                                backgroundImage: `url(${data.compressed_raw_url})`,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>

                {showImage &&
                    <div>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: -10,
                                right: 0,
                                bottom: 0,
                                zIndex: 99,
                                display: "flex",
                                justifyContent: "center",
                                backgroundImage: `url(${bg})`
                            }}
                        >
                            <div className="h-[550px] w-[800px] bg-white mt-5 relative rounded-md z-50 flex flex-col">

                                <p className=" text-white text-center py-1 top-1 bg-teal-500  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                <div className="pt-10 mx-auto ">
                                    <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                                    <CompareImage
                                            bottomImage={getOrderDetailInfo[getImgIndex].default_compressed_output_public_url}
                                            topImage={getOrderDetailInfo[getImgIndex].compressed_raw_url} />
                                        <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{getImgIndex + 1}</p>
                                    </div>
                                </div>
                                <div className="flex  justify-center gap-10 mt-6">

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


                            <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                                    {/* <i class="fa-solid fa-circle-chevron-left"></i> */}
                                </button>
                                <button disabled={getImgIndex == getOrderDetailInfo.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-right text-4xl "></i>
                                    {/* <i class="fa-solid fa-circle-chevron-right"></i> */}
                                </button>
                            </div>
                            <div className="absolute right-4 top-4 flex gap-2">
                                <button
                                    onClick={handleClose}
                                    className="bg-white w-10 h-10 border border-theme-shade rounded-full"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                }
                    
                <div className='container absolute bottom-0 w-full left-[50%]' style={{transform: 'translateX(-50%)'}}>
                        <div className="flex mb-3 justify-between w-full">
                            {/* Previous button */}
                            <div>
                                <button
                                    disabled={currentPage === 1}
                                    className="cursor-pointer text-white disabled:text-gray-500"
                                    onClick={previousPage}
                                >
                                    <i className="fa-solid text-2xl ml-5 fa-circle-chevron-left "></i>
                                </button></div>
                            {/* Next Button */}
                            <div>
                                <button
                                    disabled={currentPage === Math.ceil(actionStatus == "filter" ? getFilterSuggest.length / itemsPerPage : getOrderDetailInfo.length / itemsPerPage)}
                                    className="cursor-pointer text-white disabled:text-gray-500"
                                    onClick={nextPage}
                                >
                                    <i className="fa-solid text-2xl mr-3 fa-circle-chevron-right "></i>
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default MyOrderDetailPage;