import * as types from "./actionTypes";
import { data } from "../components/tempdata";

export const fighterActions = {
    loadFighter
}

function loadFighter(fighter) {
    return (dispatch) => {

        console.log("loading fighter: " + fighter)
        dispatch(request());

        // do loading here
        dispatch(success(data))
        console.log(data)
        //return {data: data}
    };

    function request() {
        return { type: types.FIGHTER_LOAD_REQUEST, isLoading: true }
    }

    function success(data) {
        return { type: types.FIGHTER_LOAD_SUCCESS, isLoading: false, data: data }
    }

    function failure(error) {
        return { type: types.FIGHTER_LOAD_FAILURE, isLoading: false, error: error }
    }
}

