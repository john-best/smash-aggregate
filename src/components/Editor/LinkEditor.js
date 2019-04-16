import React, { Component } from "react";
import { Form, Button, Label, List } from "semantic-ui-react";
import shortid from "shortid";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let formOptions = [
  { key: "twitter", value: "twitter", text: "Twitter" },
  { key: "youtube", value: "youtube", text: "YouTube" },
  { key: "linkify", value: "linkify", text: "Other" }
];

class LinkEditor extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onChange = (event, target) => {
    this.props.actions.updateSegmentLinkParam(this.props.segment_index, this.props.index, target.name, target.value)
  };

  render() {
    let link = null;

    if (this.props.edit) {
      link = (
        <Form.Group>
          <Form.Select
            options={formOptions}
            width={2}
            value={this.props.link.type}
            fluid
            onChange={this.onChange}
            name="type"
          />
          <Form.Input
            name="title"
            placeholder="Example: Spreadsheet for advantage on hit"
            value={this.props.link.title}
            width={6}
            onChange={this.onChange}
          />
          <Form.Input
            name="url"
            placeholder="Example: https://www.example.com"
            value={this.props.link.url}
            width={6}
            onChange={this.onChange}
          />

          <Button.Group>
            <Button width={1} icon="arrow up" />
            <Button width={1} icon="arrow down" />
          </Button.Group>
          <Button.Group>
            <Button width={1} icon="add" />
            <Button width={1} icon="delete" />
          </Button.Group>
        </Form.Group>
      );
    } else {
      link =
        this.props.link.title !== "" || this.props.link.url !== "" ? (
          <List.Item
            key={this.props.link.id}
            icon={this.props.link.type}
            content={<a href={this.props.link.url}>{this.props.link.title}</a>}
          />
        ) : null;
    }

    return <>{link}</>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let link =
    ownProps.id === -1
      ? {
          id: shortid.generate(),
          title: "",
          url: "",
          type: "linkify"
        }
      : state.fighterReducer.segments[ownProps.segment_index].links[
          ownProps.index
        ];

  return {
    link: link,
    edit: state.fighterReducer.segments[ownProps.segment_index].edit
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
)(LinkEditor);
