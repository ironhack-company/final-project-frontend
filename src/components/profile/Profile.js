import React, { Component } from "react";

const Profile = props => {
  if (!props.user.username) {
    props.history.push("/log-in");
  }
  return <div>Profile Welcome {props.user.username} !!!</div>;
};

export default Profile;
