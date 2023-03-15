import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderContextManager } from '../../App';

const InitialDataLoad = () => {

    const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu, setMenu] = useContext(OrderContextManager)

    const location = useLocation(); 

    const serviceId = () =>{
        fetch('http://103.197.204.22:8007/api/2023-02/service-types')
        .then(response => response.json())
        .then(data =>{
            data.results.service_type_list.map(dataResult => {
                dataResult.is_default == true && setServiceTypeId(dataResult.id)
            })  
        })
      }

      const menuFunc = () =>{
        fetch("http://103.197.204.22:8007/api/2023-02/menu")
        .then((res) => res.json())
        .then(
          (data) => {
            setMenu(data.results.menu_list);
            data.results.menu_list.map(menuData => {
                console.log(location.pathname  == menuData.url); 
                if(location.pathname == menuData.url){
                    setMenuId(menuData.id)
                }
            })
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      useEffect(() => {
        serviceId()
        menuFunc()
      }, []);
      
    return (
        <>
        </>
    );
};

export default InitialDataLoad;