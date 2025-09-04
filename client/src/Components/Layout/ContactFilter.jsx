import { TextField } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import contactContext from "../Context/contactContext";
const ContactFilter = () => {
  const context = useContext(contactContext);
  const { filterContacts, clearFilter, filtered } = context;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    e.preventDefault();
    if (text.current.value === "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Search Contacts</h3>
      <form onSubmit={onSubmit} className="animated fadeInDown">
        <TextField
          ref={text}
          label="Search Contact"
          type="text"
          variant="outlined"
          fullWidth
          onChange={onChange}
          className="transition-all duration-300"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "rgb(59 130 246)", // blue-500
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(59 130 246)", // blue-500
              },
            },
          }}
        />
      </form>
    </div>
  );
};

export default ContactFilter;
