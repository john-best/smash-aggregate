import React, { Component } from "react";
import { TextEditor } from "./TextEditor";
import { LinkEditor } from "./LinkEditor";
import {
  Button,
  Segment,
  Divider,
  Dropdown,
  Label,
  Form,
  Header
} from "semantic-ui-react";

let segOptions = [
  { key: "text", value: "text", text: "Text" },
  { key: "links", value: "links", text: "Links" }
];

class SegmentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      type: this.props.type,
      title: ""
    };
  }
  onChange = (event, target) => {
    this.setState({ [target.name]: target.value });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleChangeType = (event, target) => {
    this.setState({
      type: target.value
    });
  };

  render() {
    return (
      <Segment>
        <Form>
          {this.state.edit ? (
            <Form.Group>
              <Form.Select
                label="Type"
                selection
                options={segOptions}
                onChange={this.handleChangeType}
                value={this.state.type}
                width={2}
                fluid
              />
              <Form.Input
                label="Title"
                value={this.state.title}
                onChange={this.onChange}
                name="title"
                width={14}
              />
            </Form.Group>
          ) : (
            <Header>{this.state.title}</Header>
          )}

          {this.state.type === "links" ? (
            <LinkEditor
              links={[]}
              deleteThis={() => console.log("delete requested")}
              edit={this.state.edit}
            />
          ) : (
            <TextEditor
              text=""
              deleteThis={() => console.log("delete requested")}
              edit={this.state.edit}
            />
          )}

          <Divider />
          {this.state.edit ? (
            <Button onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button onClick={this.toggleEdit}>Edit</Button>
          )}
          {this.state.edit ? (
            <span>
              <Button.Group floated="right">
                <Button width={1} icon="delete" color="red" width={1} />
              </Button.Group>
              <Button.Group floated="right">
                <Button width={1} icon="arrow up" width={1} />
                <Button width={1} icon="arrow down" width={1} />
              </Button.Group>
            </span>
          ) : (
            ""
          )}
        </Form>
      </Segment>
    );
  }
}

export { SegmentEditor };
