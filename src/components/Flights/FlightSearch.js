import React, { Component } from "react";
import axios from "axios";

export default class FlightSearch extends Component {
  constructor() {
    super();

    this.state = {
      flights: []
    };
  }

  componentDidMount() {
    //get token on mount
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      body:
        "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(r => {
        console.log(r);
        let token = r.access_token; //comes here
        const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD`;
        const RAPIDAPI_REQUEST_HEADERS = {
          Authorization: `Bearer ${token}` //token goes here
        };

        axios
          .get(RAPIDAPI_API_URL, { headers: RAPIDAPI_REQUEST_HEADERS }) //use token to get data
          .then(response => {
            const data = response.data.data;
            console.log("data", data.data);

            this.setState({
              flights: data //set teh flights to state
            });
          })
          .catch(error => {
            console.error("create student error", error.response);
          });
      });
  }

  // show flights
  showFlights = () => {
    return this.state.flights.map((flight, index) => {
      console.log(flight);
      return (
        <ul key={index}>
          <li>From {flight.origin}</li>
          <li>To {flight.destination}</li>
          <li>Depart: {flight.departureDate}</li>
          <li>Return: {flight.returnDate}</li>
          <li>Price: ${flight.price.total}</li>
        </ul>
      );
    });
  };

  render() {
    return <div>{this.showFlights()}</div>;
  }
}
