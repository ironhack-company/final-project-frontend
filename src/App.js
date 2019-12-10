import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./services/index";
import moduleName from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavItem
} from "react-bootstrap";
import css from "./index.css";
import FlightSearch from "./components/Flights/FlightSearch";

class App extends Component {
  state = {};

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    this.setState({ ...user.data });
  }

  setUser = user => this.setState(user);

  logOut = async () => {
    let res = await actions.logOut();
    this.setUser({ email: null, createdAt: null, updatedAt: null, _id: null }); //FIX
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <NavLink to="/" className="text-dark">
              TripApp
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Input your destination"
                className="mr-sm-2"
              />
              {/* <Button variant="outline-info">Search</Button> */}
            </Form>
            <Nav className="ml-auto">
              <NavLink to="/" className="mr-2 text-dark">
                Home
              </NavLink>
              {this.state.email ? (
                <Fragment>
                  <NavItem className="mr-2  text-dark">
                    Logged in as {this.state.username}
                  </NavItem>
                  <NavLink className="mr-2 text-dark" to="/flight-search">
                    Flight
                  </NavLink>
                  <NavLink className="mr-2 text-dark" to="/profile">
                    Profile
                  </NavLink>
                  <NavLink
                    className="mar-2 text-dark"
                    onClick={this.logOut}
                    to="/"
                  >
                    Log Out
                  </NavLink>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink className="mr-2 text-dark" to="/sign-up">
                    Sign Up
                  </NavLink>
                  <NavLink className="mr-2 text-dark" to="/log-in">
                    Log In
                  </NavLink>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/flight-search"
            render={props => <FlightSearch {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/log-in"
            render={props => <LogIn {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/profile"
            render={props => <Profile {...props} user={this.state} />}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
