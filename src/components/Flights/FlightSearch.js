import React, { Component, Fragment } from "react";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import './FlightSearch.css'
import { Link, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

export class FlightSearch extends Component {
<<<<<<< HEAD
  state = {
    searchQuery: "",
    flights: [],
    savedFlights: [],
    filteredFlights: [],
    userLocation: { lat: 32, lng: 32 },
    loading: true,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  componentDidMount() {
    console.log("Components!");
    axios.get("http://localhost:5000/flight-search").then(data =>
      this.setState({
        airports: data.data
      })
    );
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
=======
state = {
	searchQuery: "",
  flights: [],
  savedFlights: [],
	filteredFlights: [],
	userLocation: { lat: 32, lng: 32 },
	loading: true ,
	showingInfoWindow: false,
	activeMarker: {},
	selectedPlace: {},
}
componentDidMount() {
	console.log("Components!")
	axios.get("http://localhost:5000/flight-search")
	.then(data => 
		this.setState({
			airports: data.data
		}, 
		)
	)
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
    
	getLocationData = () => {
		if (this.state.airports) {
			
			return this.state.airports.map((eachAirport, i) => {
				if (eachAirport.country == "United States")
				if (eachAirport.links_count > 15){
					return (
		
						<Marker 
						title = {eachAirport.name}
						// onMouseover={this.onMouseoverMarker}
						onClick={this.onClickOnMarker}
						name={eachAirport.name}
						code={eachAirport.iata_code}
						position={{lat: eachAirport._geoloc.lat, lng: eachAirport._geoloc.lng }}
						key={i}
						/>
					)
				}
			})
		}
	}
	
>>>>>>> 05748316925ff723bf2d92d29f88d26c09a1510f

// 	getFlights = () => {
// 		//get token on mount
// 		console.log("getFlight!");
// 		fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
// 			body:
// 			"grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
// 			headers: {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 			},
// 			method: "POST"
// 		})

// 			.then(res => res.json())
// 			.then(r => {
// 			console.log(r);
// 			let token = r.access_token; //token comes here
// 			const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this.state.searchQuery || this.state.searchCode}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
// 			// console.log(this.state, RAPIDAPI_API_URL, "[][][[]");
// 			const RAPIDAPI_REQUEST_HEADERS = {
// 				Authorization: `Bearer ${token}` //token goes here
// 			};
//         this.setState({
//           userLocation: { lat: latitude, lng: longitude },
//           loading: false
//         });
//       },
//       () => {
//         this.setState({ loading: false });
//       }
//     );
//   }

//   getLocationData = () => {
//     if (this.state.airports) {
//       return this.state.airports.map((eachAirport, i) => {
//         return (
//           <Marker
//             title={eachAirport.name}
//             onMouseover={this.onMouseoverMarker}
//             name={eachAirport.name}
//             position={{
//               lat: eachAirport._geoloc.lat,
//               lng: eachAirport._geoloc.lng
//             }}
//             key={i}
//           />
//         );
//       });
//     }
//   };
  onMouseoverMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  getFlights = () => {
    //get token on mount
    console.log("getFlight!");
    // fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    //   body:
    //     "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST"
    // })
    //   .then(res => res.json())
    //   .then(r => {
    //     console.log(r);
    //     let token = r.access_token; //token comes here
    //     const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this.state.searchQuery}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
    //     console.log(this.state, RAPIDAPI_API_URL, "[][][[]");
    //     const RAPIDAPI_REQUEST_HEADERS = {
    //       Authorization: `Bearer ${token}` //token goes here
    //     };
    const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this.state.searchQuery || this.state.searchCode}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
    console.log(this);
    axios
      .get(RAPIDAPI_API_URL, { headers: this.props.headers }) //use token to get data
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
    //});
  };

  showFlights = () => {
    return this.state.filteredFlights.map((flight, index) => {
      console.log(flight);
      return (
        <ul className="flightDetails" key={index}>
        	<li className="flightLocation">
		  		<h3>✈️ {flight.origin} to {flight.destination}</h3>   		
			</li>
        	{/* <li className="flightLocation">
		  		<h3>To:</h3> 
				  	<p>{flight.destination}</p>
			</li> */}
        	<li className="flightDate">
				<div className="dates">
					<p><strong>from:</strong>{flight.departureDate} <strong>to:</strong>{flight.returnDate}</p>
				</div>
				
			</li>
          {/* <li className="flightDate">
		  		<h4>Return:</h4>
				  <p>{flight.returnDate}</p> 
			</li> */}
          <li className="flightPrice">
		  	<h4>Price: </h4>
			  <p>${flight.price.total}</p>
			</li>
          {console.log(flight.links.flightOffers)}
          <button>
            <Link
              to={{
                pathname: "/check-prices",
                props: {
                  flightLink: `${flight.links.flightOffers}`,
                  headers: this.props.headers
                }
              }}
            >
              Check prices to {flight.destination}
            </Link>
          </button>
          <button onClick = {(e) => this.saveFlight(e, flight)}>
            Save flight
          </button>
        </ul>
      );
    });
  };

<<<<<<< HEAD
  saveFlight = (e, flight) => {
    e.preventDefault()
    let copyUser = this.props.setUser
    copyUser.flights.push(flight)
    let copyFlights = [...this.state.savedFlights]
    this.setState({
      user: copyUser,
      savedFlights: copyFlights
        }, () => {
      console.log(this.state.user)
      axios.post(`http://localhost:5000/add-flight/${copyUser._id}`, {
        flights: this.state.user.flights
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    })

  }

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
=======
	// onMouseoverMarker = (props, marker, e) => {
	// 	console.log("hovering")
	// 	if(!this.state.hovered) {
>>>>>>> 05748316925ff723bf2d92d29f88d26c09a1510f

	// 		this.setState({
	// 			selectedPlace: props,
	// 			activeMarker: marker,
	// 			showingInfoWindow: true,
	// 			hovered: true
	// 		})
	// 	}
	// 	}
	onClickOnMarker = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			clicked: true,
			searchCode: props.code
		})
		console.log(this.state.flights)
		this.getFlights()
		let filteredFlights = this.state.flights.filter((flight, i) => {
			if (
			flight.origin
				.toLowerCase()
				.includes(this.state.searchCode.toLowerCase())
			) {
			return flight;
			}
		});
		this.setState({
			filteredFlights: filteredFlights
		});
		console.log(this.state.flights)
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
	
		
render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return (
        <Loader
          type="Plane"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
		  className = "loader"
        />
      );
      //return null;
    }
    return (
      <div className = "flightSearchPage">
        <Fragment>
		<div className = "flightSearch">
          <div>
            <form className="searchForm" onSubmit={this.handleSubmit}>
              <input 
			  	className="searchBar"
                placeholder="Search aiports"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <input className="searchBttn" type="submit" value="GO" />
            </form>
          </div>
          	<div className="showFlights">{this.showFlights()}</div>
		  </div>
        </Fragment>
		<div className="mapDiv">
		<Map
			google={google}
			initialCenter={userLocation}
			zoom={10}>

			<Marker onClick={this.onMarkerClick}
					name={'Current location'} />
			{this.getLocationData()}
			<InfoWindow
			marker={this.state.activeMarker}
			visible={this.state.showingInfoWindow}>
				<div>
				<h1>{this.state.selectedPlace.name}</h1>
				</div>
			</InfoWindow>
		</Map>
	  </div>
	</div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ")
})(FlightSearch);
