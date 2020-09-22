import 'date-fns';
import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete'
import DateFnsUtils from '@date-io/date-fns';
import DisplayTable from "../DisplayTable/displayTable";
import './search.css';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import moment from "moment";

export class Search extends Component {
    state = {
        selectedFromOption: null,
        selectedToOption: null,
        totalAdult: 1,
        totalChild: 0,
        options: [],
        city: '',
        departureDate: moment().format('YYYY-MM-DD'),
        returnDate: null,
        isDepartureOpen: false,
        isReturnOpen: false,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        sortedBy: 'price'
    };

    handleChange = (event, newValue, key) => {
        if(key === 'origin') {
            this.setState({
                selectedFromOption: newValue
            })
        } else {
            this.setState({
                selectedToOption: newValue
            })
        }
    }

    onInputHandle = (e,value) => {
        const { city } = this.state
        if(value && city !== value) {
            this.setState({city: value})
            let formData = new FormData();
            formData.append('country','ALL')
            formData.append('city',value)
            formData.append('iatafilter',true)
            fetch("https://openflights.org/php/apsearch.php", {
                "method": "POST",
                body: formData
            })
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    if(res.airports) {
                        const test = res.airports.map((item) => {
                            return {label: item.ap_name, value: item.iata}
                        })
                        this.setState({options: test})
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    onSearchHandle = () => {
        const {selectedToOption, selectedFromOption, returnDate, departureDate, totalChild, totalAdult, sortedBy} = this.state
        if (selectedToOption !== null && selectedFromOption !== null) {
            fetch(`http://business-issue1608.test.travelwits.com/getflights?origin=${selectedFromOption.value}&destination=${selectedToOption.value}&leaveDate=${departureDate}&${returnDate && `returnDate=${returnDate}`}&numberOfAdults=${totalAdult}&numberOfChildren=${totalChild}&page=0&sortBy=${sortedBy}`)
                .then(response => {
                    return response.json();
                })
                .then(res => {

                    this.setState({tableData: res.legs, totalPage: res.totalPages, currentPage: 1})
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    onHandlePagination = (value) => {
        this.setState({currentPage: value })
        const {selectedToOption, selectedFromOption, returnDate, departureDate, totalChild,totalAdult, sortedBy} = this.state
        fetch(`http://business-issue1608.test.travelwits.com/getflights?origin=${selectedFromOption.value}&destination=${selectedToOption.value}&leaveDate=${departureDate}&${returnDate&&`returnDate=${returnDate}`}&numberOfAdults=${totalAdult}&numberOfChildren=${totalChild}&page=${value}&sortBy=${sortedBy}`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.setState({tableData: res.legs,totalPage: res.totalPages})
            })
            .catch(err => {
                console.log(err);
            });

    }

    onSortHandle = (value) => {
        const {selectedToOption, selectedFromOption, returnDate, departureDate, totalChild,totalAdult, currentPage} = this.state
        this.setState({sortedBy: value})
        fetch(`http://business-issue1608.test.travelwits.com/getflights?origin=${selectedFromOption.value}&destination=${selectedToOption.value}&leaveDate=${departureDate}&${returnDate&&`returnDate=${returnDate}`}&numberOfAdults=${totalAdult}&numberOfChildren=${totalChild}&page=${currentPage}&sortBy=${value}`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.setState({tableData: res.legs,totalPage: res.totalPages})
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { selectedFromOption, selectedToOption, totalAdult,currentPage,sortedBy, tableData,totalPage, totalChild, options, isDepartureOpen, isReturnOpen, departureDate, returnDate } = this.state;
        return (
            <div>
                <div className="main-wrapper-flight">
                    <div className="search-content">
                        <div className="finder">
                            <Autocomplete
                                value={selectedFromOption}
                                selectOnFocus
                                renderOption={(option) => option.label}
                                onInputChange={(e, value) => this.onInputHandle(e, value)}
                                getOptionLabel={(option) => option.label}
                                options={options}
                                onClose={() => {
                                    this.setState({options: []})
                                }}
                                onChange={(event, newValue) => this.handleChange(event, newValue,'origin')}
                                renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                            />
                            <div className="swap-icon">
                                <SwapHorizIcon onClick={() => this.setState({selectedFromOption: selectedToOption, selectedToOption: selectedFromOption})}/>
                            </div>
                            <Autocomplete
                                value={selectedToOption}
                                selectOnFocus
                                onInputChange={(e, value) => this.onInputHandle(e, value)}
                                renderOption={(option) => option.label}
                                getOptionLabel={(option) => option.label}
                                options={options}
                                onChange={(event, newValue) => this.handleChange(event, newValue,'destination')}
                                renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
                            />
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                data-id="departureDate"
                                minDate={moment()}
                                variant="inline"
                                open={isDepartureOpen}
                                onClose={() => this.setState({isDepartureOpen: false})}
                                onClick={() => this.setState({isDepartureOpen: true})}
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline-departure"
                                label="Departure"
                                value={departureDate || moment()}
                                onChange={(date) => this.setState({departureDate: moment(date).format('YYYY-MM-DD')})}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                autoOk
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                open={isReturnOpen}
                                minDate={moment(departureDate).format('YYYY-MM-DD')}
                                id="date-picker-inline"
                                label="Return"
                                value={returnDate}
                                onChange={(date) => this.setState({returnDate: moment(date).format('YYYY-MM-DD')})}
                                KeyboardButtonProps={{
                                    onFocus: e => {
                                        this.setState({isReturnOpen: true});
                                    }
                                }}
                                PopoverProps={{
                                    disableRestoreFocus: true,
                                    onClose: () => {
                                        this.setState({isReturnOpen: false});
                                    }
                                }}
                                InputProps={{
                                    onFocus: () => {
                                        this.setState({isReturnOpen: true});
                                    }
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <div className="count">
                            <label>Adult (12+ yrs)</label>
                            <div className="count-content">
                                <Button variant="contained" color="secondary" disabled={totalAdult < 2} onClick={() => totalAdult < 2 ? () => {}  : this.setState({totalAdult: totalAdult - 1 })}>-</Button>
                                <TextField disabled value={totalAdult}/>
                                <Button data-id="searchButton" variant="contained" color="primary" onClick={() => this.setState({totalAdult: totalAdult + 1})}>+</Button>
                            </div>
                        </div>
                        <div className="count">
                            <label>Children (2-12 yrs)</label>
                            <div className="count-content">
                                <Button variant="contained" color="secondary" disabled={totalChild < 1} onClick={() => totalChild < 1 ? () => {} : this.setState({totalChild: totalChild - 1})}>-</Button>
                                <TextField disabled value={totalChild}/>
                                <Button variant="contained" color="primary" onClick={() => this.setState({totalChild: totalChild + 1})}>+</Button>
                            </div>
                        </div>
                    </div>
                    <div className="search-btn">
                        <Button variant="contained" color="primary" onClick={() => this.onSearchHandle()}>Search</Button>
                    </div>
                </div>
                {tableData.length > 0 && <DisplayTable data={tableData} onSortHandle={this.onSortHandle} returnDate={returnDate} totalPage={totalPage} currentPage={currentPage} onHandlePagination={this.onHandlePagination} sortedBy={sortedBy} history={this.props.history}/> }
            </div>
        );
    }
}

export default Search
