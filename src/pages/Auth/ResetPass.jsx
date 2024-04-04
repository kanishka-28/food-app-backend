import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Features/Auth/Slice";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import ResetPassForm from "../../Components/Form/ResetPass";
import toast from "react-hot-toast";
import { servicePut } from "../../Utils/Api/api";

export default function ResetPass() {
 
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const token = query.get('token')
  const [showNewPass, setshowNewPass] = useState(false);
  const [showCnfPass, setshowCnfPass] = useState(false);
  const [data, setdata] = useState({
    password: "",
    cnfPass: "",
  });

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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex   justify-center items-center w-full ">
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full    ">
        <div className="bg-white px-4 pt-5 ">
          <div className="sm:flex sm:items-start ">
            <ResetPassForm data={data} setdata={setdata} handleSubmit={handleSubmit}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}
