import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 3),
    display: "flex",
    justifyContent: "center"
  }
}));
export const About = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="headline" component="h1">
          About
        </Typography>
      </Paper>
    </div>
  );
};
export default About;
