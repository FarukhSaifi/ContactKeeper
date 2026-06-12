import { API_ENDPOINTS } from "@/constants/api";
import api from "./base";

export const contactsService = {
  getContacts: async () => {
    const response = await api.get(API_ENDPOINTS.CONTACTS.BASE);
    return response.data;
  },

  createContact: async (contactData) => {
    const response = await api.post(API_ENDPOINTS.CONTACTS.BASE, contactData);
    return response.data;
  },

  updateContact: async (id, contactData) => {
    const response = await api.put(API_ENDPOINTS.CONTACTS.BY_ID(id), contactData);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(API_ENDPOINTS.CONTACTS.BY_ID(id));
    return response.data;
  },
};

export default contactsService;
