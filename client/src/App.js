import React, { Fragment } from "react";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Home from "./Components/Layout/Home";
import About from "./Components/Pages/About";
import ContactState from "./Components/context/ContactState";
import AuthState from "./Components/context/auth/AuthState";
import AlertState from "./Components/context/Alerts/AlertState";

import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
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
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
