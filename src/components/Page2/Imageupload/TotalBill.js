import React, { useContext, useEffect, useState } from 'react';
import { OrderContextManager, userContextManager } from '../../../App';



const TotalBill = ({totalPrice}) => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getTotalPrice, setTotalPrice] = useState(); 

    const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);

    const TotalPrice = () => {

        fetch(`http://103.197.204.22:8007/api/2023-02/cost-breakdown?order_master_image_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTotalPrice(data.results.order_master_charge_breakdown[0].total_charge);
            })
    }

    
    useEffect(()=>{
        TotalPrice()
    },[totalPrice])

    return totalPrice ? totalPrice : getTotalPrice;
};

export default TotalBill;