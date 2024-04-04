import { logRoles } from '@testing-library/react';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom';
import { isAuthenticated, isReady } from '../../Redux/Features/Auth/Selector/Selector';



const ProtectedRoute = ({ children }) => {
    const auth = useSelector(isAuthenticated);
    const ready = useSelector(isReady);
    if (ready) {
        if (auth) {
            return children;
        }
        else {
            return <Navigate to={"/auth/login"} replace />
        }
    }
   
}


// const ProtectedRoute = ({ children }) => {
//     const auth = useSelector(isAuthenticated);
//     const ready = useSelector(isReady);
//     const [render, setrender] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('useEffect');
//         if (ready) {
//             if (auth) {
//                 console.log('authenticated');
//                 setrender(true);
//                 // return <Navigate to={"/login"} replace />
//             }
//             else {
//                 setrender(false)
//                 console.log('not authenticated');
//                 // return children;
//             }
//         }
//     }, [])
    
//     return(
//         <>
//             {/* {render ? console.log('child') : navigate('/auth/login')} */}
//         </>
//     )
// }

export default ProtectedRoute