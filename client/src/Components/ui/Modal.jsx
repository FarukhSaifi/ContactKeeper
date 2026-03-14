import { Dialog } from "@mui/material";
import React from "react";

/**
 * Full-screen or max-width modal with dark-friendly styling.
 */
const Modal = ({ open, onClose, children, maxWidth = "sm" }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth
    PaperProps={{
      sx: {
        backgroundColor: "#242424",
        color: "#e5e5e5",
        borderRadius: 12,
        border: "1px solid #2e2e2e",
      },
    }}
  >
    {children}
  </Dialog>
);

export default Modal;
