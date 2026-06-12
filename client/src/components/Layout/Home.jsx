import { ARIA_LABELS } from "@/constants/aria";
import { PAGE_LABELS } from "@/constants/labels";
import { UI_CONFIG } from "@/constants/ui";
import { useContacts } from "@/hooks/useContacts";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Fab, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ContactForm from "../Contacts/ContactForm";
import Contacts from "../Contacts/Contacts";
import ContactFilter from "./ContactFilter";
const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(UI_CONFIG.BREAKPOINTS.MOBILE));
  const { clearCurrent, current } = useContacts();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isMobile && current) {
      setShowForm(true);
    }
  }, [current, isMobile]);

  const handleAddClick = () => {
    clearCurrent();
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    clearCurrent();
  };

  return (
    <Box className="pb-20 md:pb-8">
      <Box className="text-center mb-6 md:mb-8 px-4 pt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{PAGE_LABELS.APP_NAME}</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{PAGE_LABELS.APP_TAGLINE}</p>
      </Box>

      {isMobile ? (
        <Box className="px-4 space-y-4">
          <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <ContactFilter />
          </Box>

          <Box
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
            sx={{ minHeight: UI_CONFIG.MOBILE.LIST_MIN_HEIGHT }}
          >
            <Contacts />
          </Box>

          <Fab
            color="primary"
            aria-label={ARIA_LABELS.ADD_CONTACT}
            onClick={handleAddClick}
            sx={{
              position: "fixed",
              bottom: UI_CONFIG.MOBILE.FAB_BOTTOM,
              right: UI_CONFIG.MOBILE.FAB_RIGHT,
              zIndex: UI_CONFIG.MOBILE.FAB_Z_INDEX,
            }}
          >
            <AddIcon />
          </Fab>

          {showForm ? (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: UI_CONFIG.MOBILE.MODAL_Z_INDEX,
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
          ) : null}
        </Box>
      ) : (
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
