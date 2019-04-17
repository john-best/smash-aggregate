import React, { PureComponent } from "react";
import {
  Button,
  Segment,
  Divider,
  Header,
  Dropdown,
  Form,
  Label
} from "semantic-ui-react";
import { fighterActions } from "../../actions/fighterActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import fighters from "../fighterlist/characters";

// because segments can be added and modified, the description should be standalone.
class MatchupEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      currentMatchup: -1
    };
  }
  onChange = (event, target) => {
      this.props.actions.updateMatchupText(this.state.currentMatchup, event.target.value);
  };

  toggleEdit = (event, target) => {
    this.setState({ edit: !this.state.edit });
  };

  handleChangeMatchup = (event, target) => {
    if (target.value === -1) {
        this.setState({ currentMatchup: target.value, edit: false });
    } else {
        this.setState({ currentMatchup: target.value });
    }
  };

  render() {
    var options = fighters.map(fighter => {
      return {
        key: fighter.url,
        value: fighter.url,
        text: fighter.fighter_name,
        image: { avatar: true, src: fighter.icon }
      };
    });
    options.unshift({ key: -1, value: -1, text: "Select Fighter" });
    
    return (
      <Segment>
        <Header>Matchups</Header>
        <Form>
          <Form.Dropdown
            placeholder="Select Fighter"
            fluid
            search
            selection
            options={options}
            onChange={this.handleChangeMatchup}
          />
          {this.state.edit && this.state.currentMatchup !== -1? (
            <Form.Field
              control={TextareaAutosize}
              useCacheForDOMMeasurements
              label={<Label ribbon>Matchup Text</Label>}
              placeholder="You can use Markdown here (most of it, anyways)"
              value={this.props.matchups[this.state.currentMatchup]}
              onChange={this.onChange}
              name="text"
            />
          ) : (
            <ReactMarkdown
              source={this.props.matchups[this.state.currentMatchup]}
            />
          )}

          <Divider />
          {this.state.edit ? (
            <Button onClick={this.toggleEdit}>Preview</Button>
          ) : (
            <Button disabled={this.state.currentMatchup === -1} onClick={this.toggleEdit}>Edit</Button>
          )}
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    matchups: state.fighterReducer.matchups
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
)(MatchupEditor);
