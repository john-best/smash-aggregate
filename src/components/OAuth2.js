import React, { Component } from "react";
import qs from "query-string";
import { authActions } from "../actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class OAuth2 extends Component {
  componentDidMount() {
    this.props.actions.verifyOAuth2(
      qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
    );
  }

  render() {
    return <h1> Checking authorization... </h1>;
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OAuth2);
