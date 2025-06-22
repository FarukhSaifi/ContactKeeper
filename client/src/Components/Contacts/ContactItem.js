import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useContext } from "react";
import contactContext from "../context/contactContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  inline: {
    display: "inline-block",
  },
  DeleteIcon: {
    color: "red",
  },
  paddinleft2: {
    paddingLeft: theme.spacing(3),
  },
}));

const ContactItem = ({ SingleContact }) => {
  const { id, name, email, phone } = SingleContact;
  const context = useContext(contactContext);
  const { deleteContact, setCurrent, clearCurrent } = context;

  const classes = useStyles();

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <Grid className="animated fadeInLeft">
      <ListItem button className={classes.root}>
        <Avatar>{name ? name.charAt(0).toUpperCase() : "?"}</Avatar>
        <ListItemText
          className={classes.paddinleft2}
          inset
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {phone}
              </Typography>
              {` — ${email}`}
            </React.Fragment>
          }
        />
        <IconButton aria-label="edit" onClick={() => setCurrent(SingleContact)}>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          className={classes.DeleteIcon}
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </Grid>
  );
};
export default ContactItem;
