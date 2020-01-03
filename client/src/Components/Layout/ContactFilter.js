import React, { useContext, useRef, useEffect } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import contactContext from "../context/contactContext";
const ContactFilter = () => {
  const context = useContext(contactContext);
  const { filterContacts, clearFilter, filtered } = context;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    e.preventDefault();
    if (text.current.value === "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const classes = useStyle();
  return (
    <form
      onSubmit={onSubmit}
      className={`${classes.FormMargin} animated fadeInDown`}
    >
      <TextField
        ref={text}
        label="Search Contact"
        type="text"
        variant="outlined"
        fullWidth
        onChange={onChange}
      />
    </form>
  );
};

const useStyle = makeStyles(theme => ({
  FormMargin: {
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "20px"
  }
}));
export default ContactFilter;
