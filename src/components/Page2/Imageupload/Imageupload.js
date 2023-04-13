import React, { useContext, useEffect, useState } from "react";
import {
  apiUrlContextManager,
  FileContextManager,
  menuContextManager,
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
import Page2 from "../Page2";
import TotalBill from "./TotalBill";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompareImage from "../../CompareImage/CompareImage";
import ServiceTypePop from "../../ServiceTypePop/ServiceTypePop";
import localforage from "localforage";
import { Alert, Space } from 'antd';
import { green, red } from '@ant-design/colors';
import { Progress } from 'antd';

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
  const [getSwitchLoop, setSwitchLoop] = useState(false);
  //const [getProccessImgIndex, setProccessImgIndex] = useState(0)
  const [getCallbackAiBool, setCallbackAiBool] = useState(false);
  const [getIpm, setIpm] = useState(0);
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
    setActionStatus,
    getProccessImgIndex,
    setProccessImgIndex,
    getTotalImage,
    setTotalImage
  ] = useContext(FileContextManager);
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

  const [getUpdatePlan, setUpdatePlan] = useState(false);
  const [getCostBreak, setCostBreak] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const UpdatePlan = () => {
    setUpdatePlan(true);
  };
  const CostPlan = () => {
    setCostBreak(true);
  };

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  //  -----------Login Modal ----------------------
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



  const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails, getSrvPopBool, setSrvPopBool] = useContext(OrderContextManager);
  const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.length > getProccessImgIndex ? fileInfo.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem) ;
  const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem);

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

    if (getAfterBeforeImg.length > 0) {
      console.log("update file")
      updateOrderFile(newFile);
    } else {
      console.log("new file")

      newOrderCreate(newFile);
    }

  };

  const newOrderCreate = (newFile) => {

    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId
    };

    console.log(myOrdre)
    fetch(getApiBasicUrl + "/order-master-info", {
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
        console.log(data);
        setOrderMasterId(order_id)
        setTotalImage(0)
        setProccessImgIndex(0)

        let i = 0;
        for (const file of newFile) {

          if (file.type == "image/jpeg" || file.type == "image/png") {
            i++;
            setTotalImage(i)
            console.log(file)
            const filePath = file.webkitRelativePath.split("/");
            filePath.pop();
            console.log(filePath.join("/"))
            let data = new FormData();
            data.append("order_master_id", order_id);
            data.append("service_type_id", getServiceTypeId);
            data.append("file", file);
            data.append("file_relative_path", filePath.join("/"));
            data.append("subscription_plan_type_id", getSubscriptionPlanId);
            dataTransfer(data);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const updateOrderFile = (newFile) => {

    let i = 0;
    for (const file of newFile) {

      if (file.type == "image/jpeg" || file.type == "image/png") {
        i++;
        setTotalImage(i)
        console.log(file)
        const filePath = file.webkitRelativePath.split("/");
        filePath.pop();
        console.log(filePath.join("/"))
        let data = new FormData();
        data.append("order_master_id", getOrderMasterId);
        data.append("service_type_id", getServiceTypeId);
        data.append("file", file);
        data.append("file_relative_path", filePath.join("/"));
        data.append("subscription_plan_type_id", getSubscriptionPlanId);
        dataTransfer(data);
      }
    }
  }
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

    // console.log("testing ai process" + " total + " + getAfterBeforeImg.length + " => "+ getIpm);

    if (getAfterBeforeImg.length > 0) {
      if (getAfterBeforeImg.length > getIpm) {
        getAfterBeforeImg.map((data, index) => {
          // console.log(data);
          if (typeof data.output_urls[0] !== "undefined") {
            if (data.output_urls[0].is_ai_processed == false) {
              const myCallback = (result) => {
                if (result == "success") {
                  //   let newArr = [...getAfterBeforeImg]; // copying the old datas array
                  //   // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
                  //   newArr[index].output_urls[0].is_ai_processed = true; // replace e.target.value with whatever you want to change it to
                  // console.log("true ")
                  //   setAfterBeforeImg(newArr);
                  getAfterBeforeImg[index].output_urls[0].is_ai_processed = true;
                  setIpm(getIpm + 1)
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
    }
  };

  const uploadImageProccess = () => {

    const myOrdre = {
      menu_id: getMenuId,
      service_type_id: getServiceTypeId,
      subscription_plan_type_id: getSubscriptionPlanId
    };


    fetch(getApiBasicUrl + "/order-master-info", {
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
  const toastMessage = () => {
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
      // const response = await fetch(`http://103.197.204.22:8008/v.03.13.23/upload-for-ai-processing`,
      const response = await fetch(`${getModelBaseUrl}upload-for-ai-processing`,
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
      if (data.status_code == 200) {
        // getAfterBeforeImg[dlImage].output_urls[0].order_image_detail_id
        const found = getAfterBeforeImg.some(el => el.output_urls[0].compressed_raw_image_public_url === data.results.output_urls[0].compressed_raw_image_public_url);
        // console.log( getAfterBeforeImg.output_urls[0].compressed_raw_image_public_url + " => "+ data.results.output_urls[0].compressed_raw_image_public_url); 
        found == false && setAfterBeforeImg((getAfterBeforeImg) => [
          ...getAfterBeforeImg,
          data.results,
        ]);

      }

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

    Promise.all(getAfterBeforeImg).then((data) => {
      // const imagePath = data.output_urls[0].compressed_raw_image_public_url.split('CompressedRaw'); 
      console.log(data);
      const suggestList = matchSorter(data, e.target.value, {
        keys: [(data) => data.output_urls[0].compressed_raw_image_public_url],
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
  /*
  
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
  */
  const filterBysuggest = (txt) => {
    setFilterText(txt);
    setSuggestBool(false);
    if (txt.length > -1) {
      setActionStatus("filter");
    } else {
      setActionStatus("");
    }
  };
  /*
    const filterBysuggest = (txt) => {
      setFilterText(txt);
      setSuggestBool(false);
      if (txt.length > -1) {
        setActionStatus("filter");
      } else {
        setActionStatus("");
      }
    };
  */
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
    setTotalImage(0)
    setProccessImgIndex(0)
    setAfterBeforeImg([])
  };

  const handleClose = () => {
    setShowImage(false);
    switchLoopFunc()
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
    //console.log(dlImage);

    // const ImageIndex = getAfterBeforeImg.map((fl) => { return parseInt(fl.output_urls[0].order_image_detail_sequence_no) }).indexOf(fileInfo[getImgIndex].sequence_no);

    // console.log(getAfterBeforeImg[ImageIndex].output_urls[0].order_image_detail_id)

    const delateInfo = {
      "id": getAfterBeforeImg[dlImage].output_urls[0].order_image_detail_id,
      "is_deleted": true
    }

    fetch(getApiBasicUrl + "/update-order-image-detail", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'bearer ' + getToken
      },
      body: JSON.stringify(delateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setFileInfo(fileInfo.filter((f, index) => index !== dlImage));
        setAfterBeforeImg(getAfterBeforeImg.filter((f, index) => index !== dlImage))
        // setProccessImgIndex(getProccessImgIndex - 1)
        handleClose();
      })

    //setFileInfo(fileInfo.filter((f) => f.imageUrl !== dlImage));
  };

  const upgradCallBack = (bl) => {
    setUpdatePlan(bl);
  };
  const costCallBack = (bl) => {
    setCostBreak(bl);
  };

  const switchLoopFunc = () => {

    setSwitchLoop(!getSwitchLoop)
  }

  const callBackIsAiProccess = (bl) => {
    setCallbackAiBool(bl)
  }
  const callbackSrvTyepPop = (bl) => {
    console.log(bl)
    setSrvPopBool(bl)
  }

  const reviewPaymentFunc = async () => {
    // openModal()

    try {
      const data = await localforage.getItem('userInfo');
      // This code runs once the value has been loaded
      // from the offline store.
      if (data !== null && Object.keys(data).length > 0) {

        console.log(data)
        setUserInfo(data);
        setToken(data.results.token);

        const orderId = {
          "id": getOrderMasterId
        }

        fetch(getApiBasicUrl + "/update-order-master-info-by-id", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'bearer ' + data.results.token
          },
          body: JSON.stringify(orderId),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.status_code == 200) {
              navigate('/cart')
            } else {
              setIsOpen(true);
            }
          })

      } else {
        openModal()
      }
    } catch (err) {
      console.log(err);
      openModal()
    }


    // localforage.getItem("userInfo").then(data => {
    //   if (data !== null && Object.keys(data).length > 0) {
    //     console.log(data)
    //     setUserInfo(data);
    //     setToken(data.results.token);

    //     const orderId = {
    //       "id": getOrderMasterId
    //     }

    //     fetch(getApiBasicUrl + "/update-order-master-info-by-id", {
    //       method: "POST", // or 'PUT'
    //       headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': 'bearer ' + getToken
    //       },
    //       body: JSON.stringify(orderId),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         if (data.status_code == 200){
    //           navigate('/cart')
    //         } else {
    //           setIsOpen(true);
    //         }
    //       })

    //   } else {
    //     openModal()
    //   }
    // })
    //   .catch((error) => { console.log(error) });
  }
  useEffect(() => {

    setInterval(() => {
      checkAiProccesDone(getAfterBeforeImg);
    }, 2000);

    // getAfterBeforeImg.length > 0 && setActionStatus("process")
  }, [getAfterBeforeImg, getIpm]);

  // useEffect(() => {

  //   setInterval(() => {
  //       checkAiProccesDone(getAfterBeforeImg);
  //   }, 2000); 

  //   // getAfterBeforeImg.length > 0 && setActionStatus("process")
  // }, [getAfterBeforeImg]);
  return (
    <>
      <Page2>
        <div className="container  mx-auto">
          {console.log("ipm :  " + getIpm)}
          {
            console.log("master id : " + getOrderMasterId + " token: " + getToken)
          }
          {console.log(getAfterBeforeImg)}
          {/* console.log("getServiceTypeId : " + getServiceTypeId + "getSubscriptionPlanId : "+ getSubscriptionPlanId) */}
          <div className="flex items-center justify-center mt-3">
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

              {getFilterText.length > 0 && (
                <button
                  onClick={clearFilterText}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700  cursor-pointer"
                >
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
              )}

              <div id="matchsort" className="absolute bg-white z-40 left-[50%] min-w-full">
                {getSuggestBool == true &&
                  getSuggest.map(
                    (data, index) =>
                      index < 2 && (
                        <button
                          key={index}
                          onClick={() =>
                            filterBysuggest(data.output_urls[0].filter_image_file_path)
                          }
                          className="w-full text-left px-[10px] py-[7px] text-gray-900 border-gray-200 border-solid border-b-[1px]"
                        >
                          {data.output_urls[0].filter_image_file_path}
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

            {getTotalImage > getProccessImgIndex && <Loading_2 />}


            {getAfterBeforeImg.length > 0 && actionStatus == "" &&
              <div >

                <div className={`grid sm:grid-cols-1  md:grid-cols-${getAfterBeforeImg.length > 3 ? "4" : getAfterBeforeImg.length} lg:grid-cols-${getAfterBeforeImg.length > 3 ? "4" : getAfterBeforeImg.length} gap-4 pt-2 ml-2  pr-3`}>

                  {currentImages.map((image, index) => (
                    <div
                      key={index}
                      className={
                        getAfterBeforeImg.length === 1 ? "flex relative justify-center " : "relative"
                      }

                    >
                      {getTotalImage > getProccessImgIndex ?
                        <div
                          className={`img-container  bg-no-repeat img-bag
                          ${getAfterBeforeImg.length === 1
                              ? "h-[400px] justify-center"
                              : "img-bag"
                            }
                            
                     `}
                          style={{ backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})` }}
                        />

                        :
                        <div
                          className={`img-container  bg-no-repeat  cursor-pointer img-bag
                      ${getAfterBeforeImg.length === 1
                              ? "h-[400px] justify-center"
                              : "img-bag"
                            }
                   `}
                          onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                          style={{
                            backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})`,
                          }}
                        />

                      }
                      <div className="flex gap-1  ">
                        {image.output_urls[0].is_ai_processed ?
                          <p><i className="fa-solid text-green-400 absolute top-2 right-2 fa-circle-check"></i></p>
                          :
                          <p className="loader_2 absolute top-[40%] left-[45%]"></p>
                        }
                      </div>
                    </div>
                  ))}

                </div>


              </div>
            }

            {getAfterBeforeImg.length > 0 && actionStatus == "filter" && (
              <>
                <div
                  className={`grid sm:grid-cols-1 md:grid-cols-${getSuggest.length > 3 ? "4" : getSuggest.length
                    } lg:grid-cols-${getSuggest.length > 3 ? "4" : getSuggest.length
                    } gap-4 pt-5 pr-3`}
                >
                  {currentImages.map(
                    (image, index) =>
                      image.output_urls[0].compressed_raw_image_public_url.toLowerCase().indexOf(getFilterText.toLowerCase()) > -1 && (
                        <div key={index}
                          className={
                            getSuggest.length === 1 && "flex justify-center"
                          }
                        >
                          {getTotalImage > getProccessImgIndex ?
                            <div
                              className={`img-container  bg-no-repeat img-bag
                       ${getSuggest.length === 1
                                  ? "h-[400px] justify-center"
                                  : "img-bag"
                                }
                       `}
                              style={{ backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})` }}
                            /> :
                            <div
                              className={`img-container  bg-no-repeat  cursor-pointer img-bag
                        ${getSuggest.length === 1
                                  ? "h-[400px] justify-center"
                                  : "img-bag"
                                }
                     `}
                              onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                              style={{
                                backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})`,
                              }}
                            />}


                        </div>
                      )
                  )}

                </div>
              </>
            )}
            {/*

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

        {getAfterBeforeImg.length > 0 && actionStatus !== "process" && (
          <div className="flex fixed bg-light-black w-full justify-center  bottom-0">
            {/* Previous button */}
            {/* <button
              disabled={currentPage === 1}
              className="cursor-pointer text-white disabled:text-gray-600"
              onClick={previousPage}
            >
              <i className="fa-solid fa-arrow-left mr-4"></i>
            </button> */}
            {/* Process */}
            {/* <div className="">
              <button
                disabled={getAfterBeforeImg.length > getProccessImgIndex}
                onClick={processImagesAi}
                className="disabled:text-gray-800" >
                <i
                  className={`fa-solid fa-arrows-spin pt-1 text-center text-4xl cursor-pointer font-bold ${getAfterBeforeImg.length > getProccessImgIndex ? 'text-gray-600' : 'text-white'}`}></i>
              </button>
            </div> */}
            {/* Next Button
            <button
              disabled={currentPage === Math.ceil(getAfterBeforeImg.length / itemsPerPage)}
              className="cursor-pointer text-white disabled:text-gray-600"
              onClick={nextPage}
            >
              <i className="fa-solid fa-arrow-right ml-4"></i>
            </button> */}
            {/* Image/total count */}

            {
/*
            <div className="text-white ml-60 text-sm mt-2">
              <p>Image Count : {getAfterBeforeImg.length}</p>

              <p>Total Bill : {getTotalImage == getProccessImgIndex &&  <TotalBill actionSwitch={getSwitchLoop} />}</p>
            </div>
            <div className="self-center">
              <Link to="/cart">
                <button className=" bg-white text-black hover:bg-green-400 hover:text-white px-3 rounded-lg py-1 font-semibold">Checkout</button>
              </Link>
            </div>
          </div>
        )}
*/}
            {/* {getAfterBeforeImg.length > 0 &&

            <div className="flex fixed bg-light-black  justify-center rounded-md px-4 gap-5 right-16  bottom-2">
              <div className="text-white self-center font-semibold text-sm py-1">
                <p>Image Count : {getAfterBeforeImg.length}</p>

                <p>Total Bill : {getTotalImage == getProccessImgIndex && <TotalBill actionSwitch={getSwitchLoop} />}</p>
              </div>
              {getTotalImage == getProccessImgIndex ? getUserInfo.status_code == 200 ?

                <div className="self-center text-sm">
                  <Link to="/cart">
                    <button className=" bg-white text-black hover:bg-green-400 hover:text-white px-3 rounded-lg py-1 font-semibold">Checkout</button>
                  </Link>
                </div>
                :
                <div className="self-center text-sm">

                  <button onClick={openModal} className=" bg-white text-black hover:bg-green-400 hover:text-white px-3 rounded-lg py-1 font-semibold">Checkout</button>

                </div>
                : ""
              }
            </div>

          } */}
            {/* {getTotalImage > 0 && getTotalImage === getProccessImgIndex &&

              <Space
                direction="vertical"
                style={{
                  textAlign: "start",
                  width: '400px',
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "999"



                }}
              >
                <Alert
                  style={{ fontWeight: "500" }}

                  message="Add-on Image Services"
                  description="Please click on the image to access additional services..."

                  closable
                  onClose={onClose}
                />
              </Space>
            } */}
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
                  <div className="h-[550px] w-[800px] bg-white mt-5 relative rounded-md z-50">

                    <p className=" text-white px-2 py-1 rounded-lg absolute top-1 bg-teal-500 left-20  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                    <p className="bg-teal-500 text-white absolute top-1 right-0 mb-10 font-semibold py-1 px-4 w-60 rounded-l-3xl">Choose Your Services</p>
                    <div className="  pt-20 pl-16 absolute ">
                      <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                        {getCallbackAiBool ?
                          <CompareImage
                            topImage={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].compressed_raw_image_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                            bottomImage={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].default_compressed_output_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                          /> :
                          <img className="h-full" src={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].compressed_raw_image_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                        }
                        <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                      </div>
                    </div>

                    {getAfterBeforeImg.length > 0 && <ServiceMenu callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                  </div>

                  <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                    <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-black ">
                      <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                      {/* <i className="fa-solid fa-circle-chevron-left"></i> */}
                    </button>
                    <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-black ">
                      <i className="fa-solid fa-circle-chevron-right text-4xl "></i>
                      {/* <i className="fa-solid fa-circle-chevron-right"></i> */}
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
              <div className=" absolute top-0 left-[50%] z-50 " style={{ transform: 'translateX(-50%)' }}>
                <UpgradeAccount upgradCallBack={upgradCallBack} />
              </div>
            )}
            {/* {getCostBreak && (
          <div className=" bg-white absolute top-0 left-0 -ml-2 w-full h-full z-[999]">
            <CostBreakDown costCallBack={costCallBack} />
          </div>
        )} */}

            {/* <div className="hidden">
          <CouponCode></CouponCode>
        </div> */}
          </div>
          <ToastContainer />
          {/* --------------------Login Modal Start------------------- */}
          <>
            {isOpen && (
              <div className="fixed inset-0 z-50 top-48 ">
                <div className="flex  bg-white w-[400px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 "
                    aria-hidden="true"
                    onClick={closeModal}
                  >
                    <div className="absolute inset-0 bg-gray-600 opacity-80"></div>

                  </div>

                  <div
                    className="inline-block w-[450px] h-[160px] align-bottom border border-teal-700 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">

                        <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-2xl leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Please Login to your account
                          </h3>

                        </div>
                      </div>
                    </div>
                    <div className=" py-4 flex gap-4 justify-center ">

                      <Link to="/log-in" state={{ prevPath: location.pathname }}>
                        <button className="text-white w-20 bg-green-400  px-1 py-1 rounded-md">
                          Login
                        </button>
                      </Link>
                      <button

                        className="text-white w-20 bg-red-400  px-1 py-1 rounded-md"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
          {/* -------------Login Modal End------------------- */}

          {getSuggestBool == true && <div onClick={() => setSuggestBool(false)} className="absolute w-full h-full left-0 top-0 z-30"></div>}
        </div>

        {getAfterBeforeImg.length > 0 &&

          <div className="imageBottomMenu absolute container left-[50%] bottom-0 w-full ">

            <div className="flex mb-3 justify-between w-full    ">
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
                  disabled={currentPage === Math.ceil(actionStatus == "filter" ? getSuggest.length / itemsPerPage : getAfterBeforeImg.length / itemsPerPage)}
                  className="cursor-pointer text-white disabled:text-gray-500"
                  onClick={nextPage}
                >
                  <i className="fa-solid text-2xl mr-3 fa-circle-chevron-right "></i>
                </button>
              </div>
            </div>

            <div className="flex bg-light-black justify-between float-right mb-3 w-full rounded-md px-4 gap-5 ">
              <div className="pt-2">
                <Link to="/cost-breakdown">
                  <button className="bg-white rounded-lg px-3 py-1"><i className="fa-solid mr-3 fa-file-invoice-dollar"></i>Charge Breakdown</button>
                </Link>
              </div>
              {/* <div className="flex justify-center items-center gap-3">
                {getTotalImage > getProccessImgIndex && <p className="loader_3 "></p>}
                <div className="shadow w-40 bg-white ">
                  <div className="bg-teal-500 text-xs leading-none text-center text-white"
                   style={{width: (100/getTotalImage) * getProccessImgIndex+'%'}}>
                    {Math.round(100/getTotalImage) * getProccessImgIndex < 100 ? Math.round(100/getTotalImage) * getProccessImgIndex : 100}%
                  </div>
                </div>
              </div> */}
              <div className="flex gap-5">
                <div className="text-white self-end font-semibold text-sm py-1">
                  <p>Total Image(s) : {getAfterBeforeImg.length}</p>

                  {getTotalImage == getProccessImgIndex && <p>Total Charge :  <TotalBill actionSwitch={getSwitchLoop} /></p>}
                </div>
                {getTotalImage == getProccessImgIndex ?

                  <div className="self-center text-sm">
                    <button onClick={reviewPaymentFunc}>
                      <button className=" bg-white text-black hover:bg-green-400 hover:text-white px-3 rounded-lg py-1 font-semibold">Review Payment</button>
                    </button>
                  </div>
                  : ""
                }
              </div>
            </div>


          </div>
        }
      </Page2>
      {console.log("getSrvPopBool : " + getSrvPopBool)}
      {getSrvPopBool == true && <ServiceTypePop callbackSrvTyepPop={callbackSrvTyepPop} />}
    </>
  );
}

export default Imageupload;
