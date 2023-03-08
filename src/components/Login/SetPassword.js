import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetPassword = () => {
  const showToastMessage = () => {
    toast.success("Successfully set password", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="container mx-auto">
      <div class="px-6 mt-20 text-gray-800">
        <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div class="flex flex-row items-center justify-center lg:justify-start">
                <p class="text-3xl mb-0 mr-4">Set Password</p>
              </div>

              <div class="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                />
              </div>

              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Confirm Password"
                />
              </div>
            </form>
            <div class="text-center">
              <button
                onClick={showToastMessage}
                className=" w-full mb-5 py-3 bg-theme-shade text-white font-medium rounded-md text-sm "
              >
                CREATE PASSWORD
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
