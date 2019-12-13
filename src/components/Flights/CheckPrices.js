import React, { Component, Fragment } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export default class CheckPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // flightData: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log("Component mounted");
    this.getPrices();
  }

  getPrices = () => {
    console.log("get prices!");
    if (this.props.location.props) {
      axios
        .get(`${this.props.location.props.flightLink}`, {
          headers: this.props.location.props.headers
        })
        .then(response => {
          let data = response.data.data;
          this.setState({
            flightData: data,
            loading: false
          });
          console.log(this.state.flightData);
        });
      // this.showPrices();
    }
  };

  displayPrices = () => {
    console.log("calling display prices");
    if (this.state.flightData) {
      return this.state.flightData.map((flight, i) => {
        console.log(flight);
        return (
          <ul key={i}>
            <li>
              From
              {
                flight.offerItems[0].services[0].segments[0].flightSegment
                  .departure.iataCode
              }
            </li>
            <li>
              To
              {
                flight.offerItems[0].services[0].segments[0].flightSegment
                  .arrival.iataCode
              }
            </li>
            <li>
              Carrier
              {
                flight.offerItems[0].services[0].segments[0].flightSegment
                  .operating.carrierCode
              }
            </li>
            <li>
              Duration
              {
                flight.offerItems[0].services[0].segments[0].flightSegment
                  .duration
              }
            </li>
            <hr />
            <li>
              From
              {
                flight.offerItems[0].services[1].segments[0].flightSegment
                  .departure.iataCode
              }
            </li>
            <li>
              To
              {
                flight.offerItems[0].services[1].segments[0].flightSegment
                  .arrival.iataCode
              }
            </li>
            <li>
              Carrier
              {
                flight.offerItems[0].services[1].segments[0].flightSegment
                  .operating.carrierCode
              }
            </li>
            <li>
              Duration
              {
                flight.offerItems[0].services[1].segments[0].flightSegment
                  .duration
              }
            </li>
            <li>Price {flight.offerItems[0].price.total} </li>
          </ul>
        );
      });
    }
  };

  // showPrices = () => {
  //   console.log("show prices!");
  //   return this.state.flightData.map((flight, index) => {
  //     console.log(flight);
  //     return <ul key={index}></ul>;
  //   });
  // };

  render() {
    // const loading = this.state;
    // if (loading) {
    //   return (
    //     <Loader
    //       type="Plane"
    //       color="#00BFFF"
    //       height={100}
    //       width={100}
    //       timeout={3000} //3 secs
    //     />
    //   );
    // }
    return (
      <Fragment>
        {this.displayPrices()}
        {/* <div>{this.showPrices()}</div> */}
      </Fragment>
    );
  }
}
