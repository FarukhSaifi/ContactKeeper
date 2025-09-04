import { Grid } from "@mui/material";
import React from "react";
import ContactForm from "../Contacts/ContactForm";
import Contacts from "../Contacts/Contacts";
import ContactFilter from "./ContactFilter";

const Home = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Contact Keeper</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your contacts efficiently</p>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <Contacts />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
              <ContactFilter />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
              <ContactForm />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
