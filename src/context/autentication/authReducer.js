import { REGISTER_OK, REGISTER_ERROR, LOGIN_OK, LOGIN_ERROR, CLOSE_SESSION, GET_USER, USER_ADMIN,RESET_PASS, RESET_ERROR,  FORGOT_ERROR } from '../../types/index';

const authReducer =  (state, action) => {
    switch (action.type) {
        case REGISTER_OK:
        case LOGIN_OK:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authentication: true,
                message: null,
                loading: false,
                token: action.payload.token,
            }

        case USER_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            }

        case RESET_PASS:
            console.log(action.payload)
            return {
               
                ...state,
                // user: action.payload   
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,    
                authentication: true,
            }
        case CLOSE_SESSION:    
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAdmin: null,
                authentication:  null,
                user: null,
                loading: false,
                isActive: null,
                message: action.payload
            }
        case RESET_ERROR : 
        case FORGOT_ERROR : 
         return{
            ...state,
            user: null,
            message: action.payload
         }
            
        default:
            return state
    }
}

export default authReducer;