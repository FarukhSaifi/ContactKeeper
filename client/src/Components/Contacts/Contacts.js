import React, { Fragment, useContext } from "react";
import { List, Divider } from "@material-ui/core";

import ContactContext from "../context/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  return (
    <Fragment>
      <List component="div">
        {console.log(contacts)}
        {contacts.map(SingleContact => (
          <Fragment>
            <ContactItem key={SingleContact.id} SingleContact={SingleContact} />
            <Divider />
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};
export default Contacts;
