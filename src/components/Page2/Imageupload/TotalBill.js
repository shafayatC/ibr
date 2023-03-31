import React, { useContext, useEffect, useState } from 'react';
import { menuContextManager, OrderContextManager, userContextManager } from '../../../App';



const TotalBill = ({actionSwitch}) => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getTotalPrice, setTotalPrice] = useState(); 


    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getMenuId, setMenuId,  getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
  
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
    },[actionSwitch])

    return getTotalPrice;
};

export default TotalBill;