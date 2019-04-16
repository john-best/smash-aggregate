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
      var data = action.data;
      return {
        ...state,
        fighter_loading: false,
        fighter_loaded: true,
        ...data
      };

    case types.FIGHTER_LOAD_FAILURE:
      return {
        ...state,
        fighter_loading: false,
        fighter_loaded: false,
        error: action.error
      };

    case types.SEGMENT_UPDATE_PARAM:
      var segments = { ...state.segments };
      segments[action.id] = {
        ...segments[action.id],
        [action.name]: action.value
      };
      return { ...state, segments };

    case types.DESCRIPTION_UPDATE_TEXT:
      return { ...state, description: action.value };

    case types.SEGMENT_LINK_UPDATE_PARAM:
      var segments = { ...state.segments };
      var links = state.segments[action.segment_id].links;

      links[action.link_id] = {
        ...links[action.link_id],
        [action.name]: action.value
      };
      segments[action.segment_id].links = links;

      return { ...state, segments };

    case types.SEGMENT_LINK_ADD:

      var segments = { ...state.segments };
      var links = {};

      links[action.link_id] = {
        type: action.link_type,
        title: action.title,
        url: action.url
      };
      segments[action.segment_id].links = links;
      
      if (segments[action.segment_id].link_ids === undefined) {
        segments[action.segment_id].link_ids = []
        segments[action.segment_id].link_ids.push(action.link_id)
      }
      return { ...state, segments };

    case types.SEGMENT_DELETE:
      var segment_ids = [...state.segment_ids];

      segment_ids = segment_ids.filter(value => value !== action.segment_id);
      return { ...state, segment_ids };

    case types.SEGMENT_ADD:
      var segment_ids = [...state.segment_ids];
      segment_ids.push(action.segment_id);

      var segments = { ...state.segments };
      segments[action.segment_id] = action.segment;

      return { ...state, segments, segment_ids };

    default:
      return state;
  }
}
