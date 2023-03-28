import React, { useContext, useEffect, useState } from "react";
import {
  FileContextManager,
  OrderContextManager,
  userContextManager,
} from "../../../App";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatedImage from "../../Page3/UpdatedImage";
import processlogo from "./img/process.png";
import { matchSorter } from "match-sorter";
import UpgradeAccount from "../../UpgradeAccount/UpgradeAccount";
import CouponCode from "../../CouponCode/CouponCode";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ViewDwnld from "../../Page3/ViewDwnld";
import ProccessImage from "./ProccessImage/ProccessImage";
import ServiceMenu from "../ServiceMenu/ServiceMenu";
import bg from '../../../img/Background-for-RA.png';
import Loading_2 from "../../Loading/Loading_2";
import CostBreakDown from "../../CostBreakDown/CostBreakDown";

function Imageupload() {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageShow, setImageShow] = useState([]);
  const [getImgIndex, setImgIndex] = useState();
 // const [actionStatus, setActionStatus] = useState("");
  const [LoadProgress, setLoadProgress] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [getOrderInfo, setOrderInfo] = useState({});
  const [getFilterText, setFilterText] = useState("");
  const [getSuggest, setSuggest] = useState([]);
  const [getSuggestBool, setSuggestBool] = useState(false);
  const [getProccessImgIndex, setProccessImgIndex] = useState(0)

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
    setImageData,
    actionStatus,
    setActionStatus
  ] = useContext(FileContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

  const [getUpdatePlan, setUpdatePlan] = useState(false);
  const [getCostBreak, setCostBreak] = useState(false);

  const UpdatePlan = () => {
    setUpdatePlan(true);
  };
  const CostPlan = () => {
    setCostBreak(true);
  };

  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId] = useContext(OrderContextManager);

  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.slice(indexOfFirstItem, indexOfLastItem);

  const api_url = "http://27.147.191.97:8008/upload";
  const api_url_py = "http://127.0.0.1:5000/api/upload";
  const api_send = "http://27.147.191.97:8008/upload-file";

  {
    /*
  const orderInfoFunc = () => {
    console.log("my order"); 
    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      user_id: null,
    };

    fetch("http://103.197.204.22:8007/api/2023-02/order-master-info", {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data.results.order_master_info);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
*/
  }
  const uploadFile = (e) => {
    const newFile = e.target.files;

    setMainFile(newFile);
    setLoadProgress(0);
    setActionStatus("");

    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId
    };

    // console.log("getMenuId " + getMenuId + " getServiceTypeId " + getServiceTypeId);

    fetch("http://103.197.204.22:8007/api/2023-02/order-master-info", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'bearer ' + getToken
      },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        let order_id = data.results.order_master_info.order_id;
        setOrderMasterId(order_id)
        console.log("order_id : " + order_id + " service type id : " + getServiceTypeId);

        let i = 0;
        for (const file of newFile) {
          i++;

          // setLoadProgress(Math.round((100 / newFile.length) * i));

          if (file.type == "image/jpeg" || file.type == "image/png") {
            if (fileInfo.length > 0) {
              // check if the images is already exits
              const foundFile = fileInfo.find(
                (fl) =>
                  fl.file.lastModified === file.lastModified &&
                  fl.file.name === file.name &&
                  fl.file.size === file.size &&
                  fl.file.type === file.type
              );

              if (foundFile) {
                // console.log("The file already exists in the array.");
              } else {
                const imageUrl = URL.createObjectURL(file);
                const fileObject = { file: file, imageUrl: imageUrl, sequence_no: fileInfo.length + i };
                setFileInfo((fileInfo) => [...fileInfo, fileObject]);

                let data = new FormData();
                data.append("order_master_id", order_id);
                data.append("service_type_id", getServiceTypeId);
                data.append("file", file);
                data.append("file_relative_path", "filePath/example");
                data.append("subscription_plan_type_id", getSubscriptionPlanId);
                data.append("sequence_no", fileInfo.length + i);
                dataTransfer(data);

                console.log("The file does not exist in the array.");
              }
            } else {
              const imageUrl = URL.createObjectURL(file);
              const fileObject = { file: file, imageUrl: imageUrl, sequence_no: fileInfo.length + i };
              setFileInfo((fileInfo) => [...fileInfo, fileObject]);

              let data = new FormData();
              data.append("order_master_id", order_id);
              data.append("service_type_id", getServiceTypeId);
              data.append("file", file);
              data.append("file_relative_path", "filePath/example");
              data.append("subscription_plan_type_id", getSubscriptionPlanId);
              data.append("sequence_no", fileInfo.length + i);
              dataTransfer(data);

            }
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  };

  const uniqueIdGenerate = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-#@&=_!";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const getFileType = (fileType) => {
    const fileTypeIs = fileType.type.split("/");
    return fileTypeIs[1];
  };

  function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false,
      timer;
    var img = new Image();
    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer);
        callback("error");
      }
    };
    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer);
        callback("success");
      }
    };
    img.src = url;
    timer = setTimeout(function () {
      timedOut = true;
      callback("timeout");
    }, timeout);
  }

  const checkAiProccesDone = (getAfterBeforeImg) => {
    console.log("testing ai process");
    if (getAfterBeforeImg.length > 0) {
      getAfterBeforeImg.map((data, index) => {
        console.log(data);
        if (typeof data.output_urls[0] !== "undefined") {
          if (data.output_urls[0].is_ai_processed == false) {
            const myCallback = (result) => {
              if (result == "success") {
                getAfterBeforeImg[index].output_urls[0].is_ai_processed = true;
              }
            };

            testImage(
              data.output_urls[0].default_compressed_output_public_url,
              myCallback
            );
          } else {
          }
        }
      });
    }
  };

  const uploadImageProccess = () => {

    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId
    };

    // console.log("getMenuId " + getMenuId + " getServiceTypeId " + getServiceTypeId);

    fetch("http://103.197.204.22:8007/api/2023-02/order-master-info", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'bearer ' + getToken
      },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        let order_id = data.results.order_master_info.order_id;
        setOrderMasterId(order_id)
        console.log("order_id : " + order_id + " service type id : " + getServiceTypeId);
        fileInfo.map((img_file, index) => {
          const sequence_no = img_file.sequence_no;
          const filePath = img_file.file.webkitRelativePath;
          const imgType = getFileType(img_file.file);
          console.log(sequence_no)
          let data = new FormData();
          data.append("order_master_id", order_id);
          data.append("service_type_id", getServiceTypeId);
          data.append("file", img_file.file);
          data.append("file_relative_path", filePath);
          data.append("subscription_plan_type_id", getSubscriptionPlanId);
          data.append("sequence_no", sequence_no);
          dataTransfer(data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const processImagesAi = () => {
    toast.success("Items Process Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });

    setActionStatus("process");
    setLockMenuBool(true);

    /*
    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId
    };


    fetch("http://103.197.204.22:8007/api/2023-02/order-master-info", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'bearer ' + getToken
      },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        let order_id = data.results.order_master_info.order_id;
        setOrderMasterId(order_id)
        console.log("order_id : " + order_id + " service type id : " + getServiceTypeId);
        fileInfo.map((img_file, index) => {
          const sequence_no = img_file.sequence_no;
          const filePath = img_file.file.webkitRelativePath;
          const imgType = getFileType(img_file.file);
          console.log(sequence_no)
          let data = new FormData();
          data.append("order_master_id", order_id);
          data.append("service_type_id", getServiceTypeId);
          data.append("file", img_file.file);
          data.append("file_relative_path", filePath);
          data.append("subscription_plan_type_id", getSubscriptionPlanId);
          data.append("sequence_no", sequence_no);
          dataTransfer(data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      */

  };

  const dataTransfer = async (formData) => {
    console.log("formData");
    //console.log(await formData);
    // Promise.all(formData).then(data => console.log(data))
    try {
      const response = await fetch(
        "http://103.197.204.22:8008/v.03.13.23/upload-for-ai-processing",
        {
          method: "POST",
          body: formData /*
          headers:{
            'Authorization': 'bearer '+ getToken, 
            'Content-Type': 'application/x-www-form-urlencoded'
        }*/
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(typeof (3 + 1))

      setProccessImgIndex(getProccessImgIndex => getProccessImgIndex + 1);
      console.log(getProccessImgIndex)
      data.status_code == 200 &&
        setAfterBeforeImg((getAfterBeforeImg) => [
          ...getAfterBeforeImg,
          data.results,
        ]);
    } catch (error) {
      console.error(error);
    }
  };

  const dataTransferMyPython = async (data) => {
    let formData = new FormData();

    data.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': 'bearer ' + getToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const myOwnLoop = (order_id, p = 0) => {
    if (fileInfo.length > p) {
      const img_file = fileInfo[p];
      const filePath = img_file.webkitRelativePath;

      const imgType = getFileType(img_file);

      let data = new FormData();
      data.append("order_no", order_id);
      data.append("file_path", "filePath/psdfspd/");
      data.append("api_key", "Agfd11384HSOTITYH@84584DHFDgsdg3746$$FGDSF7hgdh");
      data.append("file", img_file);
      data.append("return_public_url", "True");
      data.append("output_format", "png");

      fetch(api_url, {
        method: "POST",
        body: data,
        headers: {
          'Authorization': 'bearer ' + getToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => res.json())
        .then((result) => {
          setAfterBeforeImg((getAfterBeforeImg) => [
            ...getAfterBeforeImg,
            result,
          ]);
          console.log(result);
          console.log(p);
          myOwnLoop(order_id, p + 1);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            myOwnLoop(order_id, p + 1);
          }
        });
    } else {
      console.log("have no data avaialble");
    }
  };

  const filterFunc = (e) => {
    e.preventDefault();

    Promise.all(fileInfo).then((data) => {
      const suggestList = matchSorter(data, e.target.value, {
        keys: [(data) => data.file.webkitRelativePath],
      });
      setSuggest(suggestList);
    });

    setFilterText(e.target.value);
    if (e.target.value.length > 0) {
      setActionStatus("filter");
      setSuggestBool(true);
      setCurrentPage(1);
    } else {
      setActionStatus("");
      setSuggestBool(false);
    }
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

  const clearFilterText = () => {
    setFilterText("");
    setSuggestBool(false);
    setActionStatus("");
  };

  const clearData = () => {
    document.getElementById("filepicker").value = "";
    document.getElementById("singleImagePick").value = "";

    setMainFile([]);
    setFileInfo([]);
    setImageShow([]);
    setOrderInfo({});
    setLoadProgress(0);
    setActionStatus("");
    setCurrentPage(1);
    // orderInfoFunc();
    setLockMenuBool(false);
  };

  const handleClose = () => {
    setShowImage(false);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const viewImg = (img) => {
    console.log(img);
    setImgIndex(img);
    setShowImage(true);
  };

  const deletImage = (dlImage) => {
    console.log(dlImage);
    setFileInfo(fileInfo.filter((f, index) => index !== dlImage));
    //setFileInfo(fileInfo.filter((f) => f.imageUrl !== dlImage));
    handleClose();
  };

  const upgradCallBack = (bl) => {
    setUpdatePlan(bl);
  };
  const costCallBack = (bl) => {
    setCostBreak(bl);
  };

  useEffect(() => {
    setInterval(() => {
      //  checkAiProccesDone(getAfterBeforeImg);
    }, 2000);

    // getAfterBeforeImg.length > 0 && setActionStatus("process")
  }, [getAfterBeforeImg]);

  return (
    <>
      {console.log("getProccessImgIndex count : " + getProccessImgIndex + " file info length : " + fileInfo.length)}
      {/* console.log("getServiceTypeId : " + getServiceTypeId + "getSubscriptionPlanId : "+ getSubscriptionPlanId) */}
      <div className="flex items-center justify-center mt-3">
        <i className="fa-solid fa-filter text-white mr-1"></i>
        <p className="text-white mr-4">Filter</p>
        <div className="relative w-[395px]">
          <input
            value={getFilterText}
            onChange={filterFunc}
            maxLength={200}
            type="text"
            className="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-5 py-2 pr-10 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Filter File or Folder"
          />

          {getFilterText.length > 0 && (
            <button
              onClick={clearFilterText}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700  cursor-pointer"
            >
              <i className="fa-sharp fa-solid fa-xmark"></i>
            </button>
          )}
          <div id="matchsort" className="absolute bg-white z-10">
            {getSuggestBool == true &&
              getSuggest.map(
                (data, index) =>
                  index < 2 && (
                    <button
                      key={index}
                      onClick={() =>
                        filterBysuggest(data.file.webkitRelativePath)
                      }
                      className="w-full text-left px-[10px] py-[7px] text-gray-900 border-gray-200 border-solid border-b-[1px]"
                    >
                      {data.file.webkitRelativePath}
                    </button>
                  )
              )}
          </div>
        </div>
      </div>
      <div id="middleImageWrap " className="mt-1">
        <input
          onChange={uploadFile}
          type="file"
          id="filepicker"
          name="fileList"
          directory=""
          webkitdirectory=""
        />

        <input
          onChange={uploadFile}
          type="file"
          id="singleImagePick"
          name="imageFile"
          className="hidden"
          accept="image/jpeg, image/png"
          multiple
        />
        <button
          className="hidden"
          id="updatePlan"
          onClick={UpdatePlan}
        ></button>
        <button
          className="hidden"
          id="costPlan"
          onClick={CostPlan}
        ></button>

        <button className="hidden" id="clearData" onClick={clearData}></button>

        {fileInfo.length > 0 && actionStatus == "" && (
          <div>

            {fileInfo.length > getProccessImgIndex && <Loading_2 />}
            {fileInfo.length !== getAfterBeforeImg.length &&
              <div className="fixed top-[50%] left-[50%] z-50" style={{ transform: 'translate(-50%)' }} >
              </div>
            }
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-${fileInfo.length > 3 ? "4" : fileInfo.length
                } lg:grid-cols-${fileInfo.length > 3 ? "4" : fileInfo.length
                } gap-4 pt-5  pr-3`}
            >

              {currentImages.map((image, index) => (
                <div
                  key={index}
                  className={
                    currentImages.length === 1 && "flex justify-center"
                  }
                >
                  {fileInfo.length > getProccessImgIndex ?
                    <div
                      className={`img-container  bg-no-repeat img-bag
                     ${currentImages.length === 1
                          ? "h-[400px] justify-center"
                          : "img-bag"
                        }
                     `}
                      style={{
                        backgroundImage: `url(${image.imageUrl})`,
                      }}
                    /> :
                    <div
                      className={`img-container  bg-no-repeat  cursor-pointer img-bag
                   ${currentImages.length === 1
                          ? "h-[400px] justify-center"
                          : "img-bag"
                        }
                   `}
                      onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                      style={{
                        backgroundImage: `url(${image.imageUrl})`,
                      }}
                    />}


                </div>
              ))}
            </div>
          </div>
        )}

        {fileInfo.length > 0 && actionStatus == "filter" && (
          <>
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-${fileInfo.length > 3 ? "4" : fileInfo.length
                } lg:grid-cols-${fileInfo.length > 3 ? "4" : fileInfo.length
                } gap-4 pt-5 pr-3`}
            >
              {currentImages.map(
                (image, index) =>
                  image.file.webkitRelativePath.indexOf(getFilterText) > -1 && (
                    <div key={index}>
                      <div
                        className="img-container bg-cover bg-no-repeat w-full cursor-pointer img-bag"
                        onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                        style={{
                          backgroundImage: `url(${image.imageUrl})`,
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          </>
        )}

        {fileInfo.length > 0 && actionStatus !== "process" && (
          <div className="flex fixed bg-light-black w-full justify-center  bottom-0">
            {/* Previous button */}
            <button
              disabled={currentPage === 1}
              className="cursor-pointer text-white disabled:text-gray-600"
              onClick={previousPage}
            >
              <i className="fa-solid fa-arrow-left mr-4"></i>
            </button>
            {/* Process */}
            <div className="">
              <button
                disabled={fileInfo.length > getProccessImgIndex}
                onClick={processImagesAi}
                className="disabled:text-gray-800" >
                <i
                  className={`fa-solid fa-arrows-spin pt-1 text-center text-4xl cursor-pointer font-bold ${fileInfo.length > getProccessImgIndex ? 'text-gray-600' : 'text-white'}`}></i>
              </button>
            </div>
            {/* Next Button */}
            <button
              disabled={currentPage === Math.ceil(fileInfo.length / itemsPerPage)}
              className="cursor-pointer text-white disabled:text-gray-600"
              onClick={nextPage}
            >
              <i className="fa-solid fa-arrow-right ml-4"></i>
            </button>
            {/* Image/total count */}
            <div className="text-white ml-60 text-sm mt-2">
              <p>Image Count : {fileInfo.length}</p>
              <p>Total Bill :</p>
            </div>
          </div>
        )}

        {showImage &&
          <div>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
                display: "flex",
                justifyContent: "center",
                backgroundImage: `url(${bg})`
              }}
            >
              <div className="h-[540px] w-[800px] bg-white mt-10 relative rounded-lg z-50">
                <p className="bg-theme-shade text-black absolute top-2 left-0 font-semibold py-1 px-7 rounded-r-3xl">Free</p>
                <div className="  pt-12 pl-16 absolute ">
                  <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                    <img className="h-full" src={fileInfo[getImgIndex].imageUrl} />
                    <p className="absolute top-0 right-0  bg-theme-shade px-3 text-xs py-1  rounded-l-3xl z-10">{fileInfo[getImgIndex].sequence_no}</p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <div>
                      <button className="bg-green-800 text-white rounded-2xl mt-4  px-4 w-40 py-1 hover:bg-white hover:text-black border border-green-800">
                        Download
                      </button>
                      <p className="text-sm text-center mt-1">
                        Preview Image 100/200
                      </p>
                    </div>
                    <div>
                      <button className="bg-white text-black border-green-800 border  rounded-2xl mt-4 px-4 w-40 py-1 hover:bg-green-800 hover:text-white">
                        Download HD
                      </button>
                      <p className="text-sm text-center mt-1">
                        Full Image 2000/3000
                      </p>
                    </div>
                  </div>
                </div>
                {getAfterBeforeImg.length > 0 && getAfterBeforeImg.some(fl => fl.output_urls[0].order_image_detail_sequence_no == fileInfo[getImgIndex].sequence_no) && <ServiceMenu ImageIndex={getImgIndex} />}
              </div>

              <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-52 cursor-pointer text-black disabled:text-gray-200 ">
                  <i className="fa-solid fa-arrow-left text-4xl "></i>
                </button>
                <button disabled={getImgIndex == fileInfo.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-52 cursor-pointer text-black  disabled:text-gray-200 ">
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
                onClick={handleClose}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        }
        {/* showImage && (
          <div
            className="img-container"
            style={{
              position: " fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,

              background: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={fileInfo[getImgIndex].imageUrl}
              className="max-w-full max-h-full w-[600px] h-[400px]"
            />
            <div className="flex mt-5 gap-8 z-20">
              <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="cursor-pointer text-black disabled:text-gray-200 ">
                <i className="fa-solid fa-arrow-left text-4xl "></i>
              </button>
              <button disabled={getImgIndex == fileInfo.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="cursor-pointer text-black  disabled:text-gray-200 ">
                <i className="fa-solid fa-arrow-right text-4xl "></i>
              </button>
            </div>

            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() => deletImage(getImgIndex)}
                className="bg-white w-10 h-10 rounded-full border border-theme-shade"
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
              <button
                onClick={handleClose}
                className="bg-white w-10 h-10 border border-theme-shade rounded-full"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          )*/}

        {/*
            actionStatus == "process" &&
            currentImages.map((data, index) => (
              <div key={index}>
                  <UpdatedImage imgData={data} key={index} callBackImgIndex={callBackImgIndex} />
              </div>
            ))
            */}
        {
          actionStatus == "process" &&
          <ProccessImage />
        }

        {getUpdatePlan && (
          <div className=" absolute top-0 left-96 ">
            <UpgradeAccount upgradCallBack={upgradCallBack} />
          </div>
        )}
        {getCostBreak && (
          <div className=" bg-white absolute top-0 left-0 w-full h-full z-50 ">
            <CostBreakDown costCallBack={costCallBack} />
          </div>
        )}

        <div className="hidden">
          <CouponCode></CouponCode>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Imageupload;
