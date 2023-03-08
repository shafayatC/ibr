import React from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="container mx-auto">
      <div>
        <section>
          <div class="px-6 mt-20 text-gray-800">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form>
                  <div class="flex flex-row items-center justify-center lg:justify-start">
                    <p class="text-3xl mb-0 mr-4">Lost password</p>
                  </div>

                  <div class="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Email address"
                    />
                  </div>

                  <div class="text-center">
                    <button class="inline-block px-7 w-full mb-5 py-3 bg-theme-shade text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg focus:bg-lime-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      RESET PASSWORD
                    </button>

                    <div className="text-right">
                      <Link to="/log-in">
                        <a href="#!" className="text-green-700">
                          Back to Login
                        </a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
