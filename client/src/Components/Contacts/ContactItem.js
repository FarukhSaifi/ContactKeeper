import React from "react";
import {
  makeStyles,
  ListItemText,
  ListItem,
  Avatar,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  inline: {
    display: "inline-block"
  },
  DeleteIcon: {
    color: "red"
  },
  paddinleft2: {
    paddingLeft: theme.spacing(3)
  }
}));
const ContactItem = ({ SingleContact }) => {
  const { id, name, email, phone } = SingleContact;
  const classes = useStyles();
  return (
    <Grid>
      <ListItem button className={classes.root}>
        <Avatar>F</Avatar>
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
        <IconButton xs={4} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton xs={4} aria-label="delete" className={classes.DeleteIcon}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </Grid>
  );
};
export default ContactItem;
