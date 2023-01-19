import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { serviceGet } from "../../utlis/connection/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";
export default function ForgotPass() {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setloadingTrue());
    try {
      await serviceGet(`auth/forgot-pass?email=${email}&&type=user`);
      toast.success(`Link to reset password will be sent to ${email}`);
      navigate('/auth/success')
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setloadingFalse());
    }
  };

  return (
    <div className="flex justify-center items-center w-full ">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden border-2 border-dashed border-gray-300 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full lg:mx-8  sm:pl-0 md:pl-10">
        <div className="bg-white px-4 pt-5 ">
          <div className="sm:flex sm:items-start ">
            <div className="mt-3 w-full text-center mr-0 md:mr-4 mb-8 ">
              <div className="flex justify-center mb-8">
                <h3 className="text-2xl leading-6 font-medium text-gray-900 ">
                  Forgot Password
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
                    Send Verification
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
