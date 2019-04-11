import React, { Component } from "react";
import Navbar from "./common/Navbar";
import { Card } from "semantic-ui-react";

// honestly the list will be static once all dlc comes out, so we're only updating the app like once every 3 months for new fighters
// so we can probably store the fighter list here instead of pulling from db to save up on lookup time or something
import fighters from "./fighterlist/characters";

function translate(fighter) {
  return {
    header: fighter.id + " - " + fighter.fighter_name,
    meta: fighter.title,
    href: "/fighters/" + fighter.url,
    image: fighter.image
  };
}

class FighterList extends Component {
  constructor(props) {
    super(props);
    document.title = "Smash Aggregate - Fighters";
  }
  render() {
    const items = fighters.map(translate);
    return (
      <div>
        <Navbar active="fighters" />
        <Card.Group items={items} centered={true} />
      </div>
    );
  }
}

export { FighterList };
