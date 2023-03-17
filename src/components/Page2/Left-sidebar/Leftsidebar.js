import { useState, useEffect, useContext } from "react";
import Toggle from "../../Toggle/Toggle";
import { Modal, Button } from "flowbite-react";
import "./style.css";
import { FileContextManager, OrderContextManager } from "../../../App";

const Leftsidebar = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [id_of_menu, set_id_of_menu] = useState("");
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

  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu] = useContext(OrderContextManager);

  const menuList = () => {
    {/*    if (getMenuId.length > 0) {
      set_id_of_menu(getMenuId);
    } else {
      getMenu.map((data) => data.type == "upload" && set_id_of_menu(data.id));
    }
  */}

    fetch(
      `http://103.197.204.22:8007/api/2023-02/side-menu-bar?menu_id=${getMenuId}&user_id=`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.status_code == 200) {
            setIsLoaded(true);
            setItems(data.results.side_bar_list);
          }
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  };
  useEffect(() => {
    getMenuId.length > 0 && menuList();
  }, [id_of_menu, getMenu]);

  return (
    <>
      <div className="hfull">
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 #e3f2f3:text-gray-400 #e3f2f3:hover:bg-gray-700 #e3f2f3:focus:ring-gray-600"
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
          className="hfull  text-white top-0 left-0 z-40 transition-transform -translate-x-full  border-gray-200 sm:translate-x-0 border-opacity-0"
          aria-label="Sidebar"
        >
          <div className="w-40  hfull pb-4  overflow-y-auto shadow-2xl bg-black-shade">
            <div className="leftBarMenuWrap space-y-2 mt-16">
              {items.length > 0 &&
                items.map((item) => (
                  <>
                    {item.name == "Folder" && (
                      <div
                        key={item.id}
                        onClick={() =>
                          document.querySelector("#filepicker").click()
                        }
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "File" && (
                      <div
                        key={item.id}
                        onClick={() =>
                          document.querySelector("#singleImagePick").click()
                        }
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "URL" && (
                      <div
                        key={item.id}
                        onClick={() => document.querySelector("#").click()}
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "FTP" && (
                      <div
                        key={item.id}
                        onClick={() => document.querySelector("#").click()}
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "AI/Manual" && (
                      <div
                        key={item.id}

                        onClick={() =>
                          document.querySelector("#").click()
                        }
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}
                    {item.name == "Subscription" && (
                      <div
                        key={item.id}
                        onClick={() =>
                          document.querySelector("#updatePlan").click()
                        }
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}
                    {item.name == "Offer/Coupon" && (
                      <div
                        key={item.id}
                        onClick={() => document.querySelector("#").click()}
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "Filter" && (
                      <div
                        key={item.id}
                        onClick={() => document.querySelector("#").click()}
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}

                    {item.name == "Clear" && (
                      <div
                        key={item.id}
                        onClick={() =>
                          document.querySelector("#clearData").click()
                        }
                        className={`leftBarMenu items-center p-2 text-base font-normal text-white hover:bg-light-black hover:border-r-2 hover:border-r-white ${getLockMenuBool && item.is_default_locked == true && " pointer-events-none text-gray-500"}`}
                      >
                        <i className={item.icon}></i> {item.name}
                        {item.highlight.length > 0 && (
                          <span>{item.highlight}</span>
                        )}
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
export default Leftsidebar;
