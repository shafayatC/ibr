import React, { useContext, useEffect } from 'react';
import { OrderContextManager } from '../../App';

const InitialDataLoad = () => {

    const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId] = useContext(OrderContextManager)

    const serviceId = () =>{
        fetch('http://103.197.204.22:8007/api/2023-02/service-types')
        .then(response => response.json())
        .then(data =>{
            data.results.service_type_list.map(dataResult => {
                dataResult.is_default == true && setServiceTypeId(dataResult.id)
            })  
        })
      }
    
      useEffect(() => {
        serviceId()
      }, []);
      
    return (
        <>
            
        </>
    );
};

export default InitialDataLoad;