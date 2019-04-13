import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  updateText = event => {
    this.setState({ text: event.target.value });
    this.props.updateText(event.target.value);
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
            value={this.state.text}
            onChange={this.updateText}
            name="text"
          />
        ) : (
          <ReactMarkdown source={this.props.text} />
        )}
      </>
    );
  }
}

export { TextEditor };
