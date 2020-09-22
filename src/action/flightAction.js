import { GET_SELECTED_FLIGHT_LIST } from "./type";

export const getSelectedFlight = (selectedFlight) => async dispatch => {
    dispatch({
        type: GET_SELECTED_FLIGHT_LIST,
        payload: selectedFlight
    });
}