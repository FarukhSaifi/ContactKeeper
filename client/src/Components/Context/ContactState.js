import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import uuid from "uuid";
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
        id: uuid,
        name: "Farukh",
        email: "Farukh@mail.com",
        phone: "9810844673",
        type: "personal"
      },
      {
        id: uuid,
        name: "Sameer",
        email: "Sammer@mail.com",
        phone: "9810844673",
        type: "Work"
      }
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //    ADD_CONTACT,
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //    DELETE_CONTACT,

  //    SET_CURRENT,

  //    CLEAR_CURRENT,

  //    UPDATE_CURRENT,

  //    FLITER_CONTACT,

  //    CLEAR_FILTER,

  //    SET_ALERT,

  //    REMOVE_ALERT;

  return (
    <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
