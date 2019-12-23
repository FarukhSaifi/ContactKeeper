import React from "react";
import {
  makeStyles,
  ListItemText,
  ListItem,
  Avatar,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 560,
    display: "flex",
    justifyContent: "center"
  },
  inline: {
    display: "inline-block"
  }
}));
const ContactItem = () => {
  const classes = useStyles();
  return (
    <ListItem button className={classes.root}>
      <Avatar>F</Avatar>
      <ListItemText
        inset
        primary="Brunch this weekend?"
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
export default ContactItem;
