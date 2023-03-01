import React, { useEffect, useState } from "react";

const Toggle = () => {
  const fakeUser = "shafayat";

  const [getOperation, setOperation] = useState([]);
  const [getToggleVal, setToggleVal] = useState(false);

  const loadOperation = () => {
    fetch("http://27.147.191.97:8008/operation-type")
      .then((res) => res.json())
      .then((data) => {
        setOperation(data.operation_types);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleOnchange = (e) => {
    setToggleVal(e.target.checked);
  };

  useEffect(() => {
    loadOperation();
  }, []);

  return (
    <>
      <div className="leftBarMenu flex items-center p-2 text-base flex-col font-normal text-gray-900 hover:border-r-2 hover:border-r-yellow-300 hover:bg-gray-100 ">
        {fakeUser == "shafayat" && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={toggleOnchange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-400"></div>
          </label>
        )}
        <p className="  py-2 px-4 text-sm font-semibold rounded">
          {fakeUser == "shafayat" &&
            getOperation.length > 0 &&
            getToggleVal === false &&
            getOperation[0].Description}
          {fakeUser == "shafayat" &&
            getOperation.length > 0 &&
            getToggleVal === true &&
            getOperation[1].Description}
          {fakeUser != "shafayat" &&
            getOperation.length > 0 &&
            getOperation[2].Description}
        </p>
      </div>
    </>
  );
};

export default Toggle;
