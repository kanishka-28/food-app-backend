import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../Redux/Features/Auth/Slice";
import { useDispatch } from "react-redux";
import SignupForm from "../../Components/Form/Signup";
import { setloadingTrue } from "../../Redux/Features/Loader/Slice";
// import { useDispatch } from "react-redux";
// import { signup } from "../../redux/features/auth/slice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    userName: "",
    email: "",
    password: "",
    cnfpass: "",
    address: "",
    city: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password !== data.cnfpass) {
      toast.error("Password and confirm password should match.");
    } else {
      delete data.cnfpass;
      data.status = "user";
      dispatch(setloadingTrue());
      dispatch(signup(data));
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pl-0 md:pl-10">
        <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start ">
            <SignupForm
              data={data}
              setdata={setdata}
              handleSubmit={handleSubmit}
            />
          </div>
          {/* <Link
            to={"/"}
            className="p-4 bg-blue-500 rounded-lg text-white font-semibold"
          >
            Go back
          </Link> */}
        </div>
      </div>
    </div>
  );
}
