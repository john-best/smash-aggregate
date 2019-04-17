import React, { Component } from "react";
import { Form, Segment, Header } from "semantic-ui-react";
import fighters from "../fighterlist/characters";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";

function translate(fighter) {
  return {
    key: fighter.url,
    value: fighter.url,
    text: fighter.fighter_name,
    image: { avatar: true, src: fighter.icon }
  };
}
var options = fighters.map(translate);
options.unshift({ key: -1, value: -1, text: "Select Fighter" });

class Matchup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMatchup: -1
    };
  }


  handleChangeMatchup = (event, target) => {
    this.setState({ currentMatchup: target.value });
  };

  render() {

    let text = this.props.matchups[this.state.currentMatchup];
    if (this.state.currentMatchup !== -1 && (text === undefined || text === "")) {
      text = "No info available."
    }
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
          <ReactMarkdown
            source={text}
          />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matchup);
