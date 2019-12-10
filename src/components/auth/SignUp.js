import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = async e => {
    e.preventDefault();
    let user = await actions.signUp(this.state);
    this.props.setUser({ ...user.data });
  };
  render() {
    return (
      <Fragment>
        <h2>SignUP</h2>
        <p>
          <span>Already signed up? </span>
          <Link to="/log-in" className="text-dark">
            Log In Here
          </Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <p>Name:</p>
          <input name="firstName" type="text" onChange={this.handleChange} />
          <input name="lastName" type="text" onChange={this.handleChange} />
          <p>Email:</p>
          <input name="email" type="email" onChange={this.handleChange} />
          <p>Profile Image:</p>
          <input name="profileImg" type="text" onChange={this.handleChange} />
          <p>Username:</p>
          <input name="username" type="text" onChange={this.handleChange} />
          <p>Password:</p>
          <input name="password" type="password" onChange={this.handleChange} />
          <input type="submit" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
