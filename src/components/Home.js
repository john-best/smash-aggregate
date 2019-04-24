import React, { Component } from "react";
import Navbar from "./common/Navbar";
import { Container, Header, Icon, Dropdown } from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import { history } from "../configureStore";

class Home extends Component {
  constructor(props) {
    super(props);
    document.title = "Smash Aggregate - Home";
  }

  loadPage = (event, target) => {
    if (target.value !== -1) {
      history.push("/fighters/" + target.value);
    }
  };

  // this home page probably should be an advertisement on why this site is great
  // uhh.................
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
      <div>
        <Navbar active="home" />
        <Container text>
          <Header
            as="h1"
            content="Smash Aggregate"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3.5em"
            }}
          />
          <Header
            as="h2"
            content="A place for beginners to learn more about their character."
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />

          <Dropdown
            placeholder="Select Fighter"
            fluid
            search
            selection
            options={options}
            style={{
              marginTop: "1.5em"
            }}
            onChange={this.loadPage}
          />
        </Container>
      </div>
    );
  }
}

export { Home };
