import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/features/auth/selector/selector'


const ProtectedRoute = ({children}) => {
  const auth  = useSelector(isAuthenticated);
  if(auth){
    return (
        <>
            {children}
        </>
      )
  }
  else{
      <Navigate to={"/auth/login"} />
  }
   
}

export default ProtectedRoute