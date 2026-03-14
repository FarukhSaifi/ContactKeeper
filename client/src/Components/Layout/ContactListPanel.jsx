import React, { useContext, useMemo } from "react";
import ContactContext from "../Context/contactContext";

/**
 * Groups contacts by first letter of name and sorts letters.
 */
function groupContactsByLetter(contacts) {
  const groups = {};
  contacts.forEach((c) => {
    const letter = (c.name || "?").trim().charAt(0).toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : "#";
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });
  Object.keys(groups).forEach((k) => groups[k].sort((a, b) => (a.name || "").localeCompare(b.name || "")));
  return groups;
}

const ContactListPanel = ({ selectedId, onSelectContact }) => {
  const { contacts, filtered } = useContext(ContactContext);
  const list = filtered !== null ? filtered : contacts || [];
  const total = list.length;

  const grouped = useMemo(() => groupContactsByLetter(list), [list]);
  const letters = useMemo(
    () => Object.keys(grouped).sort((a, b) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b))),
    [grouped],
  );

  return (
    <div className="app-list">
      <div className="app-list__header">
        <div className="app-list__count">{total} TOTAL</div>
        <div className="app-list__title">Contacts</div>
        <div className="app-list__toolbar">
          <span className="app-list__filter">Filter by</span>
          <select className="app-list__sort" aria-label="Sort contacts">
            <option>A-Z</option>
          </select>
        </div>
      </div>

      <div className="app-list__body">
        {total === 0 ? (
          <div className="px-5 py-8 text-gray-500 text-sm text-center">
            No contacts yet. Click &quot;Add Contact +&quot; to create one.
          </div>
        ) : (
          letters.map((letter) => (
            <div key={letter}>
              <div className="app-list__section-title">{letter}</div>
              {grouped[letter].map((contact) => {
                const id = contact._id || contact.id;
                const isSelected = id === selectedId;
                return (
                  <div
                    key={id}
                    className={`app-list__item ${isSelected ? "app-list__item--selected" : ""}`}
                    onClick={() => onSelectContact(contact)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectContact(contact);
                      }
                    }}
                  >
                    <div className="app-list__item-avatar">{(contact.name || "?").charAt(0).toUpperCase()}</div>
                    <div className="app-list__item-info">
                      <div className="app-list__item-name">{contact.name || "—"}</div>
                      <div className="app-list__item-tag">{contact.type || "personal"}</div>
                      <div className="app-list__item-meta">
                        {[contact.phone, contact.email].filter(Boolean).join(" · ") || "—"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactListPanel;
