import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axios from '../../config/axios';
import authToken from '../../config/tokenAuth';


import { REGISTER_OK, REGISTER_ERROR, LOGIN_OK, LOGIN_ERROR, CLOSE_SESSION, GET_USER, USER_ADMIN } from '../../types/index';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authentication: null,
        user: null,
        message: null,
        loading: true,
        // isAdmin: false,
        // isActive: null,
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const userSignup = async data => {
        try {
            const reply = await axios.post(`/users`, data);
            dispatch({
                type: REGISTER_OK,
                payload: reply.data
            });
            //get user
            userAuthenticated();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
            }

            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    //return user authenticated
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            authToken(token);
        };
        try {
            const reply = await axios.get('/auth')
            console.log(reply.data)
            dispatch({
                type: GET_USER,
                payload: reply.data.user,
            },)
            // dispatch(
            //   { type: USER_ADMIN,
            //     payload: reply.data.user.isAdmin
            // },
            // )
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }

    const getAdmin = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            authToken(token);
        };
        try {
            const reply = await axios.get('/auth')
            dispatch(
              { type: USER_ADMIN,
                payload: reply.data.user.isAdmin
            },
            )
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
            })
        }   
    }

    //authentication when user login
    const userLogin = async data => {
        try {
            const reply = await axios.post('/auth', data);
            dispatch({
                type: LOGIN_OK,
                payload: reply.data
            })
            //get user
            userAuthenticated();
        } catch (error) {
           
            const alert = {
                msg: error.response.data.msg,
            }
            console.log(alert);
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    // close session
 
    const closeSession = () => (
        dispatch({
            type: CLOSE_SESSION
        })
    )

    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                authentication: state.authentication,
                user: state.user,
                message: state.message,
                loading: state.loading,
                isAdmin: state.isAdmin, 
                userSignup,
                userLogin,
                userAuthenticated,
                closeSession,
                getAdmin
            }}
        >{props.children}

        </AuthContext.Provider>
    )
    
}

export default AuthState;