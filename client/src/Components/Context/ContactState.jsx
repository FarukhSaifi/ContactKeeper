import { useEffect, useReducer } from "react";
import api from "../../services/api";
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FLITER_CONTACT,
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

  // Get contacts from API
  const getContacts = async () => {
    try {
      const res = await api.get("/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || "Error loading contacts",
      });
    }
  };

  // Add contact to API
  const addContact = async (contact) => {
    try {
      const res = await api.post("/contacts", contact);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || "Error adding contact",
      });
    }
  };

  // Delete contact from API
  const deleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || "Error deleting contact",
      });
    }
  };

  //    SET_CURRENT,
  const setCurrent = (SingleContact) => {
    dispatch({
      type: SET_CURRENT,
      payload: SingleContact,
    });
  };

  //    CLEAR_CURRENT,
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact in API
  const updateContact = async (contact) => {
    try {
      const res = await api.put(`/contacts/${contact._id}`, contact);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response?.data?.msg || "Error updating contact",
      });
    }
  };

  //    FLITER_CONTACT,
  const filterContacts = (text) => {
    dispatch({ type: FLITER_CONTACT, payload: text });
  };

  //    CLEAR_FILTER,
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Load contacts on component mount - only if user is authenticated
  useEffect(() => {
    // Check if user is authenticated before loading contacts
    const token = localStorage.getItem("token");
    if (token) {
      getContacts();
    } else {
      // Set loading to false if no token
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
