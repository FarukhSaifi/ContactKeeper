import { Grid, Box, Fab, useMediaQuery, useTheme } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState } from "react";
import ContactForm from "../Contacts/ContactForm";
import Contacts from "../Contacts/Contacts";
import ContactFilter from "./ContactFilter";
import { useContacts } from "../../hooks/useContacts";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { clearCurrent, current } = useContacts();
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    clearCurrent();
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    clearCurrent();
  };

  return (
    <Box className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <Box className="text-center mb-6 md:mb-8 px-4 pt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Contact Keeper
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Manage your contacts efficiently
        </p>
      </Box>

      {/* Mobile Layout */}
      {isMobile ? (
        <Box className="px-4 space-y-4">
          {/* Filter Section */}
          <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <ContactFilter />
          </Box>

          {/* Contacts List */}
          <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 min-h-[400px]">
            <Contacts />
          </Box>

          {/* Floating Action Button for Add Contact */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddClick}
            sx={{
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 1000,
            }}
          >
            <AddIcon />
          </Fab>

          {/* Mobile Form Modal */}
          {showForm && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1300,
                display: "flex",
                alignItems: "flex-end",
              }}
              onClick={handleFormClose}
            >
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "90vh",
                  backgroundColor: "background.paper",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  p: 3,
                  overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ContactForm onCancel={handleFormClose} />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        /* Desktop Layout */
        <Grid container spacing={3} className="px-4">
          <Grid item xs={12} md={6}>
            <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <Contacts />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="space-y-4">
              <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
                <ContactFilter />
              </Box>
              <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
                <ContactForm />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;
