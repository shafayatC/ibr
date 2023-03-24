import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FileContextManager, userContextManager } from '../../../../App';

const ProccessImage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [imageShow, setImageShow] = useState([]);
    const [getImgIndex, setImgIndex] = useState();
    const [actionStatus, setActionStatus] = useState("");
    const [LoadProgress, setLoadProgress] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [getOrderInfo, setOrderInfo] = useState({});
    const [getFilterText, setFilterText] = useState("");
    const [getCurrImageData, setCurrImageData] = useState({})
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

    const viewDownloadFunc = () => {
       // callBackImgIndex(imgData.sequence_no);
        //  setImageData(imgData.sequence_no)
    }
    useEffect(() => {
        checkServerData()
    }, [getAfterBeforeImg])
    return (
        <>
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
                                {Object.keys(getCurrImageData).length > 0 &&
                                    <>
                                        <i className="fa-solid fa-circle-check absolute right-1 top-1 text-green-400"></i>
                                        <i className="fa-solid fa-check absolute right-6 top-1 text-green-400"></i>
                                        <button className="absolute top-0 left-0 h-full w-full" onClick={viewDownloadFunc}></button>
                                    </>
                                }
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default ProccessImage;