import { useCallback, useReducer } from "react";
import { REMOVE_ALERT, SET_ALERT } from "../types";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, []);

  const setAlert = useCallback((msg, type) => {
    const id = crypto.randomUUID();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
  }, []);

  const removeAlert = useCallback((id) => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, []);

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
