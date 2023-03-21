import hoody from "./img/hoody.jpg";
import ViewDwnld from "./ViewDwnld";
import "./page3.css";
import { FileContextManager } from "../../App";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const UpdatedImage = ({ imgData, key, callBackImgIndex }) => {

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
    setImageData] = useContext(FileContextManager);

  const checkServerData = () => {
    const imgFile = getAfterBeforeImg.find(fl => fl.output_urls[0].order_image_detail_sequence_no == imgData.sequence_no)
    //   console.log(imgFile)
   if( typeof imgFile !== 'undefined' && typeof imgFile.output_urls !== 'undefined'){
    setCurrImageData(imgFile.output_urls[0])
   } 
  }
const viewDownloadFunc =()=>{
  callBackImgIndex(imgData.sequence_no);
//  setImageData(imgData.sequence_no)
}
  useEffect(() => {
    checkServerData()
  }, [getAfterBeforeImg])
  
  return (
    <>
      <div key={key} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
        <div className="relative h-full">
          {/**
          <img
            className="rounded-t-lg img-bag-2"
            src={
              imgData.imageUrl
            }
            alt=""
          /> */}
          <LazyLoadImage
           className="rounded-t-lg img-bag-2"
            effect="blur"
            src={imgData.imageUrl}
            height="100%"
            width="100%"
            />
          { Object.keys(getCurrImageData).length > 0 && 
          <>
           <i class="fa-solid fa-circle-check absolute right-1 top-1 text-green-400"></i>
            <i class="fa-solid fa-check absolute right-6 top-1 text-green-400"></i>
            <button className="absolute top-0 left-0 h-full w-full" onClick={viewDownloadFunc}></button>
          </>
          }

          {/* Object.keys(getImageData).length > 0 && <ViewDwnld imagesBeforeAfter={getImageData} />*/}
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default UpdatedImage;
