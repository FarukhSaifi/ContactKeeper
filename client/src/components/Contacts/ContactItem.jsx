import { ARIA_LABELS } from "@/constants/aria";
import { CONTACT_MESSAGES } from "@/constants/messages";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import { memo, useContext } from "react";
import contactContext from "../Context/contactContext";

const ContactItem = ({ SingleContact }) => {
  const { _id, name, email, phone } = SingleContact;
  const { deleteContact, setCurrent, clearCurrent } = useContext(contactContext);

  const onDelete = () => {
    if (!window.confirm(CONTACT_MESSAGES.DELETE_CONFIRM(name))) {
      return;
    }
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <Box className="animated fadeInLeft w-full">
      <ListItem
        className="w-full rounded-lg px-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
        sx={{ minHeight: 72 }}
      >
        <Avatar sx={{ width: 48, height: 48 }}>{name ? name.charAt(0).toUpperCase() : "?"}</Avatar>
        <ListItemText
          className="ml-3 select-text"
          primary={
            <Typography variant="subtitle1" component="span" className="font-medium">
              {name}
            </Typography>
          }
          secondary={
            <Box component="span" className="select-text text-sm text-gray-600 dark:text-gray-400">
              {phone}
              {email ? ` · ${email}` : null}
            </Box>
          }
        />
        <IconButton aria-label={ARIA_LABELS.EDIT_CONTACT} onClick={() => setCurrent(SingleContact)} size="large">
          <EditIcon />
        </IconButton>
        <IconButton aria-label={ARIA_LABELS.DELETE_CONTACT} onClick={onDelete} size="large" color="error">
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </Box>
  );
};

export default memo(ContactItem);
