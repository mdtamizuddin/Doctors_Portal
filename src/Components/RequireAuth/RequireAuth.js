import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import auth from '../Firebase/firebase.init';
import Loading from '../Loading/Loading';
const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation()
    if(user){
        return(
            children
        )
    }
    else if(loading){
        return(
           <Loading />
        )
    }
    else if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default RequireAuth