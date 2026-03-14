import React, { useCallback, useContext, useState } from "react";
import "../../styles/app-layout.css";
import ContactFormWrapper from "../Contacts/ContactForm";
import ContactContext from "../Context/contactContext";
import Modal from "../ui/Modal";
import ContactDetailPanel from "./ContactDetailPanel";
import ContactListPanel from "./ContactListPanel";
import Sidebar from "./Sidebar";

const Home = () => {
  const { current, setCurrent, clearCurrent, filterContacts, clearFilter } = useContext(ContactContext);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("people");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSelectContact = useCallback(
    (contact) => {
      setSelectedContact(contact);
      setCurrent(contact);
    },
    [setCurrent],
  );

  const handleSearchChange = useCallback(
    (value) => {
      setSearchValue(value);
      if (value.trim()) {
        filterContacts(value);
      } else {
        clearFilter();
      }
    },
    [filterContacts, clearFilter],
  );

  const handleFilterChange = useCallback(
    (filter, tag) => {
      setActiveFilter(filter);
      if (filter === "tag" && tag) {
        filterContacts(tag);
      } else {
        clearFilter();
      }
    },
    [filterContacts, clearFilter],
  );

  const openAddModal = useCallback(() => {
    clearCurrent();
    setShowContactModal(true);
  }, [clearCurrent]);

  const closeContactModal = useCallback(() => {
    setShowContactModal(false);
    clearCurrent();
  }, [clearCurrent]);

  const selectedId = selectedContact ? selectedContact._id || selectedContact.id : null;

  return (
    <div className="app-layout">
      <Sidebar
        onAddContact={openAddModal}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <ContactListPanel selectedId={selectedId} onSelectContact={handleSelectContact} />
      <ContactDetailPanel
        contact={selectedContact || current}
        onEdit={(c) => {
          setCurrent(c);
          setSelectedContact(c);
          setShowContactModal(true);
        }}
        onAddReminder={() => {}}
        onAddEvent={() => {}}
        onAddNote={() => {}}
      />

      <Modal open={showContactModal} onClose={closeContactModal}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#e5e5e5] mb-4">{current ? "Edit Contact" : "Add Contact"}</h2>
          <ContactFormWrapper onSuccess={closeContactModal} onCancel={closeContactModal} />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200"
              onClick={closeContactModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
