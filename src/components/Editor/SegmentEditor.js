import React, { Component } from "react";
import {
  Button,
  Segment,
  Divider,
  Form,
  Header,
  Label
} from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

let segOptions = [
  { key: "text", value: "text", text: "Text" },
  { key: "links", value: "links", text: "Links" }
];

class SegmentEditor extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (event, target) => {
    this.props.actions.updateSegmentParam(
      this.props.index,
      target.name,
      target.value
    );
  };

  toggleEdit = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, "edit", (this.props.segment.edit === undefined) ? true : !this.props.segment.edit)
  };

  editText = (event) => {
    this.props.actions.updateSegmentParam(this.props.index, event.target.name, event.target.value)
  }

  render() {
    let editor = null;

    if (this.props.segment.type === "links") {
      editor = null;
    } else if (this.props.segment.type === "text") {
      editor = this.props.segment.edit ? (
        <Form.Field
          control={TextareaAutosize}
          useCacheForDOMMeasurements
          label={<Label ribbon>Description</Label>}
          placeholder="You can use Markdown here (most of it, anyways)"
          value={this.props.segment.text}
          onChange={this.editText}
          name="text"
        />
      ) : (
        <ReactMarkdown source={this.props.segment.text} />
      );
    } else {
      editor = null;
    }

    return (
      <Segment>
        <Form>
          {this.props.segment.edit ? (
            <Form.Group>
              <Form.Select
                label="Type"
                selection
                options={segOptions}
                onChange={this.onChange}
                value={this.props.segment.type}
                name="type"
                width={2}
                fluid
              />
              <Form.Input
                label="Title"
                value={this.props.segment.title}
                onChange={this.onChange}
                name="title"
                width={14}
              />
            </Form.Group>
          ) : (
            <Header>{this.props.segment.title}</Header>
          )}

        {editor}
        </Form>
        <Divider />
        {this.props.segment.edit ? (
          <Button onClick={this.toggleEdit}>
            Preview
          </Button>
        ) : (
          <Button onClick={this.toggleEdit}>
            Edit
          </Button>
        )}

        {this.props.segment.edit ? (
          <span>
            <Button.Group floated="right">
              <Button width={1} icon="delete" color="red" onClick={() => {}} />
            </Button.Group>
            <Button.Group floated="right">
              <Button
                width={1}
                icon="arrow up"
                direction="up"
                onClick={() => {}}
              />
              <Button
                width={1}
                icon="arrow down"
                direction="down"
                onClick={() => {}}
              />
            </Button.Group>
          </span>
        ) : null}
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    segment: state.fighterReducer.segments[ownProps.index]
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
)(SegmentEditor);
