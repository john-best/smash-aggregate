import * as types from "../actions/actionTypes";
import shortid from "shortid";

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

    case types.DESCRIPTION_UPDATE_TEXT:
      return { ...state, description: action.value };

    case types.MATCHUP_UPDATE_TEXT:
      var matchups = { ...state.matchups };
      matchups[action.fighter] = action.text;
      return { ...state, matchups };

    case types.SEGMENT_UPDATE_PARAM:
      var segments = { ...state.segments };
      segments[action.id] = {
        ...segments[action.id],
        [action.name]: action.value
      };
      return { ...state, segments };

    case types.SEGMENT_ADD:
      var segment_ids = [...state.segment_ids];
      segment_ids.push(action.segment_id);

      var segments = { ...state.segments };
      segments[action.segment_id] = action.segment;

      return { ...state, segments, segment_ids };

    case types.SEGMENT_DELETE:
      var segment_ids = [...state.segment_ids];

      segment_ids = segment_ids.filter(value => value !== action.segment_id);
      return { ...state, segment_ids };

    case types.SEGMENT_MOVE:
      var segment_ids = [...state.segment_ids];

      if (action.direction == "up") {
        var index = segment_ids.indexOf(action.segment_id);
        if (index === 0) {
          console.log("User tried to move top segment even higher!");
          return state;
        }

        segment_ids.splice(index - 1, 0, segment_ids.splice(index, 1)[0]);
      } else {
        var index = segment_ids.indexOf(action.segment_id);
        if (index === segment_ids.length - 1) {
          console.log("User tried to move bottom segment even lower!");
          return state;
        }
        
        segment_ids.splice(index + 1, 0, segment_ids.splice(index, 1)[0]);
      }

      return { ...state, segment_ids };

    case types.SEGMENT_LINK_ADD:
      var segments = { ...state.segments };
      var links = { ...state.segments[action.segment_id].links };

      if (links === undefined) {
        links = {};
      }

      links[action.new_id] = { type: "linkify", title: "", url: "" };
      segments[action.segment_id].links = links;

      var link_ids;
      if (
        state.segments[action.segment_id].link_ids === undefined ||
        state.segments[action.segment_id].link_ids.length === 0
      ) {
        link_ids = [];
        link_ids.push(action.new_id);
      } else {
        link_ids = [...state.segments[action.segment_id].link_ids];
        link_ids.splice(link_ids.indexOf(action.link_id) + 1, 0, action.new_id);
      }
      segments[action.segment_id].link_ids = link_ids;

      return { ...state, segments };

    case types.SEGMENT_LINK_DEL:
      var segments = { ...state.segments };
      var links = { ...state.segments[action.segment_id].links };
      var link_ids = [...state.segments[action.segment_id].link_ids];

      delete links[action.link_id];
      link_ids.splice(link_ids.indexOf(action.link_id), 1);

      if (link_ids.length === 0) {
        var new_id = shortid.generate();
        link_ids = [new_id];
        links[new_id] = { type: "linkify", title: "", url: "" };
      }

      segments[action.segment_id].links = links;
      segments[action.segment_id].link_ids = link_ids;

      return { ...state, segments };

    case types.SEGMENT_LINK_MOVE:
      var segments = { ...state.segments };
      var link_ids = [...state.segments[action.segment_id].link_ids];

      console.log("moving " + action.link_id + " " + action.direction);

      if (action.direction == "up") {
        var index = link_ids.indexOf(action.link_id);
        if (index === 0) {
          console.log("User tried to move top link even higher!");
          return state;
        }

        link_ids.splice(index - 1, 0, link_ids.splice(index, 1)[0]);
      } else {
        var index = link_ids.indexOf(action.link_id);
        if (index === link_ids.length - 1) {
          console.log("User tried to move bottom link even lower!");
          return state;
        }

        link_ids.splice(index + 1, 0, link_ids.splice(index, 1)[0]);
      }

      segments[action.segment_id].link_ids = link_ids;
      return { ...state, segments };

    case types.SEGMENT_LINK_UPDATE_PARAM:
      var segments = { ...state.segments };
      var links = state.segments[action.segment_id].links;

      links[action.link_id] = {
        ...links[action.link_id],
        [action.name]: action.value
      };
      segments[action.segment_id].links = links;

      return { ...state, segments };

    default:
      return state;
  }
}
