import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/features/auth/slice";

export default function Signup() {
  const [showPass, setshowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    userName:"",
    email: "",
    password: "",
    cnfpass: "",
    address : "",
    city : "",
  });
  
    
   

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(data.password!==data.cnfpass){
      toast.error("Password Not Equal");
    }
    else{
      delete data.cnfpass;
    
      // console.log(data);
      dispatch(signup(data));
      navigate('/home/delivery');
    }
    
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
     
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden border-2 border-dashed border-gray-300 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pl-0 md:pl-10">
        <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start ">
            <div className="mt-3 w-full text-center mr-0 md:mr-4 mb-8 ">
              <div className="flex  justify-center mb-8">
                <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
                  Sign Up
                </h3>
              </div>
              <div className="mt-2 text-center  ">
                <form onSubmit={handleSubmit} className={`my-6 w-full  `}>
              
                  <input
                  onClick={()=>setshowPass(false)}
                  required
                    placeholder="Name"
                    className=" text-center p-4 my-1 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                    onChange={(e) =>
                      setdata({ ...data, userName: e.target.value })
                    }
                    value={data.userName}
                  />
                  <input
                  onClick={()=>setshowPass(false)}
                  required
                  type="email"
                    placeholder="Email"
                    className=" text-center p-4 my-1 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                    onChange={(e) =>
                      setdata({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  />
                   
                  <div className=" flex my-2 items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
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
                  <div className=" flex my-2 items-center bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 border border-gray-300 rounded">
                    <input
                    required
                      type={!showPass ? "password" : "text"}
                      placeholder="Confirm Password"
                      className="text-center  w-full h-12 "
                      onChange={(e) =>
                        setdata({ ...data, cnfpass: e.target.value })
                      }
                      value={data.cnfpass}
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
                  <textarea onClick={()=>setshowPass(false)} className=" text-center p-4 my-1 w-full h-16 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" placeholder="Address" required onChange={(e) =>
                      setdata({ ...data, address: e.target.value })
                    }
                    value={data.address} ></textarea>
                  
                  <input
                  onClick={()=>setshowPass(false)}
                    placeholder="City"
                    required
                    className=" text-center p-4 my-1 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                    onChange={(e) =>
                      setdata({ ...data, city: e.target.value })
                    }
                    value={data.city}
                  />
                <button
                type="submit"
             
                  className={`border border-gray-300 rounded font-semibold w-full h-12 bg-megenta-400 text-white`}
                >
                  Sign Up{" "}
                </button>
               
                </form>
                <Link 
                 to={"/auth/login"}
                  className="flex font-semibold text-zomato-500 text-sm mt-10 cursor-pointer"
                >
                     Already a User? Lets Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
