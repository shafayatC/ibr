import hoody from "./img/hoody.jpg";
import { BiShow, BiDownload } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { OrderContextManager } from "../../App";
import ReactCompareImage from "react-compare-image";

import { Input } from 'antd';

import "./page3.css";
import CompareImage from "../CompareImage/CompareImage";

const ViewDwnld_2 = ({ imagesBeforeAfter }) => {
  const [checked, setChecked] = useState(true);
  const [getServicMenu, setServiceMenu] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu, getSubscriptionPlanId, setSubscriptionPlanId,  getModelBaseUrl, setModelBaseUrl] =
    useContext(OrderContextManager);

  const [isImageVisible, setImageVisibility] = useState(false);

  const before = imagesBeforeAfter.compressed_raw_image_public_url;
  const after = imagesBeforeAfter.default_compressed_output_public_url;
  const isProcess = imagesBeforeAfter.is_ai_processed;

  const handleViewClick = () => {
    setImageVisibility(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseClick = () => {
    setImageVisibility(false);
    document.body.style.overflow = "unset";
  };
  const { TextArea } = Input;
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

/*
  const loadMenuServiceId = () => {
    fetch("http://103.197.204.22:8007/api/2023-02/service-types")
      .then((response) => response.json())
      .then((res) => {
        const promises = res.results.service_type_list.map((data) => {
          const menuList = { ...data, sub_menu: [] };
          data.is_default == true && setServiceTypeId(data.id);
          return fetch(
            `http://103.197.204.22:8007/api/2023-02/manual-service?service_type_id=${data.id}`
          )
            .then((listRes) => listRes.json())
            .then((resultList) => {
              menuList.sub_menu = resultList.results.service_items;
              return menuList;
            });
        });
        Promise.all(promises).then((menuArray) => {
          setServiceMenu(menuArray);
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };
*/

const ordeImageServiceFunc =()=>{

  fetch(`http://103.197.204.22:8007/api/2023-02/order-image-service?id=${imagesBeforeAfter.order_image_service_id}&service_type_id=${getServiceTypeId}&subscription_type_id=${getSubscriptionPlanId}`)
  .then(res => res.json())
  .then(data =>{
    
   data.status_code == 200 && setServiceMenu(data)
  })

}
  useEffect(() => {
    ordeImageServiceFunc()
  }, []);

  return (
    <>
      {isImageVisible && (
        <div>
          <div
            className="bg-green-800"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,

              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="h-[540px] w-[800px] bg-white mt-10 relative rounded-lg">
              <p className="bg-theme-shade text-black absolute top-2 left-0 font-semibold py-1 px-7 rounded-r-3xl">Free</p>
              <div className="  pt-12 pl-16 absolute ">
                <div className="w-[400px] border border-theme-shade  relative">

                <CompareImage
                topImage={before}
                bottomImage={after}
                />
                 {/* 
                  <ReactCompareImage
                    hover={true}
                    leftImage={before}
                    rightImage={after}
                  />
*/}
                  <p className="absolute top-0 right-0  bg-theme-shade px-3 text-xs py-1  rounded-l-3xl">01</p>
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
                <TextArea showCount maxLength={40} onChange={onChange} />
                <button className="bg-green-700 mt-3 font-semibold px-8 rounded-3xl hover:bg-white border border-green-700 hover:text-black py-1 text-white">
                  Send
                </button>
              </div>
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
      )}
      {isProcess && (
        <>
          <button
            className="viewButton h-8 w-8"
            onClick={handleViewClick}
            style={{ cursor: "pointer" }}

          >  <i class="fa-solid fa-circle-check absolute right-1 top-1 text-green-400"></i>
            <i class="fa-solid fa-check absolute right-6 top-1 text-green-400"></i>

          </button>

          {
          /* <div className="grid sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-5">
          <div className="col-span-3 ...">
            <BiShow
              className="h-8 w-8 opacity-40 "
              onClick={handleViewClick}
              style={{ cursor: "pointer" }}
            ></BiShow>
          </div>
         
          <div className="...">
            <a href={after} download>
              <BiDownload className="h-7 w-7 opacity-40"></BiDownload>
            </a>
          </div>
          
        </div>
        */}
        </>
      )}
    </>
  );
};

export default ViewDwnld_2;
