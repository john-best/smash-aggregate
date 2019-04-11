import React, { Component } from "react";
import {
  Segment,
  Form,
  Button,
  Divider,
  Header,
  Input,
  Label
} from "semantic-ui-react";

let formOptions = [
  { key: "twitter", value: "twitter", text: "Twitter" },
  { key: "youtubbe", value: "youtubbbe", text: "YouTube" },
  { key: "linkify", value: "linkify", text: "Other" }
];
class LinkEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.links,
    };
  }

  onChange = (event, target) => {
    this.setState({ [target.name]: target.value });
  };
  
  render() {
    return (
      <>
      {this.props.edit ? <><Label ribbon>Links</Label>
          <Form.Group>
          <Form.Select options={formOptions} width={2} defaultValue="linkify" fluid/>
            <Form.Input
              name="description"
              placeholder="Description, such as 'Spreadsheet for advantage on hit'"
              width={6}
            />
            <Form.Input
              name="url"
              placeholder="URL, such as 'https://www.example.com'"
              width={6}
            />
            <Button.Group>
              <Button width={1} icon="arrow up" width={1} />
              <Button width={1} icon="arrow down" width={1} />
            </Button.Group>
            <Button.Group>
              <Button width={1} icon="add" width={1} />
              <Button width={1} icon="delete" width={1} />
            </Button.Group>
          </Form.Group></>
          : ("")}
      </>
    );
  }
}

export { LinkEditor };
