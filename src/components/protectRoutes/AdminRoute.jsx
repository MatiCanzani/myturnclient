import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentication/authContext.js';

const AdminRourte = ({ component: Component, ...props}) =>{
    
    const authContext = useContext(AuthContext);
    const { userAuthenticated, user} = authContext
    
    useEffect(()=> {
        userAuthenticated();
         // eslint-disable-next-line
    },[])
    return (

        <Route { ...props } render={ props => user.isAdmin !== true ? (
            <Redirect to="/user" />
        ) : (
            <Component {...props} />
        ) } />
    );
}

export default AdminRourte;

