import { Alert as MuiAlert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import AlertContext from "../Context/Alerts/AlertContext";

const Alert = () => {
  const alertcontext = useContext(AlertContext);

  return (
    alertcontext.alerts.length > 0 &&
    alertcontext.alerts.map((alert) => (
      <Snackbar
        key={alert.id}
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert severity={alert.type} sx={{ margin: 1 }}>
          {alert.msg}
        </MuiAlert>
      </Snackbar>
    ))
  );
};

export default Alert;
