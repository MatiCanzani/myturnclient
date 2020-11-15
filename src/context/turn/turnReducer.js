import {
  SHOW_DAYS,
  SHOW_USER_LIST,
  GET_USERS_TURNS,
  CREATE_USER_TURNS,
  DELETE_TURN,
  GET_USERS_TURNS_BY_ID,
  SHOW_SPACE,
  SHOW_THUSHOURS,
  SHOW_SATHOURS,
  SHOW_HOURS,
  GET_THUSHOURS,
  GET_SATHOURS,
  GET_HOURS,
  
} from "../../types/index";

const turnReducer = (state, action) => {
  switch (action.type) {
    case SHOW_USER_LIST:
      return {
        ...state,
        newTurn: true,
      };
    case GET_USERS_TURNS_BY_ID:
      return {
        ...state,
        userTurn: action.payload,
        // loading: false,
      };

    case GET_USERS_TURNS:
      return {
        ...state,
        userTurns: action.payload,
        // loading: false,
      };
    case CREATE_USER_TURNS:
      return {
        ...state,
        userTurns: [...state.userTurns, action.payload],
        newTurn: false,
      };

    case DELETE_TURN: {
      return {
        ...state,
        userTurns: state.userTurns.filter((turn) => turn.id !== action.payload),
      };
    }

    case SHOW_DAYS:
      return {
        ...state,
        days: action.payload,
        // loading: false,
      };
    case SHOW_THUSHOURS:
      console.log(action.payload)
      return {
        ...state,
        thusHours: action.payload,
        // loading: false,
      };
    case SHOW_SATHOURS:
      console.log(action.payload)
      return {
        ...state,
        satHours: action.payload,
        // loading: false,
      };
    
    case SHOW_HOURS:
      return {
        ...state,
        hours: action.payload,
        // loading: false,
      };

      case GET_THUSHOURS:
        console.log(action.payload)
        return {
          ...state,
          showThusHours: action.payload,
          // loading: false,
        };
  
      case GET_SATHOURS:
        console.log(action.payload)
        return {
          ...state,
          showSatHours: action.payload,
          // loading: false,
        };
      
      case GET_HOURS:
        return {
          ...state,
          showHours: action.payload,
          // loading: false,
        };

    case SHOW_SPACE:
      return {
        ...state,
        space: action.payload,
      };

    default:
      return state;
  }
};

export default turnReducer;
