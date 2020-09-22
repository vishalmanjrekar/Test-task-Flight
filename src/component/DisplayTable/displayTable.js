import React, {Component} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import '../Search/search.css';
import * as actions from "../../action";

export class DisplayTable extends Component {
    handleFlightBooking = (selectedFlight) =>{
        const {getSelectedFlight,history} = this.props;
        getSelectedFlight(selectedFlight)
        history.push("/checkout")
    }

    render() {
        const {sortedBy,onSortHandle, data , totalPage, currentPage , onHandlePagination , returnDate} = this.props;
        return(
            <div className="main-content-flight">
                <div className="depart-wrap">
                    <FormControl>
                        <InputLabel id="demo-controlled-open-select-label">Sorted By</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={sortedBy}
                            onChange={(e) => onSortHandle(e.target.value)}
                        >
                            <MenuItem value='best'>best</MenuItem>
                            <MenuItem value='price'>price</MenuItem>
                            <MenuItem value='duration'>duration</MenuItem>
                            <MenuItem value='stops'>stops</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        data && data.map((item, index) => {
                            let timeDuration = item.itinerary.outFlights[0].duration
                            item.itinerary.outFlights.length > 1 && item.itinerary.outFlights.map((item2, index1) => {
                                if(index1 !== 0) {
                                    timeDuration += item2.duration + item2.layoverDuration
                                }
                            })
                            return (
                                <Card className="custom-info" key={index}>
                                    <div className="custom-itienary-flight">
                                        <span className="font14"><b>{item.itinerary.outFlights[0].carrierFullName}</b></span>
                                        {item.itinerary.outFlights.length > 1 ? item.itinerary.outFlights.map((data1) => {
                                            return (
                                                <span className="font12">{data1.carrierCode + data1.flightNumber}</span>
                                            )
                                        }) : <span className="font12">{item.itinerary.outFlights[0].carrierCode + item.itinerary.outFlights[0].flightNumber}</span>}
                                    </div>
                                    <CardContent key={index}>
                                        <img src={item.itinerary.outFlights[0].carrierImage}/>

                                        <div className="location">
                                            <span className="bold leave">{item.itinerary.outFlights[0].leaving}</span>
                                            <span className="font14">{item.itinerary.originGeoname.City}</span>
                                        </div>
                                        <div className="duration">
                                            <span className="font12 math"><b>{Math.floor(timeDuration/60)}hrs {timeDuration%60}mins</b></span>
                                            <span className="font12 m-1">{item.itinerary.outStops === 0 ? 'Non stop' : item.itinerary.outStops + "stop"}</span>
                                            {item.itinerary.outFlights.length > 0 && item.itinerary.outFlights.map((item1, index) => {
                                                if(index === 0) return null
                                                const title = <span>Plan Change <br/>{item1.originAirportFullName +'|'+ `${Math.floor(item1.layoverDuration/60)}hrs ${item1.layoverDuration%60}mins`}</span>
                                                return (
                                                    <Tooltip title={title}><Button className="tooltip-btn" variant="contained" color="secondary">Tooltip</Button></Tooltip>
                                                )
                                            })
                                            }
                                        </div>


                                        <div className="location" >
                                            <span className="bold leave"> {item.itinerary.outFlights[item.itinerary.outFlights.length - 1].arriving}</span>
                                            <span className="font14">{item.itinerary.destinationGeoname.City} </span>
                                        </div>
                                        <Button variant="contained" color="primary" onClick = {() => this.handleFlightBooking(item)}>Book</Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                    {<Pagination count={totalPage} page={currentPage} onChange={(e, page) => onHandlePagination(page)}/>}
                </div>
                <div>
                </div>
                <div className="return-access">
                    {
                        returnDate !== null && data && data.map((item, indexValue) => {
                            if(!item.itinerary.inFlights) {
                                return null
                            }
                            let timeDuration = item.itinerary.inFlights[0].duration
                            item.itinerary.inFlights.length > 1 && item.itinerary.inFlights.map((item2, index1) => {
                                if(index1 !== 0) {
                                    timeDuration += item2.duration + item2.layoverDuration
                                }
                            })
                            return (
                                <Card className="custom-info" key={`${indexValue}i`}>
                                    <div className="custom-itienary-flight">
                                        <span className="font14"><b>{item.itinerary.inFlights[0].carrierFullName}</b></span>
                                        {item.itinerary.inFlights.length > 1 ? item.itinerary.inFlights.map((data1) => {
                                            return (
                                                <span className="font12">{data1.carrierCode + data1.flightNumber}</span>
                                            )
                                        }) : <span className="font12">{item.itinerary.inFlights[0].carrierCode + item.itinerary.inFlights[0].flightNumber}</span>}
                                    </div>
                                    <CardContent>
                                        <img src={item.itinerary.inFlights[0].carrierImage}/>

                                        <div className="location">
                                            <span className="bold leave">{item.itinerary.inFlights[0].leaving}</span>
                                            <span className="font14">{item.itinerary.destinationGeoname.City}</span>
                                        </div>
                                        <div className="duration">
                                            <span className="font12 math"><b>{Math.floor(timeDuration/60)}hrs {timeDuration%60}mins</b></span>
                                            <span className="font12 m-1">{item.itinerary.inStops === 0 ? 'Non stop' : item.itinerary.inStops + "stop"}</span>
                                            {item.itinerary.inFlights.length > 0 && item.itinerary.inFlights.map((item1, index) => {
                                                if(index === 0) return null
                                                const title = <span>Plan Change <br/>{item1.originAirportFullName +'|'+ `${Math.floor(item1.layoverDuration/60)}hrs ${item1.layoverDuration%60}mins`}</span>
                                                return (
                                                    <Tooltip title={title}><Button className="tooltip-btn" variant="contained" color="secondary">Tooltip</Button></Tooltip>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="location" >
                                            <span className="bold leave"> {item.itinerary.inFlights[item.itinerary.inFlights.length - 1].arriving}</span>
                                            <span className="font14"> {item.itinerary.originGeoname.City} </span>
                                        </div>
                                        <Button variant="contained" color="primary" onClick={() => this.handleFlightBooking(item)}>Book</Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
}

export default connect(null, actions)(DisplayTable);
