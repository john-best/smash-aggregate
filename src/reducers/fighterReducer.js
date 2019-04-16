import * as types from "../actions/actionTypes";

export default function fighterReducer(state = {}, action) {
  switch (action.type) {
    case types.FIGHTER_LOAD_REQUEST:
      return {
        ...state,
        fighter_loading: true,
        fighter_loaded: false,
        error: false
      };

    case types.FIGHTER_LOAD_SUCCESS:
      var data = action.data
      return { ...state, fighter_loading: false, fighter_loaded: true, ...data };

    case types.FIGHTER_LOAD_FAILURE:
      return {
        ...state,
        fighter_loading: false,
        fighter_loaded: false,
        error: action.error
      };

    case types.SEGMENT_UPDATE_PARAM:
      var segments = [...state.segments ];
      segments[action.index] = { ...segments[action.index], [action.name]: action.value }
      return { ...state, segments};

    case types.DESCRIPTION_UPDATE_TEXT:
      return { ...state, description: action.value};

    case types.SEGMENT_LINK_UPDATE_PARAM:
      var segments = [ ...state.segments ]
      var links = state.segments[action.segment_index].links

      links[action.index] = { ...links[action.index], [action.name]: action.value }
      segments[action.segment_index].links = links

      return { ...state, segments }
      


    default:
      return state;
  }
}
