import { SHOW_USER_LIST, GET_USERS_INFO, UPDATE_USER_INFO, DELETE_USER, USER_ACTIVE, DELETE_USER_ERROR } from '../../types/index';

const userReducer =  (state, action) => {
    switch (action.type) {
        case SHOW_USER_LIST:
            return {
                ...state,
                // newUserInfo: true
            }
        case GET_USERS_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case UPDATE_USER_INFO:
            console.log(action.payload)
            return {
                ...state,
                userInfo: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                userInfo: state.userInfo.filter(user => user.id !== action.payload) 
            }

        case USER_ACTIVE:
            console.log(action.payload._id) 
            return { 
                ...state,
                userInfo: state.userInfo.map(user => user._id === action.payload._id ? action.payload : user )
            }

        case DELETE_USER_ERROR:
            console.log(action.payload)
            return {
                message: action.payload
            }


        default:
            return state;
    }
}

export default userReducer