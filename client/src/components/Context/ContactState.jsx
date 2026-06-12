import { ALERT_TYPES, CONTACT_MESSAGES } from "@/constants/messages";
import { useAlert } from "@/hooks/useAlert";
import contactsService from "@/services/api/contacts";
import { tokenManager } from "@/utils/storage";
import { useCallback, useEffect, useReducer } from "react";
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

const ContactState = ({ children }) => {
  const { setAlert } = useAlert();

  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = useCallback(async () => {
    try {
      const contacts = await contactsService.getContacts();
      dispatch({ type: GET_CONTACTS, payload: contacts });
    } catch (err) {
      const message = err.response?.data?.msg || CONTACT_MESSAGES.LOAD_FAILED;
      dispatch({ type: CONTACT_ERROR, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
    }
  }, [setAlert]);

  const addContact = async (contact) => {
    try {
      const saved = await contactsService.createContact(contact);
      dispatch({ type: ADD_CONTACT, payload: saved });
      setAlert(CONTACT_MESSAGES.ADD_SUCCESS, ALERT_TYPES.SUCCESS);
    } catch (err) {
      const message = err.response?.data?.msg || CONTACT_MESSAGES.ADD_FAILED;
      dispatch({ type: CONTACT_ERROR, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactsService.deleteContact(id);
      dispatch({ type: DELETE_CONTACT, payload: id });
      setAlert(CONTACT_MESSAGES.DELETE_SUCCESS, ALERT_TYPES.SUCCESS);
    } catch (err) {
      const message = err.response?.data?.msg || CONTACT_MESSAGES.DELETE_FAILED;
      dispatch({ type: CONTACT_ERROR, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
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
      const updated = await contactsService.updateContact(contact._id, contact);
      dispatch({ type: UPDATE_CONTACT, payload: updated });
      setAlert(CONTACT_MESSAGES.UPDATE_SUCCESS, ALERT_TYPES.SUCCESS);
    } catch (err) {
      const message = err.response?.data?.msg || CONTACT_MESSAGES.UPDATE_FAILED;
      dispatch({ type: CONTACT_ERROR, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
    }
  };

  const filterContacts = useCallback((text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  }, []);

  const clearFilter = useCallback(() => {
    dispatch({ type: CLEAR_FILTER });
  }, []);

  useEffect(() => {
    if (tokenManager.get()) {
      getContacts();
    } else {
      dispatch({ type: CONTACT_ERROR, payload: null });
    }
  }, [getContacts]);

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
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
