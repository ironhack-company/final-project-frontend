import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./Profile.css"

const Profile = props => {
    console.log(props.user)
  if (!props.user.username) {
    props.history.push("/log-in");
  }
  return (
  <section className='profilePage'>


  <div className="userProfile">
  <img className="profilePic" src={props.user.profileImg}/>
  <h1>Welcome, {props.user.username}! </h1>
  <div>
    <h3>{props.user.firstName} {props.user.lastName}</h3>
    <p>{props.user.email}</p>
    <ul>
        <li><Link to ={`/mytrips/${props.user.trips}`}>{props.user.trips}</Link></li>
    </ul>
  </div>
  </div>  
  </section>)
};

export default Profile;
