import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class FlightSearch extends Component {
   

		state = {
			searchQuery: "",
			flights: [],
			filteredFlights: [],
			userLocation: { lat: 32, lng: 32 },
			loading: true 
		}
	


    componentDidMount() {
		  navigator.geolocation.getCurrentPosition(
			position => {
			  const { latitude, longitude } = position.coords;
	  
			  this.setState({
				userLocation: { lat: latitude, lng: longitude },
				loading: false
			  });
			},
			() => {
			  this.setState({ loading: false });
			}
		  );
		}

		getFlights = () => {
			//get token on mount
			console.log("getFlight!");
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
				let token = r.access_token; //token comes here
				const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this.state.searchQuery}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
				console.log(this.state, RAPIDAPI_API_URL, "[][][[]");
				const RAPIDAPI_REQUEST_HEADERS = {
				  Authorization: `Bearer ${token}` //token goes here
				};
		
				axios
				  .get(RAPIDAPI_API_URL, {
					headers: RAPIDAPI_REQUEST_HEADERS
				  }) //use token to get data
				  .then(response => {
					const data = response.data.data;
					console.log("data", response, data.data);
		
					this.setState({
					  flights: data, //set the flights to state
					  filteredFlights: data
					});
				  })
				  .catch(error => {
					console.error("create student error", error.response);
				  });
			  });
		  };
		
		  handleInputChange = e => {
			console.log(this.state);
			this.setState({
			  searchQuery: e.target.value
			});
			let filteredFlights = this.state.flights.filter((flight, i) => {
			  if (
				flight.origin
				  .toLowerCase()
				  .includes(this.state.searchQuery.toLowerCase())
			  ) {
				return flight;
			  }
			});
			this.setState({
			  filteredFlights: filteredFlights
			});
		  };
		
		  handleSubmit = e => {
			e.preventDefault();
			this.getFlights(); //after the user told you what to
		  };
		
		  showFlights = () => {
			return this.state.filteredFlights.map((flight, index) => {
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
		const { loading, userLocation } = this.state;
		const { google } = this.props;
	
		if (loading) {
		  return null;
		}
        return (
            <div>
			 <Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Input your location"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Search cheap flights" />
          </form>
        </div>
        <div>{this.showFlights()}</div>
      </Fragment>
				 <Map
        google={google}
        initialCenter={userLocation}
        zoom={10}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        </InfoWindow>
      </Map>

            </div>
        )
	}
}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ")
  })(FlightSearch)