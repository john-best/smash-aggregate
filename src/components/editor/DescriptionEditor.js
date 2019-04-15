import React, { PureComponent } from "react";
import { Button, Segment, Divider, Form, Header, Label } from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

// because segments can be added and modified, the description should be standalone.
class DescriptionEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
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
          <Header>Description</Header>
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
  return {
    text: state.fighterReducer.description
  }
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
