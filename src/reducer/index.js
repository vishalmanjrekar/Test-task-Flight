import { combineReducers } from 'redux';
import flightsReducer from './flightReducer';

export default combineReducers({ flights : flightsReducer });