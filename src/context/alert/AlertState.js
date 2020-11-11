import React, { useReducer } from 'react';
import alertReducer from './AlertReducer';
import alertContext from './AlertContext';

import { SHOW_ALERT, HIDE_ALERT } from '../../types/index';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(alertReducer, initialState);

    const showAlert= (msg,) => {
        dispatch ({
            type: SHOW_ALERT,
            payload: {
                msg, 
            } 
        });

        setTimeout(() => { // hide alert after 5s.
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000)
    }

    // pass min 8 characters
    return (
        < alertContext.Provider 
        value={{
            alert: state.alert,
            showAlert

        }}
        >
            {props.children}
        </alertContext.Provider>
)};

export default AlertState;