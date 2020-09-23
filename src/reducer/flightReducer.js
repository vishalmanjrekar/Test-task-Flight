import { GET_SELECTED_FLIGHT_LIST, GET_SEARCH_FLIGHT_DETAILS } from '../action/type';

const INITIAL_STATE = {
    selectedFlight: {},
    searchFlightDetails: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SELECTED_FLIGHT_LIST:
            return { ...state, selectedFlight: action.payload }
        case GET_SEARCH_FLIGHT_DETAILS:
            return {...state, searchFlightDetails: action.payload}
        default:
            return state;
    }
}