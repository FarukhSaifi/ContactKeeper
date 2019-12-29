import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import uuid from "uuid";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FLITER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from "./types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: "1",
        name: "Farukh",
        email: "Farukh@mail.com",
        phone: "9810844673",
        type: "personal"
      },
      {
        id: "2",
        name: "Sameer",
        email: "Sammer@mail.com",
        phone: "9810844673",
        type: "Work"
      }
    ],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //    ADD_CONTACT,
  const addContact = contact => {
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  //    DELETE_CONTACT,
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  //    SET_CURRENT,
  const setCurrent = SingleContact => {
    dispatch({
      type: SET_CURRENT,
      payload: SingleContact
    });
  };

  //    CLEAR_CURRENT,
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //    UPDATE_CONTACT,
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  //    FLITER_CONTACT,
  const filterContacts = text => {
    dispatch({ type: FLITER_CONTACT, payload: text });
  };

  //    CLEAR_FILTER,
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //    SET_ALERT,

  //    REMOVE_ALERT;

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
