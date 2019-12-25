import React, { Fragment } from "react";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Home from "./Components/Layout/Home";
import About from "./Components/Pages/About";
import ContactState from "./Components/context/ContactState";

function App() {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/About" component={About} />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
