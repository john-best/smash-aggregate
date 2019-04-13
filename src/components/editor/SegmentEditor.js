import React, { Component } from "react";
import TextEditor from "./TextEditor";
import { LinkEditor } from "./LinkEditor";
import { Button, Segment, Divider, Form, Header } from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let segOptions = [
  { key: "text", value: "text", text: "Text" },
  { key: "links", value: "links", text: "Links" }
];

class SegmentEditor extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, target.name, target.value)
  };

  toggleEdit = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, "edit", (this.props.segment.edit === undefined) ? true : !this.props.segment.edit)
  };

  render() {
    return (
      <Segment>
        <Form>
          {this.props.edit ? (
            <Form.Group>
              <Form.Select
                disabled={this.props.textAreaOnly}
                label="Type"
                selection
                options={segOptions}
                onChange={this.onChange}
                value={this.props.type}
                name="type"
                width={2}
                fluid
              />
              <Form.Input
                disabled={this.props.textAreaOnly}
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

          {this.props.segment.type === "links" ? (
            <LinkEditor
              links={this.props.segment.links}
              edit={this.props.segment.edit}
            />
          ) : (
            <TextEditor
              edit={this.props.segment.edit}
              index={this.props.index}
            />
          )}

          <Divider />
          {this.props.segment.edit ? (
            <Button onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button onClick={this.toggleEdit}>Edit</Button>
          )}
          {this.props.segment.edit ? (
            <span>
              <Button.Group floated="right">
                <Button
                  width={1}
                  icon="delete"
                  color="red"
                  onClick={() => {}}  
                />
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
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.fighterReducer.fighter_data.segments[ownProps.index])
  return {
    segment: state.fighterReducer.fighter_data.segments[ownProps.index]
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

