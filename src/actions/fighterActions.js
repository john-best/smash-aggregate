import * as types from "./actionTypes";
import { data } from "../components/tempdata";
import shortid from "shortid";

export const fighterActions = {
    loadFighter,
    updateSegmentParam,
    updateDescription,
    updateSegmentLinkParam,
    deleteSegment,
    addSegment,
    addSegmentLink
}

function loadFighter(fighter) {
    return (dispatch) => {

        console.log("loading fighter: " + fighter)
        dispatch(request());

        // do loading here
        dispatch(success(data))
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

function updateSegmentParam(id, name, value) {
    return dispatch => {
  
      dispatch(update(id, name, value))

      function update(id, name, value) {
        return { type: types.SEGMENT_UPDATE_PARAM, name: name,  id: id, value: value }
      }
    }
}

function updateSegmentLinkParam(segment_id, link_id, name, value) {
    return dispatch => {
  
      dispatch(update(segment_id, link_id, name, value))

      function update(segment_id, link_id, name, value) {
        return { type: types.SEGMENT_LINK_UPDATE_PARAM, segment_id: segment_id, link_id: link_id, name: name, value: value }
      }
    }
}

function addSegmentLink(segment_id) {
    return dispatch => {
  
      dispatch(add(segment_id))

      function add(segment_id) {
        return { type: types.SEGMENT_LINK_ADD, segment_id: segment_id, link_id: shortid.generate(), title: "", url: "", link_type: "linkify" }
      }
    }
}

function updateDescription(value) {
    return dispatch => {
        dispatch(update(value))

        function update(value) {
            return { type: types.DESCRIPTION_UPDATE_TEXT, value: value }
        }
    }
}

function deleteSegment(segment_id) {
    return dispatch => {
        dispatch(del(segment_id))

        function del(segment_id) {
            return { type: types.SEGMENT_DELETE, segment_id: segment_id }
        }
    }
}

function addSegment() {
    return dispatch => {
        dispatch(add())

        function add() {
            return { type: types.SEGMENT_ADD, segment_id: shortid.generate(), segment: {type: "text", text: "", edit: true} }
        }
    }
}


