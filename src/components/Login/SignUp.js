import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { userContextManager } from "../../App";

const SignUp = () => {

  const [getMail, setMail] = useState("");
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

  const showToastMessage = () => {
    toast.success("Successfully Signup", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessageWarning = (msg) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  const showToastMessageError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onChangeMail = (e) => {
    setMail(e.target.value);
  }
  const singUpFunc = async () => {


    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (getMail.match(validRegex)) {
      const regMail = { "email": getMail }
      try {

        const rawResponse = await fetch('http://103.197.204.22:8007/api/2023-02/system-sign-up', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ getToken
          },
          body: JSON.stringify(regMail)
        });

        const res = await rawResponse.json();
        res.status_code == 200 ? showToastMessage() : showToastMessageWarning(res.message)
  
      } catch (error) {
        console.log(error)
      }
    } else {
      showToastMessageError("email format is not valide")
    }
  }

  return (
    <div className="container mx-auto">
      <div className="px-6 mt-20 mb-20 text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-3xl mb-0 mr-4">Signup</p>
            </div>

            <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Email address"
                onChange={onChangeMail}
              />
            </div>

            {/* <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-shade  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="exampleCheck2"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  for="exampleCheck2"
                >
                  I agree to the Terms of Use and Privacy Policy
                </label>
              </div>

              <p className="text-xs mb-4 mt-4">
                By creating an account, your username becomes public and can be
                read by anyone who visits the website. Do not include sensitive
                data like IDs, credentials, or non-public information. Learn how
                to edit your username. Learn how to delete your account.
              </p> */}
            <div className="text-center">
              <button
                onClick={singUpFunc}
                className=" w-full mb-5 py-3 bg-theme-shade text-white font-medium text-sm "
              >
                Create Account
              </button>
              <ToastContainer />
              {/* <p className="mb-5 font-semibold">OR SIGN IN WITH</p>
                <div className="flex justify-center gap-5">
                  <button className="py-3 text-sm px-2 w-full border-2 border-black text-black font-medium  uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg ">
                    Facebook
                  </button>
                  <button className="py-3 text-sm px-2 w-full border-2 border-black text-black font-medium  uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg ">
                    Google
                  </button>
                  <button className="py-3 text-sm px-2 w-full border-2 border-black text-black font-medium  uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg ">
                    Twitter
                  </button>
                  <button className="py-3 text-sm px-2 w-full border-2 border-black text-black font-medium  uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg ">
                    Apple
                  </button>
                </div> */}
              <p className="text-sm font-semibold mt-2 pt-1  mb-0">
                Already have an account?
                <Link to="/log-in">
                  <a
                    href="#!"
                    className="text-red-600 hover:text-lime-400 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Log in here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
