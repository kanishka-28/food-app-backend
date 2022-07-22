import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginForm = ({ data, setdata, handleSubmit }) => {
  const [showPass, setshowPass] = useState(false);

  return (
    <div className="w-full mx-auto ">
      <div className="mt-3 w-full text-center  mb-8 ">
        <div className="flex  justify-center mb-8">
          <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
            Log In
          </h3>
        </div>
        <div className="mt-2 text-center  ">
          <form onSubmit={handleSubmit} className={`my-6 w-full  `}>
            <input
              required
              type="email"
              placeholder="Email"
              className=" text-center p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
              onChange={(e) => setdata({ ...data, email: e.target.value })}
              value={data.email}
            />

            <div className=" flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
              <input
                required
                type={!showPass ? "password" : "text"}
                placeholder="Password"
                className="text-center  w-full h-12 "
                onChange={(e) => setdata({ ...data, password: e.target.value })}
                value={data.password}
              />
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setshowPass(!showPass);
                }}
              >
                {showPass ? (
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
              Sign in{" "}
            </button>
          </form>
          <div className="flex justify-between">
                  <Link
                    to={"/auth/signup"}
                    className="flex font-semibold text-zomato-500 text-sm mt-10 cursor-pointer"
                  >
                    New user? Create an account
                  </Link>
                  <Link
                    to={"/auth/forget"}
                    className="flex font-semibold text-blue-500 text-sm mt-10 cursor-pointer"
                  >
                    Forgot Password!?
                  </Link>
                </div>
        </div>
      </div>
        <Link to={'/'} className='p-4 bg-blue-500 rounded-lg text-white font-semibold'>
            Go back
        </Link>
    </div>
  );
};

export default LoginForm;
