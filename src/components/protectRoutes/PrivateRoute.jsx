import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentication/authContext.js';

const PrivateRourte = ({ component: Component, ...props}) =>{
    
    const authContext = useContext(AuthContext);
    const { authentication, userAuthenticated } = authContext
    
    useEffect(()=> {
        userAuthenticated();
        //eslint-disable-next-line
    },[])
    return (

        <Route { ...props } render={ props => !authentication ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        ) } />
    );
}

export default PrivateRourte;

