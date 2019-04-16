import React, { Component } from "react";
import {
  Button,
  Segment,
  Divider,
  Form,
  Header,
  Label,
  List
} from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

import LinkEditor from "./LinkEditor";

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
      this.props.id,
      target.name,
      target.value
    );
  };

  toggleEdit = (event, target) => {
    this.props.actions.updateSegmentParam(
      this.props.id,
      "edit",
      this.props.segment.edit === undefined ? true : !this.props.segment.edit
    );
  };

  editText = event => {
    this.props.actions.updateSegmentParam(
      this.props.id,
      event.target.name,
      event.target.value
    );
  };

  handleDelete = () => {
      this.props.actions.deleteSegment(this.props.id);
  }

  render() {
    let editor = null;

    if (this.props.segment.type === "links") {
      let links = null;

      let link_ids;
      if (this.props.segment.link_ids === undefined) {
        this.props.actions.addSegmentLink(this.props.id);
        link_ids = [];

        // i shouldn't be doing this, but it works for now...
        // so i need to come back to this and figure out how to do this without forcing a rerender
        this.forceUpdate()

    
      } else {
        link_ids = [...this.props.segment.link_ids];
      }

      if (this.props.segment.edit) {
        links = (
          <>
            {link_ids.map((id, index) => (
              <LinkEditor
                link_id={id}
                segment_id={this.props.id}
                index={index}
                key={id}
              />
            ))}
          </>
        );
      } else {
        links = (
          <List divided relaxed selection>
            {link_ids.map((id, index) => {
              return (
                <LinkEditor
                  link_id={id}
                  segment_id={this.props.id}
                  index={index}
                  key={id}
                />
              );
            })}
          </List>
        );
      }

      editor = <>{links}</>;
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
          <Button onClick={this.toggleEdit}>Preview</Button>
        ) : (
          <Button onClick={this.toggleEdit}>Edit</Button>
        )}

        {this.props.segment.edit ? (
          <span>
            <Button.Group floated="right">
              <Button width={1} icon="delete" color="red" onClick={this.handleDelete} />
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
    segment: state.fighterReducer.segments[ownProps.id]
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
