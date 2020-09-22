import React, {Component} from 'react';
import { connect } from "react-redux";
import './checkout.css';
import moment from "moment";

export class Checkout extends Component {


    render() {
        const { selectedFlight : {itinerary}} = this.props;
        const image= itinerary.outFlights[0].carrierImage
        let timeDuration = itinerary.outFlights[0].duration
        itinerary.outFlights.length > 1 && itinerary.outFlights.map((item2, index1) => {
            if(index1 !== 0) {
                timeDuration += item2.duration + item2.layoverDuration
            }
        })
        return (
            <div  className="container-large">
                <div className="head-tag">
                    <div className="custom-container">
                        <h4>Review your booking</h4>
                    </div>
                </div>
                <div className="custom-container">
                    <div className="Itinerary-wrapper">
                        <div className="itnry-flt-header">
                            <div className="make-flex">
                                <div className="label-view">
                                    <p>DEPART</p>
                                    <p>{moment(itinerary.outFlights[0].departDateTime).format('MMM DD YY')}</p>
                                </div>
                                <div className="class-section">
                                    <p><span>{itinerary.origin} - {itinerary.destination}</span></p>
                                    <p>{itinerary.outStops === 0 ? '': `${itinerary.outStops} stop |`} {Math.floor(timeDuration/60)}hrs {timeDuration%60}mins</p>
                                </div>
                            </div>
                            {/*<span className="fare-wrap"><p> Fare Rules</p></span>*/}
                        </div>
                        {itinerary.outFlights.map((data,dataIndex) => {

                            return (
                                <div className="itnry-flt-body" key={dataIndex}>
                                    <div className="airline-info">
                                        <span><img src={image}/></span>
                                        <div className="logo-info">
                                            <p className="font14"><b>{data.carrierFullName}</b></p>
                                            <p className="font12">{`${data.carrierCode}-${data.flightNumber}`}</p>
                                        </div>
                                    </div>
                                    <div className="air-line-content">
                                        <div className="fli-time-section">
                                            <div className="dept-time ">{data.leaving}</div>
                                            <p className="font14 bold">{moment(data.departDateTime).format('ddd,DD MMM YY')}</p>
                                            <p className="dept-city">
                                                <span className="bold">{itinerary.originGeoname.City}</span>{data.originAirportFullName}</p>
                                        </div>
                                        <p className="fli-stops">{Math.floor(data.duration/60)}hrs {data.duration%60}mins</p>
                                        <div className="fli-time-section pull-left">
                                            <p className="dept-time mb-0">{data.arriving}</p>
                                            <p className="font14 bold">{moment(data.arrivingDateTime).format('MMM DD YY')}</p>
                                            <p className="arrival-city">
                                                <span className="bold">{itinerary.destinationGeoname.City}</span>
                                                <p>{data.destinationAirportFullName}</p>
                                            </p></div>
                                    </div>
                                    <div className="content-right">
                                        <p className="append_bottom5 LatoBold mb-0 font12">Fare Type</p>
                                        <span className="font14 bold custom-train">SAVER</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedFlight: state.flights.selectedFlight,
    }
}

export default connect(mapStateToProps)(Checkout);
