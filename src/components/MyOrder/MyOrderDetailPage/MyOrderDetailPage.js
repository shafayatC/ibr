import React, { useContext, useState } from 'react';
import Page2 from '../../Page2/Page2';
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../../App';
import { useParams } from 'react-router-dom';

const MyOrderDetailPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
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

        console.log("order id : " + orderId +  " token :  " + getToken)
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
                            {currentImages.map((image, index) => (
                                <div>
                                        <img src='https://www.tenforums.com/attachments/customization/238715d1561799546t-how-get-windows-10-s-old-default-desktop-background-back-image.png'/>
                                </div>
                            ))}
                        </div>
                    </div>
                }

            </Page2>
        </>
    );
};

export default MyOrderDetailPage;