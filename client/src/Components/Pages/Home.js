import React from "react";
import {
  makeStyles,
  List,
  ListItemText,
  ListItem,
  Avatar,
  Typography,
  Grid
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

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid display="flex" justifyContent="center">
        <List component="div">
          <ListItem button>
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
          <ListItem button>
            <Avatar className={classes.avatar}>F</Avatar>
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
          <ListItem button>
            <Avatar className={classes.avatar}>F</Avatar>
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
        </List>
      </Grid>
    </div>
  );
};
export default Home;
