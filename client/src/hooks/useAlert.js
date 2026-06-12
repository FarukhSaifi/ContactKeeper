import AlertContext from "@/components/Context/Alerts/AlertContext";
import { HOOK_ERRORS } from "@/constants/errors";
import { useContext } from "react";

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(HOOK_ERRORS.USE_ALERT_CONTEXT);
  }

  return context;
};
