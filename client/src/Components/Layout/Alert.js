import React, { useContext } from "react";
import AlertContext from "../context/Alerts/AlertContext";
import { SnackbarContent, makeStyles } from "@material-ui/core";

const Alert = () => {
  const alertcontext = useContext(AlertContext);
  const classes = useStyles();
  return (
    alertcontext.alerts.length > 0 &&
    alertcontext.alerts.map(alert => (
      <SnackbarContent
        key={alert.id}
        variant={alert.type}
        className={classes.margin}
        message={alert.msg}
      />
    ))
  );
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default Alert;
