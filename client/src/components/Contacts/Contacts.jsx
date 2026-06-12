import { PAGE_LABELS } from "@/constants/labels";
import { UI_CONFIG } from "@/constants/ui";
import { Divider, List, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, useContext } from "react";
import ContactContext from "../Context/contactContext";
import ContactItem from "./ContactItem";
import MobileContactList from "./MobileContactList";

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 dark:text-gray-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
    <h4 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">{PAGE_LABELS.NO_CONTACTS_TITLE}</h4>
    <p className="text-gray-500 dark:text-gray-500">{PAGE_LABELS.NO_CONTACTS_BODY}</p>
  </div>
);

const Contacts = () => {
  const { contacts, filtered, setCurrent } = useContext(ContactContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(UI_CONFIG.BREAKPOINTS.MOBILE));

  if (isMobile) {
    return <MobileContactList contacts={contacts} filtered={filtered} onEdit={setCurrent} />;
  }

  if (!contacts || contacts.length === 0) {
    return <EmptyState />;
  }

  const displayContacts = filtered !== null ? filtered : contacts;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{PAGE_LABELS.YOUR_CONTACTS}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {PAGE_LABELS.CONTACT_COUNT(displayContacts.length)}
        </span>
      </div>

      <List component="div" className="space-y-2">
        {displayContacts.map((singleContact) => (
          <Fragment key={singleContact._id}>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <ContactItem SingleContact={singleContact} />
            </div>
            <Divider className="opacity-30" />
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default Contacts;
