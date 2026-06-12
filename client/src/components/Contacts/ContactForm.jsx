import ContactForm from "@/components/forms/ContactForm";
import { EMPTY_CONTACT } from "@/constants/forms";
import { FORM_LABELS } from "@/constants/labels";
import { useApi } from "@/hooks/useApi";
import { useContacts } from "@/hooks/useContacts";
import { Box } from "@mui/material";

const ContactFormWrapper = ({ onCancel: externalOnCancel }) => {
  const { current, addContact, updateContact, clearCurrent } = useContacts();
  const { execute, loading, error } = useApi();

  const handleSubmit = async (formData) => {
    try {
      if (current) {
        await execute(
          () => updateContact({ ...current, ...formData }),
          () => {
            clearCurrent();
            if (externalOnCancel) externalOnCancel();
          },
        );
      } else {
        await execute(
          () => addContact(formData),
          () => {
            if (externalOnCancel) externalOnCancel();
          },
        );
      }
    } catch {
      // Error handled by useApi
    }
  };

  const handleCancel = () => {
    clearCurrent();
    if (externalOnCancel) externalOnCancel();
  };

  return (
    <Box className="max-w-2xl mx-auto">
      <ContactForm
        initialValues={current || EMPTY_CONTACT}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitText={current ? FORM_LABELS.UPDATE_CONTACT : FORM_LABELS.ADD_CONTACT}
        showCancel={Boolean(current || externalOnCancel)}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default ContactFormWrapper;
