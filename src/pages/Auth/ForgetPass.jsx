import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { serviceGet } from "../../Utils/Api/api";
import toast from "react-hot-toast";

import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import ForgetPassForm from "../../Components/Form/ForgetPass";
import { useDispatch } from "react-redux";

export default function ForgetPass() {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState();


  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setloadingTrue());
    try {
      await serviceGet(`auth/forgot-pass?email=${email}&&type=restaurant`);
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
    <div className="flex   justify-center items-center w-full ">
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full    ">
        <div className="bg-white px-4 pt-5 ">
          <div className="sm:flex sm:items-start ">
            <ForgetPassForm email={email} setemail={setemail} handleSubmit={handleSubmit}/>
          </div>
        </div>
      </div>
    </div>
  );
}
