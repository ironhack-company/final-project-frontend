import React, { Component, Fragment } from "react";
import axios from "axios";

export default class CheckPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: []
    };
  }

  componentDidMount() {
    console.log(this)
    if (this.props.location.props) {
      console.log(this)
      //"https://test.api.amadeus.com/v1/shopping/flight-offers?origin=MIA&destination=MSY&departureDate=2019-12-26&returnDate=2020-01-02&adults=1&nonStop=false"
      console.log(this.props.location.props);
      axios.get(`${this.props.location.props.flightLink}`, { headers: this.props.location.props.headers }).then(response => {
        console.log(response);
        this.setState({flighData:response.data})
      });
    }
  }

  getPrices = () => {
    console.log("get prices!");
  };

  showPrices = () => {
    console.log("show prices!");
  };

  render() {
    return (
      <Fragment>
        <div>{this.showPrices()}</div>
      </Fragment>
    );
  }
}
