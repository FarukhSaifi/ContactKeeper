import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../types";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //    SET_ALERT,
  const setAlert = (msg, type) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 5000);
  };

  //    REMOVE_ALERT;

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
