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

    case types.SEGMENT_UPDATE_PARAM:
      var segments = [...state.fighter_data.segments];
      segments[action.index] = { ...segments[action.index], [action.name]: action.value }

      var fighter_data = { ...state.fighter_data, segments: segments };
      return { ...state, fighter_data: fighter_data };

    case types.DESCRIPTION_UPDATE_TEXT:
      var fighter_data = { ...state.fighter_data, description: action.value };
      return { ...state, fighter_data: fighter_data };
    
    default:
      return state;
  }
}
