import { useEffect, useState } from "react";
import "./style.css";

const Rightsidebar = () => {
  const [checked, setChecked] = useState(true);
  const [getAiService, setAiService] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});

  const aiServiceFun = () => {
    fetch("http://27.147.191.97:8008/ai-service")
      .then((res) => res.json())
      .then((data) => {
        setAiService(data);
      })
      .catch((err) => console.log(err));
  };

  const menualServiceFun = () => {
    fetch("http://27.147.191.97:8008/manual-service")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    aiServiceFun();
    menualServiceFun();
  }, []);

  return (
    <div className="hfull">
      {console.log(getAiService && getAiService)}
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
            {/* <p className="pl-4 bg-gray-200 py-1 font-semibold">
              {getAiService && getAiService.Title}
            </p> */}
            {getAiService &&
              getAiService.service_items != undefined &&
              getAiService.service_items.map((data, index) => (
                <li key={index}>
                  {/* <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal hover:border-r-2 hover:border-r-white text-white #e3f2f3:text-#e3f2f3 hover:bg-light-black #e3f2f3:hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={data.is_checked}
                      onChange={() => setChecked(!checked)}
                      id="1"
                    />
                    <label htmlFor="1" className="ml-3">
                      {data.Name}
                    </label>
                  </a> */}
                </li>
              ))}
            {/* <p className="pl-4 bg-gray-200 py-1 font-semibold">
              {" "}
              {items && items.Title}
            </p> */}
            {items &&
              items.service_items != undefined &&
              items.service_items.map((item) => (
                <div key={item.ID}>
                  <li className="ml-2 text-sm text-white hover:border-r-2 hover:border-r-white cursor-pointer #e3f2f3:text-#e3f2f3 hover:bg-light-black">
                    {/* <input type="checkbox" checked={item.is_checked} />{" "}
                    {item.Name} */}
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Rightsidebar;
