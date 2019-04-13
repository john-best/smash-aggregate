import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import { fighterActions } from "../../actions/fighterActions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  editText = event => {
    this.props.actions.updateSegmentParam(this.props.index, event.target.name, event.target.value)
  };

  render() {
    return (
      <>
        {this.props.edit ? (
          <Form.Field
            control={TextareaAutosize}
            useCacheForDOMMeasurements
            label={<Label ribbon>Description</Label>}
            placeholder="You can use Markdown here (most of it, anyways)"
            value={this.props.text}
            onChange={this.editText}
            name="text"
          />
        ) : (
          <ReactMarkdown source={this.props.text} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.fighterReducer.fighter_data.segments[ownProps.index].text
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(fighterActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);
