import { GET_SELECTED_FLIGHT_LIST, GET_SEARCH_FLIGHT_DETAILS } from "./type";

export const getSelectedFlight = (selectedFlight) => async dispatch => {
    dispatch({
        type: GET_SELECTED_FLIGHT_LIST,
        payload: selectedFlight
    });
}

export const selectedFlightDetails = (selectedFlightDetails) => async dispatch => {
    dispatch({
        type: GET_SEARCH_FLIGHT_DETAILS,
        payload: selectedFlightDetails
    });
}