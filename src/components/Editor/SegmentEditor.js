import React, { Component } from "react";
import { TextEditor } from "./TextEditor";
import { LinkEditor } from "./LinkEditor";
import {
  Button,
  Segment,
  Divider,
  Form,
  Header
} from "semantic-ui-react";

let segOptions = [
  { key: "text", value: "text", text: "Text" },
  { key: "links", value: "links", text: "Links" }
];

class SegmentEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      type: this.props.type,
      title: this.props.title,
      text: this.props.text,
      links: this.props.links
    };
  }
  onChange = (event, target) => {
    this.setState({ [target.name]: target.value });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleMove =(event, target) => {
      this.props.move(this.props.index, target.direction)
  }
  
  handleRemove = (event, target) => {
      this.props.remove(this.props.index)
  }

  render() {
    return (
      <Segment>
        <Form>
          {this.state.edit ? (
            <Form.Group>
              <Form.Select
                disabled={this.props.textAreaOnly}
                label="Type"
                selection
                options={segOptions}
                onChange={this.onChange}
                value={this.state.type}
                name="type"
                width={2}
                fluid
              />
              <Form.Input
                disabled={this.props.textAreaOnly}
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
              links={this.props.links}
              deleteThis={() => console.log("delete requested")}
              edit={this.state.edit}
            />
          ) : (
            <TextEditor
              text={this.props.text}
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
          {this.state.edit && !this.props.textAreaOnly ? (
            <span>
              <Button.Group floated="right">
                <Button width={1} icon="delete" color="red" onClick={this.handleRemove}/>
              </Button.Group>
              <Button.Group floated="right">
                <Button width={1} icon="arrow up"  direction="up" onClick={this.handleMove}/>
                <Button width={1} icon="arrow down" direction="down" onClick={this.handleMove}/>
              </Button.Group>
            </span>
          ) : (
            null
          )}
        </Form>
      </Segment>
    );
  }
}

export { SegmentEditor };
