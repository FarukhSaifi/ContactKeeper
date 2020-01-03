import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Container,
  makeStyles
} from "@material-ui/core";
import contactContext from "../context/contactContext";

// Styling Of Form
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ContactForm = () => {
  const context = useContext(contactContext);
  const { addContact, clearCurrent, updateContact, current } = context;
  // Form State
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Mobile"
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "Mobile"
      });
    }
  }, [context, current]);

  // OnChange Function Add Data Into Form State
  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  const clearAll = e => {
    clearCurrent();
  };

  // On Submit Function Add data Into contactContext
  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const classes = useStyles();
  const { name, email, phone, type } = contact;
  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {current ? "Edit Contact" : "Add Contact"}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          value={name}
          label="Name"
          type="text"
          id="name"
          autoComplete="current-password"
          autoFocus
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          autoComplete="email"
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="phone"
          value={phone}
          label="Phone"
          type="text"
          id="phone"
          autoComplete="current-phone"
          onChange={onChange}
        />
        <RadioGroup
          aria-label="type"
          name="type"
          value="Mobile"
          onChange={onChange}
          row
        >
          <FormControlLabel
            control={<Radio checked={type === "Mobile"} />}
            label="Mobile"
            value="Mobile"
          />
          <FormControlLabel
            control={<Radio checked={type === "Work"} />}
            label="Work"
            value="Work"
          />
        </RadioGroup>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {current ? "Update" : "Add Contact"}
        </Button>

        {current ? (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={clearAll}
          >
            Cancel
          </Button>
        ) : null}
      </form>
    </Container>
  );
};
export default ContactForm;
