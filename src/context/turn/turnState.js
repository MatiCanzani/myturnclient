import React, { useReducer } from "react";
import turnContext from "./turnContext";
import turnReducer from "./turnReducer";
import {
  SHOW_DAYS,
  SHOW_HOURS,
  SHOW_USER_LIST,
  GET_USERS_TURNS,
  CREATE_USER_TURNS,
  DELETE_TURN,
  GET_USERS_TURNS_BY_ID,
  SHOW_SPACE
} from "../../types/index";
import axios from "../../config/axios";

const TurnState = (props) => {
  const initialState = {
    userTurns: [],
    newTurn: false,
    userTurn: [],
    loading: true,
    days: [],
    hours: [],
    space: []
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
        payload: reply.data.userTurn,
      });
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
        payload: reply.data,
      });
      console.log(reply.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserTurn = async (turnId) => {
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
    try {
      const reply = await axios.get("/hours");
      dispatch({
        type:  SHOW_HOURS,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSpace = async (turns) => {

    try {
      const reply = await axios.get("/turns/userCount",{
        params: turns,
      }
     
      );
      console.log(reply.data)
      dispatch({
        type: SHOW_SPACE,
        payload: reply.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <turnContext.Provider
      value={{
        userTurns: state.userTurns,
        userTurn: state.userTurn,
        newTurn: state.newTurn,
        loading: state.loading,
        days: state.days,
        hours: state.hours,
        space: state.space,
        showUserList,
        getUserTurns,
        createUserTurns,
        deleteUserTurn,
        getUserTurnsById,
        getDays,
        getHours,
        getSpace,
      }}
    >
      {props.children}
    </turnContext.Provider>
  );
};

export default TurnState;
