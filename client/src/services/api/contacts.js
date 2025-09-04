import { API_ENDPOINTS } from "../../constants/api";
import api from "./base";

// Contacts API service
export const contactsService = {
  // Get all contacts
  getContacts: async () => {
    const response = await api.get(API_ENDPOINTS.CONTACTS.BASE);
    return response.data;
  },

  // Get contact by ID
  getContactById: async (id) => {
    const response = await api.get(API_ENDPOINTS.CONTACTS.BY_ID(id));
    return response.data;
  },

  // Create new contact
  createContact: async (contactData) => {
    const response = await api.post(API_ENDPOINTS.CONTACTS.BASE, contactData);
    return response.data;
  },

  // Update contact
  updateContact: async (id, contactData) => {
    const response = await api.put(API_ENDPOINTS.CONTACTS.BY_ID(id), contactData);
    return response.data;
  },

  // Delete contact
  deleteContact: async (id) => {
    const response = await api.delete(API_ENDPOINTS.CONTACTS.BY_ID(id));
    return response.data;
  },

  // Search contacts
  searchContacts: async (searchTerm) => {
    const response = await api.get(`${API_ENDPOINTS.CONTACTS.BASE}/search`, {
      params: { q: searchTerm },
    });
    return response.data;
  },

  // Get contacts by type
  getContactsByType: async (type) => {
    const response = await api.get(`${API_ENDPOINTS.CONTACTS.BASE}/type/${type}`);
    return response.data;
  },
};

export default contactsService;
