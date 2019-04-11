import React, { Component } from "react";
import {
  Form,
  Label
} from "semantic-ui-react";

import TextareaAutosize from "react-textarea-autosize"

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }


  render() {
    return (
      <>
      {this.props.edit ? <Form.Field
            control={TextareaAutosize}
            useCacheForDOMMeasurements
            label={<Label ribbon>Description</Label>}
            placeholder="You see this nair?"
            value={this.state.text}
            onChange={ e => this.setState({ text: e.target.value })}
            name="text"
          /> : this.state.text}
      </>
    );
  }
}

export { TextEditor };
