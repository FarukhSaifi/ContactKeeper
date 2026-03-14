import AddIcon from "@mui/icons-material/Add";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import React, { useState } from "react";
import { APP_CONFIG } from "../../constants/app";
import { useAuth } from "../../hooks/useAuth";

const SIDEBAR_TAGS = ["Family", "Job", "Friends", "Sports", "Developers", "Designers", "Gaming", "All tags"];

const Sidebar = ({ onAddContact, searchValue, onSearchChange, activeFilter, onFilterChange }) => {
  const [tagsExpanded, setTagsExpanded] = useState(true);
  const { user } = useAuth();

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__logo">
        <div className="app-sidebar__logo-icon">{APP_CONFIG.NAME.charAt(0)}</div>
        <span>{APP_CONFIG.NAME}</span>
      </div>

      <div className="app-sidebar__search">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" sx={{ fontSize: 20 }} />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search contacts"
          />
        </div>
      </div>

      <nav className="app-sidebar__nav">
        <div
          className={`app-sidebar__nav-item ${activeFilter === "people" ? "app-sidebar__nav-item--active" : ""}`}
          onClick={() => onFilterChange("people")}
          role="button"
        >
          <PersonOutlineIcon sx={{ fontSize: 20 }} />
          <span>All People</span>
        </div>
        <div
          className={`app-sidebar__nav-item ${activeFilter === "businesses" ? "app-sidebar__nav-item--active" : ""}`}
          onClick={() => onFilterChange("businesses")}
          role="button"
        >
          <BusinessCenterOutlinedIcon sx={{ fontSize: 20 }} />
          <span>All Businesses</span>
        </div>
        <div
          className={`app-sidebar__nav-item ${activeFilter === "favorites" ? "app-sidebar__nav-item--active" : ""}`}
          onClick={() => onFilterChange("favorites")}
          role="button"
        >
          <StarBorderOutlinedIcon sx={{ fontSize: 20 }} />
          <span>Favorites</span>
        </div>

        <div className="app-sidebar__nav-section">
          <div className="app-sidebar__nav-section-title" onClick={() => setTagsExpanded(!tagsExpanded)} role="button">
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LabelOutlinedIcon sx={{ fontSize: 18 }} />
              Tags
            </span>
            <ChevronRightIcon sx={{ fontSize: 18, transform: tagsExpanded ? "rotate(90deg)" : "none" }} />
          </div>
          {tagsExpanded &&
            SIDEBAR_TAGS.map((tag) => (
              <div key={tag} className="app-sidebar__tag" onClick={() => onFilterChange("tag", tag)} role="button">
                {tag}
              </div>
            ))}
        </div>

        <div className="app-sidebar__nav-item" role="button">
          <BoltOutlinedIcon sx={{ fontSize: 20 }} />
          <span>Smart Tags</span>
          <ChevronRightIcon sx={{ fontSize: 18, marginLeft: "auto" }} />
        </div>
        <div className="app-sidebar__nav-item" role="button">
          <EventOutlinedIcon sx={{ fontSize: 20 }} />
          <span>Events</span>
          <ChevronRightIcon sx={{ fontSize: 18, marginLeft: "auto" }} />
        </div>
      </nav>

      <div className="app-sidebar__untagged" role="button">
        <span>UNTAGGED</span>
        <span>0</span>
        <ChevronRightIcon sx={{ fontSize: 16 }} />
      </div>

      <button type="button" className="app-sidebar__add-btn" onClick={onAddContact}>
        <AddIcon sx={{ fontSize: 20 }} />
        Add Contact +
      </button>

      <div className="app-sidebar__user">
        <div className="app-sidebar__user-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : "?"}</div>
        <span className="app-sidebar__user-name">{user?.name || "User"}</span>
        <button type="button" className="text-gray-500 hover:text-gray-300 p-1" aria-label="Settings">
          <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
