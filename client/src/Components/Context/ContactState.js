import React, { useReducer } from "react";
import ContactContext from "./ContactsContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CURRENT,
  FLITER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from "./types";

const ContactState = props => {
  const initialState = {
    contacts: []
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //   ADD cONTACT

  // DELETE CONTACT

  // SET CURRENT

  return (
    <ContactContext.Provider value={{ state: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
