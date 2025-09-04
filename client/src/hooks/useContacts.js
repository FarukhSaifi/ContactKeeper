import { useContext } from "react";
import ContactContext from "../Components/Context/contactContext";

// Custom hook for contacts
export const useContacts = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }

  const {
    contacts,
    current,
    filtered,
    loading,
    error,
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    filterContacts,
    clearFilter,
    getContacts,
  } = context;

  // Get contact by ID
  const getContactById = (id) => {
    return contacts.find((contact) => contact._id === id);
  };

  // Get contacts by type
  const getContactsByType = (type) => {
    return contacts.filter((contact) => contact.type === type);
  };

  // Search contacts
  const searchContacts = (searchTerm) => {
    if (!searchTerm) {
      clearFilter();
      return;
    }
    filterContacts(searchTerm);
  };

  // Get contact statistics
  const getContactStats = () => {
    const stats = {
      total: contacts.length,
      personal: 0,
      work: 0,
      family: 0,
      friend: 0,
    };

    contacts.forEach((contact) => {
      if (stats.hasOwnProperty(contact.type)) {
        stats[contact.type]++;
      }
    });

    return stats;
  };

  return {
    // State
    contacts,
    current,
    filtered,
    loading,
    error,

    // Actions
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    filterContacts,
    clearFilter,
    getContacts,

    // Utilities
    getContactById,
    getContactsByType,
    searchContacts,
    getContactStats,
  };
};
