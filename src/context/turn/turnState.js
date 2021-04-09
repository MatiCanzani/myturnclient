import React, { useReducer } from "react";
import turnContext from "./turnContext";
import turnReducer from "./turnReducer";
import {
  SHOW_DAYS,
  SHOW_USER_LIST,
  GET_USERS_TURNS,
  CREATE_USER_TURNS,
  DELETE_TURN,
  GET_USERS_TURNS_BY_ID,
  SHOW_SPACE,
  SHOW_HOURS,
  GET_HOURS,
  SHOW_THUSHOURS,
  GET_THUSHOURS,
  SHOW_SATHOURS,
  GET_SATHOURS, 
  GET_SPACE,
  CREATE_USER_TURNS_ERROR
} from "../../types/index";
import axios from "../../config/axios";

const TurnState = (props) => {
  const initialState = {
    userTurns: [],
    newTurn: false,
    userTurn: null,
    loading: true,
    days: [],
    hours: null,
    thusHours: null,
    satHours: null,
    showHours: [],
    showThusHours: [],
    showSatHours: [],
    space: [],
    confirmation: null,
    spaceAvailable: null,
    message: "sin mensaje",
    confirmMsg: null

    
  };

  const [state, dispatch] = useReducer(turnReducer, initialState);

  //CRUD fuctions ADMIN.
  const showUserList = () => {
    dispatch({
      type: SHOW_USER_LIST,
    });
  };

  //get USERS TURNS
  const getUserTurns = async (userTurns) => {
    try {
      const reply = await axios.get("/turns", {
        params: userTurns,
      });
      dispatch({
        type: GET_USERS_TURNS,
        payload: reply.data.userTurn,
        
      }); 
  
    } catch (error) {
      console.log(error);
    }
  };
  const getUserTurnsById = async (userId) => {
    try {
      const reply = await axios.get(`/turns/${userId}`);
      
      dispatch({
        type: GET_USERS_TURNS_BY_ID,
        payload: reply.data.userTurn
      });
      console.log(reply.data.userTurn)
    } catch (error) {
      console.log(error);
    }
  };

  //add user turn
  const createUserTurns = async (userTurns) => {
    try {
      const reply = await axios.post("/turns", userTurns);
      dispatch({
        type: CREATE_USER_TURNS,
        payload: reply.data.msg,
      });
    } catch (error) {
     
      const alert = {
        msg: error.response.data.msg,
      }
      console.log(alert);
      dispatch({
        type: CREATE_USER_TURNS_ERROR,
        payload: alert
    })
   
    }
  };

  const confirmSpace =  async (userTurns) => {
    try {
      const reply = await axios.get('/turns',{ 
        params: {
        userDay: userTurns.userDay,
        userHours: userTurns.userHours,
        userSatHours: userTurns.userSatHours
      }
      });
      console.log(reply.data.msg)
      dispatch({
        type: GET_SPACE,
        payload: reply.data.msg
      });
    } catch (error) {
      console.log(error);
    }
  }; 

  const deleteUserTurn = async (turnId) => {
    console.log(turnId)
    try {
      const reply = await axios.delete(`/turns/${turnId}`);
      dispatch({
        type: DELETE_TURN,
        payload: reply.data.turnId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get Days and Hours

  const getDays = async () => {
    try {
      const reply = await axios.get("/days");

      dispatch({
        type: SHOW_DAYS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getHours = async () => {
    console.log();
    try {
      const reply = await axios.get("/hours");
      dispatch({
        type: SHOW_HOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getHoursThus = async () => {
    try {
      const reply = await axios.get("/hours/thus");
      dispatch({
        type: SHOW_THUSHOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getHoursSat = async () => {
    try {
      const reply = await axios.get("/hours/sat");
      dispatch({
        type: SHOW_SATHOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const showSatHour = async () => {
    try {
      const reply = await axios.get("/hours/showSatHour");
      dispatch({
        type: GET_SATHOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const showHour = async () => {
    try {
      const reply = await axios.get("/hours/showHour");
      dispatch({
        type: GET_HOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const showThusHour = async () => {
    try {
      const reply = await axios.get("/hours/showThusHour");
      dispatch({
        type: GET_THUSHOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSpace = async (classHour) => {
    try {
      const reply = await axios.get("/turns/userCount", {
        params: classHour,
      });
      dispatch({
        type: SHOW_SPACE,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <turnContext.Provider
      value={{
        userTurns: state.userTurns,
        userTurn: state.userTurn,
        newTurn: state.newTurn,
        loading: state.loading,
        days: state.days,
        hours: state.hours,
        satHours: state.satHours,
        thusHours: state.thusHours,
        space: state.space,
        showHours: state.showHours,
        showThusHours: state.showThusHours,
        showSatHours: state.showSatHours,
        confirmation: state.confirmation,
        spaceAvailable: state.spaceAvailable,
        message: state.message,
        confirmMsg:state.confirmMsg,
        showUserList,
        getUserTurns,
        createUserTurns,
        deleteUserTurn,
        getUserTurnsById,
        getDays,
        getHours,
        getHoursThus,
        getHoursSat,
        getSpace,
        showSatHour,
        showHour,
        showThusHour,
        confirmSpace,
      }}
    >
      {props.children}
    </turnContext.Provider>
  );
};

export default TurnState;
