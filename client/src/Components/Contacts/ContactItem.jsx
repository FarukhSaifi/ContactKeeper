import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Grid, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import contactContext from "../Context/contactContext";

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "inline-block",
}));

const StyledDeleteIconButton = styled(IconButton)(({ theme }) => ({
  color: "red",
}));

const ContactItem = ({ SingleContact }) => {
  const { id, name, email, phone } = SingleContact;
  const context = useContext(contactContext);
  const { deleteContact, setCurrent, clearCurrent } = context;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <StyledGrid className="animated fadeInLeft">
      <StyledListItem>
        <Avatar>{name ? name.charAt(0).toUpperCase() : "?"}</Avatar>
        <StyledListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <StyledTypography component="span" variant="body2" color="textPrimary">
                {phone}
              </StyledTypography>
              {` — ${email}`}
            </React.Fragment>
          }
        />
        <IconButton aria-label="edit" onClick={() => setCurrent(SingleContact)}>
          <EditIcon />
        </IconButton>
        <StyledDeleteIconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </StyledDeleteIconButton>
      </StyledListItem>
    </StyledGrid>
  );
};
export default ContactItem;
