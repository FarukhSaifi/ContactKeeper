import React, { useState, useRef } from "react";
import { Box, IconButton, Typography, Chip, SwipeableDrawer } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useContacts } from "../../hooks/useContacts";
import { useMediaQuery, useTheme } from "@mui/material";

const MobileContactItem = ({ contact }) => {
  const { setCurrent, deleteContact } = useContacts();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    
    if (diff > 0) {
      // Swiping left (reveal actions)
      setSwipeOffset(Math.min(diff, 120));
    } else {
      // Swiping right (hide actions)
      setSwipeOffset(Math.max(diff, 0));
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (swipeOffset > 60) {
      setSwipeOffset(120);
    } else {
      setSwipeOffset(0);
    }
  };

  const handleEdit = () => {
    setCurrent(contact);
    setSwipeOffset(0);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      deleteContact(contact._id);
    }
    setSwipeOffset(0);
  };

  const getTypeColor = (type) => {
    const colors = {
      personal: "primary",
      work: "secondary",
      family: "success",
      friend: "warning",
    };
    return colors[type] || "default";
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "background.paper",
        borderRadius: 2,
        mb: 1,
        touchAction: "pan-y",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Action Buttons */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 1,
          pr: 2,
          backgroundColor: "error.main",
          width: 120,
          transform: `translateX(${120 - swipeOffset}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
        }}
      >
        <IconButton
          size="small"
          onClick={handleEdit}
          sx={{ color: "white", backgroundColor: "primary.main" }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{ color: "white" }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Contact Card */}
      <Box
        sx={{
          transform: `translateX(-${swipeOffset}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
          p: 2,
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          gap: 2,
          minHeight: 80,
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {contact.name.charAt(0).toUpperCase()}
        </Box>

        {/* Contact Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contact.name}
            </Typography>
            <Chip
              label={contact.type}
              size="small"
              color={getTypeColor(contact.type)}
              sx={{ height: 20, fontSize: "0.7rem" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EmailIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {contact.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PhoneIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {contact.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MobileContactList = ({ contacts, filtered }) => {
  const displayContacts = filtered !== null ? filtered : contacts;

  if (!contacts || contacts.length === 0) {
    return (
      <Box className="text-center py-12">
        <Box className="text-gray-400 dark:text-gray-500 mb-4">
          <PersonIcon sx={{ fontSize: 64 }} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
          No contacts found
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Add your first contact to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Contacts
        </Typography>
        <Chip
          label={`${displayContacts.length} contact(s)`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>
      <Box>
        {displayContacts.map((contact) => (
          <MobileContactItem key={contact._id} contact={contact} />
        ))}
      </Box>
    </Box>
  );
};

export default MobileContactList;

