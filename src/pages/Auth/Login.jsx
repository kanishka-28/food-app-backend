import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [showPass, setshowPass] = useState(false);

  const [data, setdata] = useState({
    email: "",
    pass: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form_data = new FormData(event.target);
    // let values = {};
    // form_data.forEach(function (value, key) {
    //     values[key] = value;
    // });
    // // dispatch for login
    // dispatch(setLoadingTrue())
    // await dispatch(login(values))
    // dispatch(setLoadingFalse())
  };

  //   const isAuthenticated = useSelector(authState)

  //   useEffect(()=>{
  //     if (isAuthenticated) navigate('/');
  //   },[isAuthenticated, navigate])

  return (
    <div className="flex justify-center w-full">
      {/* <div className=" h-screen   flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md bg-zomato-400 p-10 rounded-lg w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://yt3.ggpht.com/ytc/AKedOLQcjMYalW_yII-YeLIMExAZ88R58Jw6VFUOJ1lK=s900-c-k-c0x00ffffff-no-rj"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
             
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-6">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300">
                  <input
                    id="password"
                    name="password"
                    type={!showPass?"password":"text"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 outline-none placeholder-gray-500 text-gray-900 rounded-lg  sm:text-sm"
                    placeholder="Password"
                  />
                  <div className="cursor-pointer px-2" onClick={()=>{setshowPass(!showPass)}} >
                  {showPass?<AiOutlineEye size="1.4rem"/>:<AiOutlineEyeInvisible size="1.4rem"/>}

                  </div>
                  </div>
                </div>
              </div>
  
             
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div> */}
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pl-0 md:pl-10">
        <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start ">
            <div className="mt-3 w-full text-center mr-0 md:mr-4 mb-8 ">
              <div className="flex  justify-center mb-8">
                <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
                  Log In
                </h3>
              </div>
              <div className="mt-2 text-center  ">
                <form className={`my-6 w-full  `}>
                   

                  <input
                    placeholder="Email"
                    className=" text-center p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded-md"
                    onChange={(e) =>
                        setdata({ ...data, email: e.target.value })
                    }
                    value={data.email}
                    />
                   
                  <div className=" flex items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded-md">
                 
                      
                    <input
                      type={!showPass ? "password" : "text"}
                      placeholder="Password"
                      className="text-center  w-full h-12 "
                      onChange={(e) =>
                        setdata({ ...data, pass: e.target.value })
                      }
                      value={data.pass}
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
                </form>

                <button
                  onClick={handleSubmit}
                  className={`border border-gray-300 rounded-md font-semibold w-full h-12 bg-megenta-400 text-white`}
                >
                  Sign in{" "}
                </button>
                <p className="m-4 font-dark text-xl">Or</p>
                {/* <LoginGoogle/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
