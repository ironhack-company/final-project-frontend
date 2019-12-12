import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import MyTrips from "./components/profile/MyTrips";
import actions from "./services/index";
import moduleName from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, NavItem } from "react-bootstrap";
import FlightSearch from "./components/Flights/FlightSearch";
import HotelSearch from "./components/Hotels/HotelSearch";
import CheckPrices from "./components/Flights/CheckPrices";

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
                  <NavLink className="mr-2 text-dark" to="/hotel-search">
                    Hotels
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
          <Route
            exact
            path="/"
            render={props => <Home {...props} setUser={this.setUser} />}
          />
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
            path="/hotel-search"
            render={props => <HotelSearch {...props} setUser={this.setUser} />}
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
          <Route
            exact
            path="/mytrips/:id"
            render={props => <MyTrips {...props} user={this.state} />}
          />
          <Route
            exact
            path="/check-prices"
            render={props => <CheckPrices {...props} user={this.state} />}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
