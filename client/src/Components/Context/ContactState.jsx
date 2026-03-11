import { useEffect, useReducer } from "react";
import { ERROR_MESSAGES } from "../../constants/app";
import contactsService from "../../services/api/contacts";
import { tokenManager } from "../../utils/storage";
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "./types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const data = await contactsService.getContacts();
      dispatch({ type: GET_CONTACTS, payload: data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.LOAD_CONTACTS,
      });
    }
  };

  const addContact = async (contact) => {
    try {
      const data = await contactsService.createContact(contact);
      dispatch({ type: ADD_CONTACT, payload: data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.ADD_CONTACT,
      });
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactsService.deleteContact(id);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.DELETE_CONTACT,
      });
    }
  };

  const setCurrent = (singleContact) => {
    dispatch({ type: SET_CURRENT, payload: singleContact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = async (contact) => {
    try {
      const data = await contactsService.updateContact(contact._id, contact);
      dispatch({ type: UPDATE_CONTACT, payload: data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.UPDATE_CONTACT,
      });
    }
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  useEffect(() => {
    if (tokenManager.get()) {
      getContacts();
    } else {
      dispatch({ type: CONTACT_ERROR, payload: null });
    }
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
