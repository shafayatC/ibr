import { useContext, useEffect, useState } from "react";
import { OrderContextManager, apiUrlContextManager, userContextManager } from "../../../App";
import "./style.css";

const Rightsidebar = () => {
  const [checked, setChecked] = useState(true);
  const [getServicMenu, setServiceMenu] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId] = useContext(OrderContextManager); 
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager); 

  const loadMenuServiceId =  () => {
    fetch(getApiBasicUrl+'/service-types', { 
      headers:{
          'Authorization': 'bearer '+ getToken, 
          'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then(response => response.json())
      .then(res => {
        const promises = res.results.service_type_list.map(data => {
          const menuList = { ...data, "sub_menu": [] };
          data.is_default == true && setServiceTypeId(data.id); 
          return fetch(`${getApiBasicUrl}/manual-service?service_type_id=${data.id}`, { 
            headers:{
                'Authorization': 'bearer '+ getToken, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(listRes => listRes.json())
            .then(resultList => {
              menuList.sub_menu = resultList.results.service_items;
              return menuList;
            });
        });
        Promise.all(promises).then(menuArray => {
          setServiceMenu(menuArray);
        });
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {

  loadMenuServiceId();

  }, []);

  return (
    <div className="hfull">
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 #e3f2f3:text-gray-300 #e3f2f3:hover:bg-gray-700 #e3f2f3:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="hfull top-0 right-0 z-1 transition-transform -translate-x-full   border-gray-200 sm:translate-x-0 border-opacity-0"
        aria-label="Sidebar"
      >
        <div
          id="rightMenuBarWrap"
          className="hfull  w-36 shadow-2xl ml-24 bg-black-shade pb-4 overflow-y-auto "
        >
          <ul className="space-y-2">
            {getServicMenu.length > 0 && getServicMenu.map((data, index) =>

              <li key={index}>
                <p className="pl-4 bg-gray-200 py-1 font-semibold">{data.name}</p>
                {data.sub_menu.length > 0 && data.sub_menu.map((subData, sIndex) =>
                  <div key={sIndex} className="flex items-center p-2 text-base font-normal hover:border-r-2 hover:border-r-white text-white #e3f2f3:text-#e3f2f3 hover:bg-light-black #e3f2f3:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={subData.is_checked}
                      onChange={() => setChecked(!checked)}
                      id={"check_"+sIndex}
                    />
                    <label htmlFor={"check_"+sIndex} className="ml-3">
                      {subData.name}
                    </label>
                  </div>
                )
               }
              </li>

            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Rightsidebar;
