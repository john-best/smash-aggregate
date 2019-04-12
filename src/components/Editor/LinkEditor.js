import React, { Component } from "react";
import { Form, Button, Label, List } from "semantic-ui-react";
import shortid from "shortid";

let formOptions = [
  { key: "twitter", value: "twitter", text: "Twitter" },
  { key: "youtube", value: "youtube", text: "YouTube" },
  { key: "linkify", value: "linkify", text: "Other" }
];

class LinkEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.links === undefined ? [] : props.links
    };
  }

  onChange = (event, target) => {
    let newLinks = [...this.state.links]
    newLinks[target.link_index] = {...newLinks[target.link_index], [target.name] : target.value}
    this.setState({links: newLinks})

    // we probably need to callback to SegmentEditor to update information there, and then back to FighterEdit so we have the relevant data all in one place
  };

  render() {
    return (
      <>
        {this.props.edit ? (
          <>
            <Label ribbon>Links</Label>
            {this.state.links.map((link, index) => (
              <Form.Group key={shortid.generate()}>
                <Form.Select
                  options={formOptions}
                  width={2}
                  value={link.type}
                  fluid
                  onChange={this.onChange}
                  link_index={index}
                  name="type"
                />
                <Form.Input
                  name="title"
                  placeholder="Example: Spreadsheet for advantage on hit"
                  value={link.title}
                  width={6}
                  onChange={this.onChange}
                  link_index={index}
                />
                <Form.Input
                  name="url"
                  placeholder="Example: https://www.example.com"
                  value={link.url}
                  width={6}
                  onChange={this.onChange}
                  link_index={index}
                />
                <Button.Group>
                  <Button width={1} icon="arrow up"/>
                  <Button width={1} icon="arrow down" />
                </Button.Group>
                <Button.Group>
                  <Button width={1} icon="add" />
                  <Button width={1} icon="delete" />
                </Button.Group>
              </Form.Group>
            ))}
          </>
        ) : (
          <List divided relaxed selection>
            {this.state.links.map((link, index) => (
              <List.Item
              key={shortid.generate()}
                icon={link.type}
                content={<a href={link.url}>{link.title}</a>}
              />
            ))}
          </List>
        )}
      </>
    );
  }
}

export { LinkEditor };
