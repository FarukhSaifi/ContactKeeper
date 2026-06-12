import ContactContext from "@/components/Context/contactContext";
import { CONTACT_STATS_INITIAL } from "@/constants/app";
import { HOOK_ERRORS } from "@/constants/errors";
import { useContext } from "react";

export const useContacts = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error(HOOK_ERRORS.USE_CONTACTS_CONTEXT);
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
    const stats = { ...CONTACT_STATS_INITIAL, total: contacts.length };

    contacts.forEach((contact) => {
      if (Object.hasOwn(stats, contact.type)) {
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
