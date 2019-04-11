import React, { Component } from "react";
import { Dropdown, Segment, Header } from "semantic-ui-react";
import fighters from "../fighterlist/characters";

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
      matchup_text: "",
      opponent: ""
    };
  }

  // when we incorporate the db, this will need to be changed a bit
  handleChangeMatchup = (event, target) => {
    if (target.value !== -1) {
      this.setState({
        opponent: target.value,
        matchup_text:
          "it's bayonetta's son so good luck"
      });
    } else {
        this.setState({
            opponent: target.value,
            matchup_text: ""
        })
    }
  };

  render() {
    return (
      <Segment>
        <Header> Matchups </Header>
        <Dropdown
          placeholder="Select Fighter"
          fluid
          search
          selection
          options={options}
          onChange={this.handleChangeMatchup}
        />
        <br />
        <p>{this.state.matchup_text}</p>
      </Segment>
    );
  }
}

export { Matchup };
