import React, { Fragment, useContext } from "react";
import { List, Divider } from "@material-ui/core";
import ContactContext from "../context/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Empty</h4>;
  }
  return (
    <Fragment>
      <List component="div">
        {filtered !== null
          ? filtered.map(SingleContact => (
              <Fragment>
                <ContactItem
                  key={SingleContact.id}
                  SingleContact={SingleContact}
                />
                <Divider />
              </Fragment>
            ))
          : contacts.map(SingleContact => (
              <Fragment>
                <ContactItem
                  key={SingleContact.id}
                  SingleContact={SingleContact}
                />
                <Divider />
              </Fragment>
            ))}
      </List>
    </Fragment>
  );
};
export default Contacts;
