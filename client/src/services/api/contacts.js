/**
 * Contacts API service: CRUD and optional search/type endpoints.
 * Uses shared api instance (base.js) which attaches auth token.
 * Note: search and getContactsByType require matching backend routes if used.
 */
import { API_ENDPOINTS } from "../../constants/api";
import api from "./base";

const contactsService = {
  /** GET /contacts – list all contacts for the current user */
  getContacts: async () => {
    const response = await api.get(API_ENDPOINTS.CONTACTS.BASE);
    return response.data;
  },

  /** GET /contacts/:id – single contact */
  getContactById: async (id) => {
    const response = await api.get(API_ENDPOINTS.CONTACTS.BY_ID(id));
    return response.data;
  },

  /** POST /contacts – create contact; returns created contact */
  createContact: async (contactData) => {
    const response = await api.post(API_ENDPOINTS.CONTACTS.BASE, contactData);
    return response.data;
  },

  /** PUT /contacts/:id – update contact; returns updated contact */
  updateContact: async (id, contactData) => {
    const response = await api.put(API_ENDPOINTS.CONTACTS.BY_ID(id), contactData);
    return response.data;
  },

  /** DELETE /contacts/:id */
  deleteContact: async (id) => {
    const response = await api.delete(API_ENDPOINTS.CONTACTS.BY_ID(id));
    return response.data;
  },

  /** GET /contacts/search?q= – requires backend support */
  searchContacts: async (searchTerm) => {
    const response = await api.get(`${API_ENDPOINTS.CONTACTS.BASE}/search`, {
      params: { q: searchTerm },
    });
    return response.data;
  },

  /** GET /contacts/type/:type – requires backend support */
  getContactsByType: async (type) => {
    const response = await api.get(`${API_ENDPOINTS.CONTACTS.BASE}/type/${type}`);
    return response.data;
  },
};

export default contactsService;
