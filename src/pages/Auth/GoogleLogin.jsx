import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { loadUser } from '../../redux/features/auth/slice';

const GoogleLogin = () => {
  const {token} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
   if(token){
     localStorage.setItem('token', token);
      dispatch(loadUser());
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