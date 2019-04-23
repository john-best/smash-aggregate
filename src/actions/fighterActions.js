import * as types from "./actionTypes";
import { data } from "../components/tempdata";
import shortid from "shortid";
import axios from "axios";

export const fighterActions = {
  loadFighter,
  saveFighter,
  updateDescription,
  updateMatchupText,
  addSegment,
  deleteSegment,
  moveSegment,
  updateSegmentParam,
  addSegmentLink,
  delSegmentLink,
  moveSegmentLink,
  updateSegmentLinkParam
};

function loadFighter(fighter) {
  return dispatch => {
    console.log("loading fighter: " + fighter);
    dispatch(request());

    axios
      .get("http://localhost:3001/fighter/" + fighter)
      .then(response => {

        console.log(response.data)

        let res_data = response.data;

        let data = {};
        data.icon = res_data.fighter.icon;
        data.fighter_name = res_data.fighter.name;
        data.fighter_url = fighter;

        data.description = res_data.fighter.description;

        data.discord_url = res_data.fighter.discord_url;
        data.kh_url = res_data.fighter.kh_url;
        data.ssbw_url = res_data.fighter.ssbw_url;

        data.matchups = {};
        res_data.fighter.matchups.forEach(matchup => {
            data.matchups = {[matchup.opponent]: matchup.m_text}
        })

        // in the server we sorted by segment, index, so this should always generate the correct result.
        // this is also really bad runtime complexity, probably, so we should find another way to do this maybe
        let temp_links = {}
        let temp_link_ids = {}
        res_data.fighter.links.forEach(link => {
            if (!(link.segment in temp_links)) {
                temp_links[link.segment] = {}
                temp_link_ids[link.segment] = []
            }

            temp_links[link.segment][link.id] = {title: link.title, url: link.url, type: link.link_type}
            temp_link_ids[link.segment].push(link.id)
        })

        data.segments = {};
        data.segment_ids = [];
        res_data.fighter.segments.forEach(segment => {
            data.segments[segment.id] = { type: segment.s_type, title: segment.title, text: segment.s_text, links: temp_links[segment.id], link_ids: temp_link_ids[segment.id] }
            data.segment_ids.push(segment.id)
        });

        dispatch(success(data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: types.FIGHTER_LOAD_REQUEST, isLoading: true };
  }

  function success(data) {
    return { type: types.FIGHTER_LOAD_SUCCESS, isLoading: false, data: data };
  }

  function failure(error) {
    return { type: types.FIGHTER_LOAD_FAILURE, isLoading: false, error: error };
  }
}

function saveFighter(fighter) {
  return (dispatch, getState) => {
    console.log("saving fighter: " + fighter);
    dispatch(request());

    axios
      .post("http://localhost:3001/fighter/" + fighter, {
        fighter_data: JSON.stringify(getState().fighterReducer),
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token")
      })
      .then(response => {
        console.log(response);
      });

    dispatch(success(data));
  };

  function request() {
    return { type: types.FIGHTER_SAVE_REQUEST, isSaving: true };
  }

  function success() {
    return { type: types.FIGHTER_SAVE_SUCCESS, isSaving: false };
  }

  function failure(error) {
    return { type: types.FIGHTER_SAVE_FAILURE, isSaving: false, error: error };
  }
}

function updateDescription(value) {
  return dispatch => {
    dispatch(update(value));

    function update(value) {
      return { type: types.DESCRIPTION_UPDATE_TEXT, value: value };
    }
  };
}

function updateMatchupText(fighter, text) {
  return dispatch => {
    dispatch(edit(fighter, text));

    function edit(fighter, text) {
      return { type: types.MATCHUP_UPDATE_TEXT, fighter: fighter, text: text };
    }
  };
}

function addSegment() {
  return dispatch => {
    dispatch(add());

    function add() {
      return {
        type: types.SEGMENT_ADD,
        segment_id: shortid.generate(),
        segment: { type: "text", text: "", edit: true }
      };
    }
  };
}

function deleteSegment(segment_id) {
  return dispatch => {
    dispatch(del(segment_id));

    function del(segment_id) {
      return { type: types.SEGMENT_DELETE, segment_id: segment_id };
    }
  };
}

function moveSegment(segment_id, direction) {
  return dispatch => {
    dispatch(move(segment_id, direction));
  };

  function move(segment_id, direction) {
    return {
      type: types.SEGMENT_MOVE,
      segment_id: segment_id,
      direction: direction
    };
  }
}

function updateSegmentParam(id, name, value) {
  return dispatch => {
    dispatch(update(id, name, value));

    function update(id, name, value) {
      return {
        type: types.SEGMENT_UPDATE_PARAM,
        name: name,
        id: id,
        value: value
      };
    }
  };
}

function addSegmentLink(segment_id, link_id) {
  return dispatch => {
    dispatch(add(segment_id, link_id));

    function add(segment_id, link_id) {
      return {
        type: types.SEGMENT_LINK_ADD,
        segment_id: segment_id,
        link_id: link_id,
        new_id: shortid.generate(),
        title: "",
        url: "",
        link_type: "linkify"
      };
    }
  };
}

function delSegmentLink(segment_id, link_id) {
  return dispatch => {
    dispatch(del(segment_id, link_id));

    function del(segment_id, link_id) {
      return {
        type: types.SEGMENT_LINK_DEL,
        segment_id: segment_id,
        link_id: link_id
      };
    }
  };
}

function moveSegmentLink(segment_id, link_id, direction) {
  return dispatch => {
    dispatch(move(segment_id, link_id, direction));
  };

  function move(segment_id, link_id, direction) {
    return {
      type: types.SEGMENT_LINK_MOVE,
      segment_id: segment_id,
      link_id: link_id,
      direction: direction
    };
  }
}

function updateSegmentLinkParam(segment_id, link_id, name, value) {
  return dispatch => {
    dispatch(update(segment_id, link_id, name, value));

    function update(segment_id, link_id, name, value) {
      return {
        type: types.SEGMENT_LINK_UPDATE_PARAM,
        segment_id: segment_id,
        link_id: link_id,
        name: name,
        value: value
      };
    }
  };
}
