import React, { useContext, useEffect, useState } from "react";
import { FileContextManager } from "../../../App";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatedImage from "../../Page3/UpdatedImage";
import processlogo from "./img/process.png";
import { matchSorter } from "match-sorter";

function Imageupload() {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageShow, setImageShow] = useState([]);
  const [imgUrl, setimgUrl] = useState();
  const [actionStatus, setActionStatus] = useState("");
  const [LoadProgress, setLoadProgress] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [getOrderInfo, setOrderInfo] = useState({});
  const [getFilterText, setFilterText] = useState("");
  const [getSuggest, setSuggest] = useState([]);

  const [
    getMainFile,
    setMainFile,
    fileInfo,
    setFileInfo,
    getAfterBeforeImg,
    setAfterBeforeImg,
    getLockMenuBool,
    setLockMenuBool,
  ] = useContext(FileContextManager);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = fileInfo.slice(indexOfFirstItem, indexOfLastItem);

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

    setMainFile(newFile);
    setLoadProgress(0);
    setActionStatus("");

    let i = 0;
    for (const file of newFile) {
      i++;

      setLoadProgress(Math.round((100 / newFile.length) * i));

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
            console.log("The file already exists in the array.");
          } else {
            const imageUrl = URL.createObjectURL(file);
            const fileObject = { file: file, imageUrl: imageUrl };
            setFileInfo((fileInfo) => [...fileInfo, fileObject]);
            console.log("The file does not exist in the array.");
          }
        } else {
          const imageUrl = URL.createObjectURL(file);
          const fileObject = { file: file, imageUrl: imageUrl };
          setFileInfo((fileInfo) => [...fileInfo, fileObject]);
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

  const checkAiProccesDone = (getAfterBeforeImg) => {
    if (getAfterBeforeImg.length > 0) {
      getAfterBeforeImg.map((data, index) => {
        if (data.result[0].is_ai_processed == false) {
          const myCallback = (result) => {
            if (result == "success") {
              getAfterBeforeImg[index].result[0].is_ai_processed = true;
            }
          };

          testImage(data.result[0].output_public_url, myCallback);
        } else {
        }
      });

      console.log("statusIs " + getAfterBeforeImg.length);
    } else {
    }
  };

  const processImagesAi = () => {
    toast.success("Items Process Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setActionStatus("process");
    setLockMenuBool(true);
    let order_id = getOrderInfo && getOrderInfo.order_id;
    let unique_custom_code = getOrderInfo && getOrderInfo.unique_custom_code;
    fileInfo.map((img_file, index) => {
      const filePath = img_file.file.webkitRelativePath;
      const imgType = getFileType(img_file.file);

      let data = new FormData();
      data.append("order_id", order_id);
      data.append("unique_custom_code", unique_custom_code);
      data.append("file", img_file.file);
      data.append("file_relative_path", "filePath/psdfspd");

      dataTransfer(data);
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
      setAfterBeforeImg((getAfterBeforeImg) => [...getAfterBeforeImg, data]);
    } catch (error) {
      console.error(error);
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
    } else {
      setActionStatus("");
    }
  };

  const filterBysuggest = (txt) => {
    setFilterText(txt);
    if (txt.length > 0) {
      setActionStatus("filter");
    } else {
      setActionStatus("");
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
    setimgUrl(img);
    setShowImage(true);
  };

  const deletImage = (dlImage) => {
    console.log(dlImage);
    setFileInfo(fileInfo.filter((f) => f.imageUrl !== dlImage));
    handleClose();
  };

  var x = 0;

  useEffect(() => {
    setInterval(() => {
      checkAiProccesDone(getAfterBeforeImg);
    }, 20000);
    x++;

    x > 0 && orderInfoFunc();
  });

  return (
    <>
      {console.log(fileInfo)}
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

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>

          <div id="matchsort" className="absolute bg-white z-10">
            {getSuggest.map(
              (data, index) =>
                index >= 4 && (
                  <button
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
          accept="image/*"
          multiple
        />

        <button className="hidden" id="clearData" onClick={clearData}></button>

        {fileInfo.length > 0 && actionStatus == "" && (
          <>
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-${
                fileInfo.length > 3 ? "4" : fileInfo.length
              } lg:grid-cols-${
                fileInfo.length > 3 ? "4" : fileInfo.length
              } gap-4`}
            >
              {currentImages.map((image, index) => (
                <div key={index}>
                  <div
                    className={`img-container bg-cover bg-no-repeat w-full cursor-pointer  h-[180px] ${
                      currentImages.length === 3 ? "h-[300px]" : "h-[180px]"
                    } ${currentImages.length === 2 ? "h-[400px]" : "h-[180px]"}
                    ${currentImages.length === 1 ? "h-[500px]" : "h-[180px]"}
                    `}
                    onClick={() => viewImg(image.imageUrl)}
                    style={{
                      backgroundImage: `url(${image.imageUrl})`,
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {fileInfo.length > 0 && actionStatus == "filter" && (
          <>
            <div
              className={`grid sm:grid-cols-1 md:grid-cols-${
                fileInfo.length > 3 ? "4" : fileInfo.length
              } lg:grid-cols-${
                fileInfo.length > 3 ? "4" : fileInfo.length
              } gap-4`}
            >
              {currentImages.map(
                (image, index) =>
                  image.file.webkitRelativePath.indexOf(getFilterText) > -1 && (
                    <div key={index}>
                      <div
                        className="img-container bg-cover bg-no-repeat w-full cursor-pointer h-[180px]"
                        onClick={() => viewImg(image.imageUrl)}
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

        {fileInfo.length > 0 && (
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
              <i className="fa-solid fa-arrow-left mr-2"></i>
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
        )}

        {showImage && (
          <div
            className="img-container"
            style={{
              position: " fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={imgUrl} className="max-w-full max-h-full w-96 h-96" />
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() => deletImage(imgUrl)}
                className="bg-white w-10 h-10 rounded-full"
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
              <button
                onClick={handleClose}
                className="bg-white w-10 h-10 rounded-full"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
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
