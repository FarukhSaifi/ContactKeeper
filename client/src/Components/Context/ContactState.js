import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
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
    contacts: [
      {
        id: 1,
        name: "Farukh",
        email: "Farukh@mail.com",
        phone: "9810844673",
        type: "personal"
      },
      {
        id: 2,
        name: "Sameer",
        email: "Sammer@mail.com",
        phone: "9810844673",
        type: "Work"
      }
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //    ADD_CONTACT,

  //    DELETE_CONTACT,

  //    SET_CURRENT,

  //    CLEAR_CURRENT,

  //    UPDATE_CURRENT,

  //    FLITER_CONTACT,

  //    CLEAR_FILTER,

  //    SET_ALERT,

  //    REMOVE_ALERT;

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
