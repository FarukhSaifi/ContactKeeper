import React, { Fragment, useContext } from "react";
import { List, Divider } from "@material-ui/core";

import ContactContext from "../context/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  return (
    <Fragment>
      <List component="div">
        {console.log(contacts)}
        {contacts.map(contacts => (
          <h3>{contacts.name}</h3>
        ))}
        {/* <ContactItem /> */}
      </List>
    </Fragment>
  );
};
export default Contacts;
