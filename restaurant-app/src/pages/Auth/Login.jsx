import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Features/Auth/Slice";
import LoginForm from "../../Components/Form/Login";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";

export default function Login() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setloadingTrue());
    await dispatch(login(data))
    navigate('/home');
  };

  return (
    <div className="flex   justify-center items-center w-full ">
      <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg mx-4 w-full    ">
        <div className="bg-white px-4 pt-5 ">
          <div className="sm:flex sm:items-start ">
            <LoginForm data={data} setdata={setdata} handleSubmit={handleSubmit}/>
          </div>
        </div>
      </div>
    </div>
  );
}
