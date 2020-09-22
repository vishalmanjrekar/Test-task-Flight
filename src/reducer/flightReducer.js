import { GET_SELECTED_FLIGHT_LIST } from '../action/type';

const INITIAL_STATE = {
    selectedFlight: {},
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SELECTED_FLIGHT_LIST:
            return { ...state, selectedFlight: action.payload }
        default:
            return state;
    }
}