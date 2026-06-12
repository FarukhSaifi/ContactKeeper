import { PAGE_LABELS } from "@/constants/labels";
import { CONTACT_MESSAGES } from "@/constants/messages";
import { CONTACT_TYPE_COLORS, UI_CONFIG } from "@/constants/ui";
import { useContacts } from "@/hooks/useContacts";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";

const { SWIPE_ACTION_WIDTH, SWIPE_SNAP_THRESHOLD, AVATAR_SIZE, MIN_CONTACT_HEIGHT } = UI_CONFIG.MOBILE;

const MobileContactItem = ({ contact, onEdit }) => {
  const { deleteContact } = useContacts();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;

    if (diff > 0) {
      setSwipeOffset(Math.min(diff, SWIPE_ACTION_WIDTH));
    } else {
      setSwipeOffset(Math.max(diff, 0));
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    setSwipeOffset(swipeOffset > SWIPE_SNAP_THRESHOLD ? SWIPE_ACTION_WIDTH : 0);
  };

  const handleEdit = () => {
    onEdit(contact);
    setSwipeOffset(0);
  };

  const handleDelete = () => {
    if (window.confirm(CONTACT_MESSAGES.DELETE_CONFIRM(contact.name))) {
      deleteContact(contact._id);
    }
    setSwipeOffset(0);
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
          width: SWIPE_ACTION_WIDTH,
          transform: `translateX(${SWIPE_ACTION_WIDTH - swipeOffset}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
        }}
      >
        <IconButton size="small" onClick={handleEdit} sx={{ color: "white", backgroundColor: "primary.main" }}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleDelete} sx={{ color: "white" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          transform: `translateX(-${swipeOffset}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
          p: 2,
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          gap: 2,
          minHeight: MIN_CONTACT_HEIGHT,
        }}
      >
        <Box
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
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
              color={CONTACT_TYPE_COLORS[contact.type] || "default"}
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

const MobileContactList = ({ contacts, filtered, onEdit }) => {
  const displayContacts = filtered !== null ? filtered : contacts;

  if (!contacts || contacts.length === 0) {
    return (
      <Box className="text-center py-12">
        <Box className="text-gray-400 dark:text-gray-500 mb-4">
          <PersonIcon sx={{ fontSize: 64 }} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
          {PAGE_LABELS.NO_CONTACTS_TITLE}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {PAGE_LABELS.NO_CONTACTS_BODY}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {PAGE_LABELS.YOUR_CONTACTS}
        </Typography>
        <Chip
          label={PAGE_LABELS.CONTACT_COUNT(displayContacts.length)}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>
      <Box>
        {displayContacts.map((contact) => (
          <MobileContactItem key={contact._id} contact={contact} onEdit={onEdit} />
        ))}
      </Box>
    </Box>
  );
};

export default MobileContactList;
