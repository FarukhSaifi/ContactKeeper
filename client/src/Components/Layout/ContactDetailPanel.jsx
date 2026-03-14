import AddIcon from "@mui/icons-material/Add";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";

const ContactDetailPanel = ({ contact, onEdit, onAddReminder, onAddEvent, onAddNote }) => {
  if (!contact) {
    return (
      <div className="app-detail">
        <div className="app-detail__empty">Select a contact to view details</div>
      </div>
    );
  }

  const name = contact.name || "—";
  const initial = name.charAt(0).toUpperCase();
  const type = contact.type || "personal";

  return (
    <div className="app-detail">
      <div className="app-detail__profile">
        <div className="absolute right-6 top-6 flex items-center gap-1">
          {onEdit && (
            <button
              type="button"
              className="px-2 py-1 text-xs text-gray-400 hover:text-[#3b82f6]"
              onClick={() => onEdit(contact)}
            >
              Edit
            </button>
          )}
          <button type="button" className="text-gray-400 hover:text-gray-200 p-1" aria-label="More options">
            <MoreVertIcon sx={{ fontSize: 24 }} />
          </button>
        </div>
        <div className="app-detail__avatar">{initial}</div>
        <h1 className="app-detail__name">{name}</h1>
        <div className="app-detail__tags">
          <span className="app-detail__tag">{type}</span>
        </div>
        <div className="text-sm text-gray-400">{type === "professional" ? "Professional" : "Personal"} contact</div>
      </div>

      <div className="app-detail__section">
        <div className="app-detail__section-title">Contact information</div>
        <div className="app-detail__grid">
          <div className="app-detail__card">
            <PhoneIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>{contact.phone || "—"}</span>
          </div>
          <div className="app-detail__card">
            <EmailIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>{contact.email || "—"}</span>
          </div>
          <div className="app-detail__card">
            <LocationOnOutlinedIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>—</span>
          </div>
          <div className="app-detail__card">
            <HomeOutlinedIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>—</span>
          </div>
          <div className="app-detail__card">
            <CakeOutlinedIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>—</span>
          </div>
          <div className="app-detail__card">
            <FavoriteBorderOutlinedIcon className="app-detail__card-icon" sx={{ fontSize: 18 }} />
            <span>—</span>
          </div>
        </div>
      </div>

      <div className="app-detail__section">
        <div className="app-detail__section-title">Reminders</div>
        <button type="button" className="app-detail__add-btn" onClick={onAddReminder}>
          <AddIcon sx={{ fontSize: 18 }} />
          Add Reminder +
        </button>
      </div>

      <div className="app-detail__section">
        <div className="app-detail__section-title">Upcoming events</div>
        <button type="button" className="app-detail__add-btn" onClick={onAddEvent}>
          <EventIcon sx={{ fontSize: 18 }} />
          Add Event +
        </button>
      </div>

      <div className="app-detail__section">
        <div className="app-detail__section-title">Notes</div>
        <div className="app-detail__note">No notes yet.</div>
        <button type="button" className="app-detail__add-btn" onClick={onAddNote}>
          <AddIcon sx={{ fontSize: 18 }} />
          Add Note +
        </button>
      </div>
    </div>
  );
};

export default ContactDetailPanel;
