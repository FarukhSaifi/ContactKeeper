import React from "react";
import { Grid } from "@material-ui/core";
import Contacts from "../Contacts/Contacts";
import ContactForm from "../Contacts/ContactForm";
import ContactFilter from "./ContactFilter";

const Home = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Contacts />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ContactFilter />
          <ContactForm />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
