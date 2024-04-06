import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const ForgetPassForm = ({ email,setemail, handleSubmit }) => {
  return (
    <div className="w-full mx-auto ">
    <div className="mt-3 w-full text-center  mb-8 ">
      <div className="flex  justify-center mb-8">
        <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
          Forget Password
        </h3>
      </div>
      <div className="mt-2 text-center  ">
        <form onSubmit={handleSubmit} className={`my-6 w-full  `}>
          <input
            required
            type="email"
            placeholder="Email"
            className=" text-center p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
            onChange={(e) =>
              setemail(e.target.value)
            }
            value={email}
          />
          <button
            type="submit"
            className={`border border-gray-300 mt-2 rounded font-semibold w-full h-12 bg-megenta-400 text-white`}
          >
            Get Email Verification
          </button>
        </form>
        <Link
                  to={"/auth/signup"}
                  className="flex font-semibold text-zomato-500 text-sm mt-10 cursor-pointer"
                >
                  New user? Create an account
                </Link>
      </div>
    </div>
  </div>
  );
};

export default ForgetPassForm;
