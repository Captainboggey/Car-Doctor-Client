


import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)

   if(user){
    return children
   }
   if(loading){
    return <progress className="progress w-56"></progress>
   }

    return <Navigate to={'/login'} replace></Navigate>
};

export default PrivateRoute;