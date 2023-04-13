import React from "react";
import './style.css'

const LoginWithSocial = () => {
    return (
        <div className="container mx-auto">
            <div class="flex items-center justify-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            {/* <p className="mb-5 font-semibold">OR SIGN IN WITH</p> */}
            <div className="flex flex-col justify-center w-full  gap-5">
                <div className=" flex justify-center">
                    <button className="py-1 text-xs px-2 gap-5 center-line w-60  border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i class="fa-brands text-xl  fa-facebook"></i>
                        Sign in with Facebook
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className="py-1 text-xs px-2 gap-5 w-60 center-line border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i class="fa-brands  text-xl fa-google"></i>
                        Sign in with Google
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className="py-1 text-xs px-2 gap-5 w-60 center-line border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i class="fa-brands text-xl  fa-apple"></i>
                        Sign in with Apple
                    </button>
                </div>
            </div>
        </div>
    )

}

export default LoginWithSocial;