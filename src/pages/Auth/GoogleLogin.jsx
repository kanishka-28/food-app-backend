import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { loadUser } from '../../redux/features/auth/slice';
import { setloadingFalse, setloadingTrue } from '../../redux/features/Loader/slice';

const GoogleLogin = () => {
  const {token} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
   if(token){
     localStorage.setItem('token', token);
     dispatch(setloadingTrue());
     dispatch(loadUser());
     dispatch(setloadingFalse());
      navigate('/');
   }
   else{
     toast.error("Server error, try again later");
     navigate('/auth/login');
   }
  }, [])
  
  return (
    <>

    </>
  )
}

export default GoogleLogin