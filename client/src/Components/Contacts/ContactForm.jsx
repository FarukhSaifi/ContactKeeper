import { Box } from "@mui/material";
import React from "react";
import { CONTACT_TYPES, UI_COPY } from "../../constants/app";
import { useApi } from "../../hooks/useApi";
import { useContacts } from "../../hooks/useContacts";
import ContactForm from "../forms/ContactForm";

const ContactFormWrapper = () => {
  const { current, addContact, updateContact, clearCurrent } = useContacts();
  const { execute, loading, error } = useApi();

  const handleSubmit = async (formData) => {
    try {
      if (current) {
        // Update existing contact
        await execute(
          () => updateContact({ ...current, ...formData }),
          (result) => {
            console.log("Contact updated successfully:", result);
            clearCurrent();
          },
        );
      } else {
        // Add new contact
        await execute(
          () => addContact(formData),
          (result) => {
            console.log("Contact added successfully:", result);
          },
        );
      }
    } catch (err) {
      console.error("Error saving contact:", err);
    }
  };

  const handleCancel = () => {
    clearCurrent();
  };

  return (
    <Box className="max-w-2xl mx-auto">
      <ContactForm
        initialValues={
          current || {
            name: "",
            email: "",
            phone: "",
            type: CONTACT_TYPES.PERSONAL,
          }
        }
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitText={current ? UI_COPY.CONTACT_UPDATE_BUTTON : UI_COPY.CONTACT_ADD_BUTTON}
        showCancel={!!current}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default ContactFormWrapper;
