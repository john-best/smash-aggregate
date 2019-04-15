import React, { Component } from "react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SegmentEditor from "./SegmentEditor";

class SegmentManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.segment_ids.map((id, index) => (
          <SegmentEditor key={id} id={id} index={index} />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    segment_ids: state.fighterReducer.segment_ids
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(fighterActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SegmentManager);
