import { UI_CONFIG } from "@/constants/ui";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useContext } from "react";
import AlertContext from "../Context/Alerts/AlertContext";

const Alert = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  if (alerts.length === 0) {
    return null;
  }

  return alerts.map((alert) => (
    <Snackbar
      key={alert.id}
      open
      autoHideDuration={UI_CONFIG.SNACKBAR_DURATION}
      onClose={(_, reason) => {
        if (reason === "clickaway") {
          return;
        }
        removeAlert(alert.id);
      }}
      anchorOrigin={UI_CONFIG.SNACKBAR_ANCHOR}
    >
      <MuiAlert severity={alert.type} sx={{ margin: 1 }} onClose={() => removeAlert(alert.id)}>
        {alert.msg}
      </MuiAlert>
    </Snackbar>
  ));
};

export default Alert;
