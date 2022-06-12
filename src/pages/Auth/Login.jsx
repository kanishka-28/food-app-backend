import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/slice";
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";

export default function Login() {
  const [showPass, setshowPass] = useState(false);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  

  const googleLogin = async()=>{
    window.location.replace('http://localhost:4000/auth/google')
   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setloadingTrue());
    await dispatch(login(data));
    dispatch(setloadingFalse());
  };

 

  return (
    <div className="flex  justify-center items-center w-full ">
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden border-2 border-dashed border-gray-300 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full lg:mx-8  sm:pl-0 md:pl-10">
        <div className="bg-white px-4 pt-5 ">
          <div className="sm:flex sm:items-start ">
            <div className="mt-3 w-full text-center mr-0 md:mr-4 mb-8 ">
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
                    onChange={(e) =>
                      setdata({ ...data, email: e.target.value })
                    }
                    value={data.email}
                    />
                   
                  <div className=" flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
                 
                      
                    <input
                      required
                      type={!showPass ? "password" : "text"}
                      placeholder="Password"
                      className="text-center  w-full h-12 "
                      onChange={(e) =>
                        setdata({ ...data, password: e.target.value })
                      }
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
                  <p className="m-4 font-dark text-xl">Or</p>
                </form>
                
                
                  <button onClick={googleLogin} aria-label="Continue with google"  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-400 flex items-center w-full ">
                       <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google"/>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>
                
                <Link 
                 to={"/auth/signup"}
                  className="flex font-semibold text-zomato-500 text-sm mt-10 cursor-pointer"
                >
                     New user? Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
