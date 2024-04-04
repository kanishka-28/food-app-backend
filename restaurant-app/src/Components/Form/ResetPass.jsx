import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const ResetPassForm = ({ data, setdata, handleSubmit }) => {

  const [showPass, setshowPass] = useState(false);
  const [showNewPass, setshowNewPass] = useState(false);
  const [showCnfPass, setshowCnfPass] = useState(false);

  return (
    <div className="w-full mx-auto ">
      <div className="mt-3 w-full text-center  mb-8 ">
        <div className="flex  justify-center mb-8">
          <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
            Change Password
          </h3>
        </div>
        <div className="mt-2 text-center  ">
          <form onSubmit={handleSubmit} className={`my-6 w-full  `}>
    
            <div className="mb-2 flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
              <input
                required
                type={!showNewPass ? "password" : "text"}
                placeholder="New Password"
                className="text-center  w-full h-12 "
                onChange={(e) => setdata({ ...data, password: e.target.value })}
                value={data.password}
              />
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setshowNewPass(!showNewPass);
                }}
              >
                {showNewPass ? (
                  <AiOutlineEye size="1.4rem" />
                ) : (
                  <AiOutlineEyeInvisible size="1.4rem" />
                )}
              </div>
            </div>
            <div className=" flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
              <input
                required
                type={!showCnfPass ? "password" : "text"}
                placeholder="Confirm New Password"
                className="text-center  w-full h-12 "
                onChange={(e) => setdata({ ...data, cnfPass: e.target.value })}
                value={data.cnfPass}
              />
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setshowCnfPass(!showCnfPass);
                }}
              >
                {showCnfPass ? (
                  <AiOutlineEye size="1.4rem" />
                ) : (
                  <AiOutlineEyeInvisible size="1.4rem" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`border border-gray-300 mt-2 rounded font-semibold w-full h-12 bg-megenta-400 text-white`}
            >
              Change Password
            </button>
          </form>

        </div>
      </div>
         
          <Link to={'/'} className='p-4 bg-blue-500 rounded-lg text-white font-semibold'>
            Go back
        </Link>
    </div>
  );
};

export default ResetPassForm;
