import React, { useContext, useState } from 'react';
import Page2 from '../../Page2/Page2';
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../../App';
import { useParams } from 'react-router-dom';
import CompareImage from '../../CompareImage/CompareImage';
import bg from '../../../img/Background-for-RA.png';

const MyOrderDetailPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showImage, setShowImage] = useState(false);
    const [getImgIndex, setImgIndex] = useState();

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager)
    const [getOrderDetailInfo, setOrderDetailInfo] = useState([])

    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.length > getProccessImgIndex ? fileInfo.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem) ;
    const currentImages = getOrderDetailInfo.slice(indexOfFirstItem, indexOfLastItem);

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
    const handleClose = () => {
        setShowImage(false);
       // switchLoopFunc()
      };
    const viewImg = (img) => {
        console.log(img);
        setImgIndex(img);
        setShowImage(true);
      };

    useState(() => {
        getUserInfo.status_code == 200 && viewOrderInfo();
    }, [getToken])
    return (
        <>
            {console.log(getToken)}
            {console.log(getOrderDetailInfo)}
            <Page2>
                {typeof getOrderDetailInfo !== 'undefined' && getOrderDetailInfo.length > 0 &&
                    <div>
                        <div className={`grid sm:grid-cols-1 md:grid-cols-${getOrderDetailInfo.length > 3 ? "4" : getOrderDetailInfo.length} lg:grid-cols-${getOrderDetailInfo.length > 3 ? "4" : getOrderDetailInfo.length} gap-4 pt-2 ml-2  pr-3`}>
                            {currentImages.map((data, index) => (
                                <div key={index} className={ getOrderDetailInfo.length === 1 && "flex justify-center" }>
                                    <div className={`img-container  bg-no-repeat  cursor-pointer img-bag ${getOrderDetailInfo.length === 1 ? "h-[400px] justify-center" : "img-bag" }`}
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
                          <img className="h-full" src={getOrderDetailInfo[getImgIndex].compressed_raw_url} />
                        <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{getImgIndex+1}</p>
                      </div>
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
            </Page2>
        </>
    );
};

export default MyOrderDetailPage;