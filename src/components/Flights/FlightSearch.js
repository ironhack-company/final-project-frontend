import React, { Component } from 'react'
import axios from 'axios'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class FlightSearch extends Component {
    constructor() {
		super();

		this.state = {
			flights: [],
			userLocation: { lat: 32, lng: 32 },
			loading: true 
		}
	}


    componentDidMount() {
        fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            body: "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
          }).then(res => res.json()).then(r => {
            console.log(r)
            let token = r.access_token
      
            const RAPIDAPI_REQUEST_HEADERS = {
              'Authorization': `Bearer ${token}`
            };
      
            axios.get(RAPIDAPI_API_URL, { headers: RAPIDAPI_REQUEST_HEADERS })
              .then(response => {
                const data = response.data;
                console.log('data', data)
                
                
                this.setState({
                    flights: response.data,
					
                });

              })
              .catch(error => {
                console.error('create student error', error.response)
                alert(JSON.stringify(error.response.data))
              })
          })
      
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      
          axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
            grant_type: 'client_credentials',
            client_id: 'AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6',
            client_secret: 'PyEChDme4fGCMvzZ'
          }, config).then(res => {
            console.log(res, '?')
          }).catch(err => console.log(err))
      
          const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD`;
			
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
	
    render() {
		const { loading, userLocation } = this.state;
		const { google } = this.props;
	
		if (loading) {
		  return null;
		}
        return (
            <div>
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