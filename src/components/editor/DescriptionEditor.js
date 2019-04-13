import React, { Component } from "react";
import { Button, Segment, Divider, Form, Header, Label } from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

// because segments can be added and modified, the description should be standalone.
class DescriptionEditor extends Component {
  constructor(props) {
    super(props);

    // normally we'd store the edit state into the global store, but in this case, we don't have to because description shouldn't ever rerender unless the description changes
    this.state = {
      edit: this.props.edit,
      text: this.props.text
    };
  }
  onChange = (event, target) => {
    this.props.actions.updateDescription(event.target.value);
  };

  toggleEdit = (event, target) => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    return (
      <Segment>
        <Form>
          <Header>{this.props.title}</Header>

          {this.state.edit ? (
            <Form.Field
              control={TextareaAutosize}
              useCacheForDOMMeasurements
              label={<Label ribbon>Description</Label>}
              placeholder="You can use Markdown here (most of it, anyways)"
              value={this.props.text}
              onChange={this.onChange}
              name="text"
            />
          ) : (
            <ReactMarkdown source={this.props.text} />
          )}

          <Divider />
          {this.state.edit ? (
            <Button onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button onClick={this.toggleEdit}>Edit</Button>
          )}
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
)(DescriptionEditor);
