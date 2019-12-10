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
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import css from "./index.css";

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
            <NavLink to="/">TripApp</NavLink>
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Input your destination"
              className="mr-sm-2"
            />
            {/* <Button variant="outline-info">Search</Button> */}
          </Form>
          <Nav className="mr-auto">
            <NavLink to="/">Home</NavLink>
          </Nav>
          <Nav>
            {this.state.email ? (
              <Fragment>
                Logged in as {this.state.username}
                <NavLink to="/profile">Profile</NavLink>
                <NavLink className="NavLink" onClick={this.logOut} to="/">
                  Log Out
                </NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="mr-2" to="/sign-up">
                  Sign Up
                </NavLink>
                <NavLink className="mr-2" to="/log-in">
                  Log In
                </NavLink>
              </Fragment>
            )}
          </Nav>
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


          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
