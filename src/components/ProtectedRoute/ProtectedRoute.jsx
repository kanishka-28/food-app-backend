import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, isReady } from '../../redux/features/auth/selector/selector'


const ProtectedRoute = ({children}) => {
  const auth  = useSelector(isAuthenticated);
  const ready = useSelector(isReady);
  const navigate = useNavigate();
 if(ready){
     if(auth){
         return children;
     }
     else{
         return <Navigate to={"/"} replace />
     }
 }
  
    
}

export default ProtectedRoute