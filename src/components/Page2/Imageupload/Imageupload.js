import React, { useContext, useEffect, useState } from "react";
import { FileContextManager } from "../../../App";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import UpdatedImage from "../../Page3/UpdatedImage";
import processlogo from "./img/process.png";

function Imageupload() {
  const [performancePercent, setPerformancePercent] = useState(100);
  const circumference = 50 * 2 * Math.PI;

  const [currentPage, setCurrentPage] = useState(1);
  //const [fileInfo, setFileInfo] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [imgUrl, setimgUrl] = useState();
  const [actionStatus, setActionStatus] = useState("");
  //const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);
  const [LoadProgress, setLoadProgress] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [getOrderInfo, setOrderInfo] = useState({});
  const [
    getMainFile,
    setMainFile,
    fileInfo,
    setFileInfo,
    getAfterBeforeImg,
    setAfterBeforeImg,
  ] = useContext(FileContextManager);
  const itemsPerPage = 32;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = imageShow.slice(indexOfFirstItem, indexOfLastItem);

  const api_url = "http://27.147.191.97:8008/upload";
  const api_url_py = "http://127.0.0.1:5000/api/upload";
  const api_send = "http://27.147.191.97:8008/upload-file";

  const orderInfoFunc = () => {
    const myOrdre = {
      menu_id: uniqueIdGenerate(20),
      operation_type_id: uniqueIdGenerate(25),
    };

    fetch("http://27.147.191.97:8008/custom-code", {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myOrdre),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadFile = (e) => {
    const newFile = e.target.files;
    console.log(newFile);

    setMainFile(newFile);
    //setFileInfo([]);
    // setImageShow([]);
    setLoadProgress(0);
    setActionStatus("");
    console.log();

    let i = 0;
    for (const file of newFile) {
      i++;

      console.log(file);
      setLoadProgress(Math.round((100 / newFile.length) * i));

      // check file type
      if (file.type == "image/jpeg" || file.type == "image/png") {
        if (fileInfo.length > 0) {
          // check if the images is already exits
          const foundFile = fileInfo.find(
            (fl) =>
              fl.lastModified === file.lastModified &&
              fl.name === file.name &&
              fl.size === file.size &&
              fl.type === file.type
          );

          if (foundFile) {
            console.log("The file already exists in the array.");
          } else {
            setFileInfo((fileInfo) => [...fileInfo, file]);
            const imageUrl = URL.createObjectURL(file);
            setImageShow((imageShow) => [...imageShow, imageUrl]);
            console.log("The file does not exist in the array.");
          }
        } else {
          setFileInfo((fileInfo) => [...fileInfo, file]);
          const imageUrl = URL.createObjectURL(file);
          setImageShow((imageShow) => [...imageShow, imageUrl]);
        }
      }
    }
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

  const checkAiProccesDone = () => {
    if (getAfterBeforeImg.length > 0) {
      getAfterBeforeImg.map((data, index) => {
        if (data.result[0].is_ai_processed == false) {
          testImage(data.result[0].output_public_url, myCallback);

          const myCallback = (result) => {
            if (result == "success") {
              console.log(result);
              getAfterBeforeImg[index].result[0].is_ai_processed = true;
            }
          };
        }
      });

      console.log("statusIs " + getAfterBeforeImg.length);
    } else {
      console.log("none");
    }
  };

  const processImagesAi = () => {
    toast.success("Items Process Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setActionStatus("process");

    // let input = fileInfo;
    let order_id = getOrderInfo && getOrderInfo.order_id;
    let unique_custom_code = getOrderInfo && getOrderInfo.unique_custom_code;
    // console.log(order_id);
    // console.log(unique_custom_code);
    //dataTransferMyPython(fileInfo)
    // myOwnLoop(order_id)

    fileInfo.map((img_file, index) => {
      //console.log(img_file)

      const filePath = img_file.webkitRelativePath;
      const imgType = getFileType(img_file);

      let data = new FormData();
      data.append("order_id", order_id);
      data.append("unique_custom_code", unique_custom_code);
      data.append("file", img_file);
      data.append("file_relative_path", "filePath/psdfspd");
      /*
      data.append("file_path", "filePath/psdfspd");
      data.append("api_key", "Agfd11384HSOTITYH@84584DHFDgsdg3746$$FGDSF7hgdh");
      data.append("file", img_file);
      data.append("return_public_url", "True");
      data.append("output_format", "png");
    */

      dataTransfer(data);
      //checkAiProccesDone()

      /*
      fetch("http://27.147.191.97:8008/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          setAfterBeforeImg(getAfterBeforeImg => [...getAfterBeforeImg, result]);
          console.log(result);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
          */
    });
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
      });
      const data = await response.json();
      //setAfterBeforeImg(getAfterBeforeImg => [...getAfterBeforeImg, data]);
      //console.log(data);
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

  const dataTransfer = async (formData) => {
    try {
      const response = await fetch("http://27.147.191.97:8008/upload-file", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      //console.log(data.result[0]);
      //testImage(data.result[0].output_public_url);
      setAfterBeforeImg((getAfterBeforeImg) => [...getAfterBeforeImg, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearData = () => {
    setMainFile([]);
    setFileInfo([]);
    setImageShow([]);
    setOrderInfo({});
    setLoadProgress(0);
    setActionStatus("");
    setCurrentPage(1);
    orderInfoFunc();
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
    setimgUrl(img);
    setShowImage(true);
  };

  const deletImage = () => {
    //setImageShow(imageShow.filter(f => f !== folder));

    handleClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(getAfterBeforeImg);
    }, 10000);
    orderInfoFunc();

    //return () => clearInterval(interval)
  }, []);

  return (
    <>
      <div class="flex items-center justify-center mt-3">
        <i class="fa-solid fa-filter text-white mr-1"></i>
        <p class="text-white mr-4">Filter</p>
        <div class="relative">
          <input
            type="text"
            class="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-5 py-2 pr-48 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Filter File or Folder"
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 3a6 6 0 1 1-4.24 1.76A6 6 0 0 1 9 3zm11.71 16.29a1 1 0 0 1-1.42 0l-4.17-4.17a8 8 0 1 1 1.42-1.42l4.17 4.17a1 1 0 0 1 0 1.42z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div id="middleImageWrap " className="mt-9">
        {
          //  console.log(getAfterBeforeImg)
        }
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
          accept="image/*"
          multiple
        />

        <button className="hidden" id="clearData" onClick={clearData}></button>
        {imageShow.length > 0 && actionStatus == "" && (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4 relative">
              {currentImages.map((image, index) => (
                <div key={index}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
                    <div
                      onClick={() => viewImg(image)}
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        cursor: "pointer",
                        height: "80px",
                      }}
                    />
                    {showImage && (
                      <div
                        style={{
                          position: " fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 9,
                          background: "rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={imgUrl}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                        <div className="p-1 rounded-full cursor-pointer -mt-80 bg-white ">
                          <i class="fa-regular fa-trash-can w-8 h-8  justify-center"></i>
                        </div>
                        <button
                          onClick={handleClose}
                          style={{
                            position: "relative",
                            top: "-43%",
                            right: 0,
                            background: "white",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex absolute bg-light-black w-3/4  bottom-0">
              {/* progress bar */}
              <div className=" mb-4 mr-40">
                <div className=" w-32 h-4 ml-10 mt-5 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${LoadProgress}%` }}
                  >
                    {LoadProgress}%
                  </div>
                  <p className="text-white text-center text-xs">Complete</p>
                </div>
              </div>
              {/* Previous button */}
              <button
                disabled={currentPage === 1}
                className="cursor-pointer text-white"
                onClick={previousPage}
              >
                <i class="fa-solid fa-arrow-left mr-2"></i>
              </button>
              {/* Process */}
              <div className="">
                <img
                  src={processlogo}
                  onClick={processImagesAi}
                  className="bg-white hover:bg-blue-500 hover:text-white w-12 h-12 text-center text-black text-xs font-bold  rounded-full"
                />

                <ToastContainer />
              </div>
              {/* Next Button */}
              <button
                disabled={
                  currentPage === Math.ceil(imageShow.length / itemsPerPage)
                }
                className="cursor-pointer text-white"
                onClick={nextPage}
              >
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
              {/* Image/total count */}
              <div className="text-white ml-60 text-sm mt-2">
                <p>Image Count :</p>
                <p>Total Bill :</p>
              </div>
            </div>
          </>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-1">
          {getAfterBeforeImg.length > 0 &&
            actionStatus == "process" &&
            getAfterBeforeImg.map((data, index) => (
              <UpdatedImage afterBeforeImage={data} key={index} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Imageupload;
