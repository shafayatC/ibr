import hoody from "./img/hoody.jpg";
import ViewDwnld from "./ViewDwnld";
import "./page3.css";
import { FileContextManager } from "../../App";
import { useContext, useEffect, useState } from "react";

const UpdatedImage = ({ imgData }) => {

  const [getImageData, setImageData] = useState({})
  const [getMainFile, setMainFile, fileInfo, setFileInfo, getAfterBeforeImg,] = useContext(FileContextManager);

  const checkServerData = ()=>{
      const imgFile = getAfterBeforeImg.find(fl => fl.output_urls[0].order_image_detail_sequence_no == imgData.sequence_no)
   //   console.log(imgFile)
   typeof imgFile !== 'undefined' && typeof imgFile.output_urls !== 'undefined' && setImageData(imgFile.output_urls[0])
  }

  useEffect(()=>{
    checkServerData()
  },[getAfterBeforeImg])
  return ( 
    <>
    {console.log(getImageData)}
      <div className="bg-white border   border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
        <div className="relative">
          <img
            className="rounded-t-lg img-bag-2"
            src={
              imgData.imageUrl
            }
            alt=""
          />
        
         {Object.keys(getImageData).length > 0 && <ViewDwnld imagesBeforeAfter={getImageData} /> } 
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default UpdatedImage;
