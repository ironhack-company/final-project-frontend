import React, { Component } from 'react'
import axios from 'axios'




export default class FlightSearch extends Component {
    constructor() {
        super();

        this.state = {
            flights: [],
            cityFrom: [],

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

    }


    showFlights = (e) => {
        let copyFlights = [...this.state.flights]

        if (copyFlights.length > 0) {

            return this.state.flights.map(eachFlight => {
                return eachFlight
            })

        }
    }



    // showPrices = (e) => {

    // 	let copyQuotes = [...this.state.flights]
    // 	if (copyQuotes.length > 0) {
    // 		console.log(copyQuotes)
    // 		return (copyQuotes.map((keyName, i) => {
    // 			let logo = this.state.logos.filter(eachCompany => {
    // 				return eachCompany.carrierId === keyName.InboundLeg.CarrierIds[0]
    // 			})
    // 			// console.log(logo[0].logo, '90909090')

    // 			return (

    //                 <div>

    //                 </div>

    // 				// <div className="flight flex">

    // 				// 	<div className="flight-buy">
    // 				// 		{logo[0] ?
    // 				// 			<img src={logo[0].logo} className="airline-logo" alt="Turkish airlines" />
    // 				// 			:
    // 				// 			<img src='./images/alaska.svg' className="airline-logo" alt="Alaska airlines" />

    // 				// 		}
    // 				// 		<button>

    // 				// 			{keyName.MinPrice} USD
    // 				//   </button>
    // 				// 	</div>
    // 				// 	<div className="flight-info flex">
    // 				// 		<div>
    // 				// 			{/* <h3></h3> */}
    // 				// 			<span>{this.state.cityTo}</span>
    // 				// 			<span className="gray">
    // 				// 				{/* { departure } */}
    // 				// 				Inbound
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 		<div>
    // 				// 			<span className="gray">
    // 				// 				{/* {keyName.MinPrice} */}
    // 				// 				🛫
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 		<div>
    // 				// 			{/* <h3></h3> */}
    // 				// 			<span>{this.state.cityFrom}</span>
    // 				// 			<span className="gray">
    // 				// 				Inbound
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 	</div>

    // 				// 	<div className="flight-info2 flex2">
    // 				// 		<div>
    // 				// 			{/* <h3></h3> */}
    // 				// 			<span>{this.state.cityFrom}</span>
    // 				// 			<span className="gray">
    // 				// 				{/* { departure } */}
    // 				// 				Outbound
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 		<div>
    // 				// 			<span className="gray">
    // 				// 				{/* {keyName.MinPrice} USD */}
    // 				// 				🛬
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 		<div>
    // 				// 			{/* <h3></h3> */}
    // 				// 			<span>{this.state.cityTo}</span>
    // 				// 			<span className="gray">
    // 				// 				Outbound
    // 				// 	  </span>
    // 				// 		</div>
    // 				// 	</div>


    // 				// </div>
    // 			)
    // 		}
    // 		))
    // 	}
    // }

    render() {
        return (
            <div>





                <form onSubmit={(e) => { this.getCities(e); this.getWeather(e) }}>
                    {/* <Calendar name='dateStart' onChange={this.onChange} value={this.state.date} />
						<Calendar name='endDate' onChange={this.onChange} value={this.state.date} /> */}




                    <div class="booking-form">




                        <div class="form-group">
                            <span class="form-label">Origin City</span>
                            <input className="form-control" type="text" name='cityFrom' placeholder="Origin City..." />
                        </div>


                        <div className="form-btn">
                            <button className="submit-btn">Show flights
							 </button>
                        </div>

                        {/* <button></button> */}



                    </div>

                </form>





                {this.showFlights()}

            </div>
        )
    }
}
