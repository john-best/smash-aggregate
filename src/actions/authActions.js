import * as types from "./actionTypes";
import { push } from "connected-react-router";
import axios from "axios";

// not going to set up ssl just yet, so we'll use this domain that points to the server but without https
const OAUTH2_URL = "http://mingler.org:3001/verify_oauth2";
const REDIRECT_URI = "https://sa.johnbest.me/oauth2";

export const authActions = {
  verifyOAuth2
};

function verifyOAuth2(code) {
  return dispatch => {
    dispatch(request());

    axios
      .post(OAUTH2_URL, {
        code: code,
        uri: REDIRECT_URI
      })
      .then(response => {
        if (response.data.success === false) {
          console.log(response.data.error2);
          throw Error(response.data.error);
        }

        console.log("oauth success!");
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        dispatch(
          success(
            response.data.username,
            response.data.discriminator,
            response.data.user_id
          )
        );
        dispatch(push("/"));
      })
      .catch(error => {
        console.log(error);
        dispatch(failure());
        dispatch(push("/"));
      });
  };

  function request() {
    return { type: types.OAUTH2_REQUEST };
  }

  function success(username, discriminator, user_id) {
    let name = username + "#" + discriminator;
    return { type: types.OAUTH2_SUCCESS, username: name, user_id: user_id };
  }

  function failure(error) {
    return { type: types.OAUTH2_FAILURE, error: error };
  }
}
