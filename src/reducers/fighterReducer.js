import * as types from "../actions/actionTypes";

export default function fighterReducer(state = {}, action) {
  switch (action.type) {
    case types.FIGHTER_LOAD_REQUEST:
      return {
        ...state,
        fighter_loading: true,
        fighter_data: null,
        error: false
      };

    case types.FIGHTER_LOAD_SUCCESS:
      return { ...state, fighter_loading: false, fighter_data: action.data };

    case types.FIGHTER_LOAD_FAILURE:
      return {
        ...state,
        fighter_loading: false,
        fighter_data: null,
        error: action.error
      };

    default:
      return state;
  }
}
