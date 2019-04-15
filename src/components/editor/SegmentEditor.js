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


const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React);

class SegmentEditor extends Component {
  static whyDidYouRender = true
  constructor(props) {
    super(props);
  }

  onChange = (event, target) => {
    this.props.actions.updateSegmentParam(this.props.index, target.name, target.value)
  };

  toggleEdit = (event, target) => {
    console.log(target)
    this.props.actions.updateSegmentParam(target.segment_index, "edit", (this.props.segments[target.segment_index].edit === undefined) ? true : !this.props.segments[target.segment_index].edit)
  };

  render() {
    return (
      <>
        {this.props.segments.map((segment, index) => (<Segment key={segment.id}>
        <Form>
          {segment.edit ? (
            <Form.Group>
              <Form.Select
                label="Type"
                selection
                options={segOptions}
                onChange={this.onChange}
                value={segment.type}
                name="type"
                width={2}
                fluid
              />
              <Form.Input
                label="Title"
                value={segment.title}
                onChange={this.onChange}
                name="title"
                width={14}
              />
            </Form.Group>
          ) : (
            <Header>{segment.title}</Header>
          )}

          {segment.type === "links" ? (
            <LinkEditor
              links={segment.links}
              edit={segment.edit}
            />
          ) : (
            <TextEditor
              edit={segment.edit}
              index={index}
            />
          )}

          <Divider />
          {segment.edit ? (
            <Button segment_index={index} onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button segment_index={index} onClick={this.toggleEdit}>Edit</Button>
          )}
          {segment.edit ? (
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
      </Segment>))}

      </>
      
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    segments: state.fighterReducer.segments
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

