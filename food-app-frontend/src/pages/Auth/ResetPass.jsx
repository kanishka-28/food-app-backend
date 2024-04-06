import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/slice";
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";
import { servicePut } from "../../utlis/connection/api";
import toast from "react-hot-toast";

export default function ResetPass() {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    password: "",
    cnfPass: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token')
  const [showNewPass, setshowNewPass] = useState(false);
  const [showCnfPass, setshowCnfPass] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password !== data.cnfPass) {
      toast.error(`Password and confirm password should match`);
      return;
    }
    if (data.password.length < 8) {
      toast.error(`Password length should be greater than 7`);
      return;
    }
    try {
      await servicePut(`auth/reset-pass`, { token, pass: data.password });
      toast.success(`Password reset successfully`);
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full ">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden border-2 border-dashed border-gray-300 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full lg:mx-8  sm:pl-0">
        <div className="bg-white px-4 pt-5 ">
          <div className="w-full mx-auto ">
            <div className="mt-3 w-full text-center mb-8 ">
              <div className="flex justify-center mb-8">
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
