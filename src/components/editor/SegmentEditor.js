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

    this.state = {
      edit: this.props.edit,
      type: this.props.type,
      title: this.props.title,
      text: this.props.text,
      links: this.props.links
    };
  }
  onChange = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, target.name, target.value)
  };

  toggleEdit = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, "edit", (this.props.edit === undefined) ? true : !this.props.edit)
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
                value={this.props.title}
                onChange={this.onChange}
                name="title"
                width={14}
              />
            </Form.Group>
          ) : (
            <Header>{this.props.title}</Header>
          )}

          {this.state.type === "links" ? (
            <LinkEditor
              links={this.props.links}
              deleteThis={""}
              edit={this.props.edit}
            />
          ) : (
            <TextEditor
              text={this.props.text}
              deleteThis={""}
              edit={this.props.edit}
              index={this.props.index}
            />
          )}

          <Divider />
          {this.state.edit ? (
            <Button onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button onClick={this.toggleEdit}>Edit</Button>
          )}
          {this.state.edit && !this.props.textAreaOnly ? (
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

const mapStateToProps = state => {
  return state;
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

