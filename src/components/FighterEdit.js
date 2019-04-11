import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Message,
  Icon,
  Container,
  Card,
  Dropdown,
  Segment,
  Header,
  Image,
  Button
} from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import { SegmentEditor } from "./Editor/SegmentEditor"
import { FaDiscord } from "react-icons/fa";


let data = {
  icon: "/fighters_icon/zero_suit_samus.png",
  fighter_name: "Zero Suit Samus",
  fighter_url: "zero_suit_samus",
  discord_url: "#",
  kh_url: "#",
  ssbw_url: "#",

  description: "she's not smash 4 zss but she's still good (but buff her anyways)",
  matchups: {"mario": "", "donkey_kong": "",},

  segments: [
    {type: "youtube",
     data: [
      {title: "Flip Kick Mechanics - Orio", url: "#"},
      {title: "Overclocked Ultimate (W. Finals) - Marss vs. Light", url: "#"},
      {title: "zss elite smash showcase", url: "#"}
    ]},
    {type: "twitter", data: []},
    {type: "links", data: []},
    {type: "text_rich", data: []}
  ]
}

function translate(fighter) {
  return {
    key: fighter.url,
    value: fighter.url,
    text: fighter.fighter_name,
    image: { avatar: true, src: fighter.icon }
  };
}

class FighterEdit extends Component {
  constructor(props) {
    super(props);

    // we could load from database for name
    document.title = "Smash Aggregate - " + data.fighter_name + " (edit)";
    this.state = {
      opponent: "",
      matchup_text: "",
    };
  }

  handleChangeMatchup = (event, target) => {
    if (target.value !== -1) {
      this.setState({
        opponent: target.value,
        matchup_text:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi."
      });
    }
  };
  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  // actual todo: convert the data in these into actual data so we can smoothly transition once we start pulling from 
  
  // might need to split some stuff up to make it easier since Fighter is just going to be the bulk of this webapp
  render() {
    let options = fighters.map(translate);
    options.unshift({ key: "-1", value: "", text: "Select Fighter" });

    return (
      <div>
        <Navbar active="fighters" />
        <Container>
          <Header><Image avatar src={data.icon} /> {data.fighter_name} </Header>
          <Message
            header="Work In Progress!"
            content="This page currently serves as an example of what a fighter page could look like. Nothing is set in stone yet."
            icon={<Icon name="exclamation" />}
          />

          <Segment>
            <Header> Description </Header>
            {data.description}
          </Segment>

          <Card.Group centered={true} itemsPerRow={3}>
            <Card href={data.discord_url}>
              <Card.Content>
                <Card.Header>
                  <FaDiscord /> Discord
                </Card.Header>
                <Card.Description>
                  Click here to join the Smashcord!
                </Card.Description>
              </Card.Content>
            </Card>
            <Card
              header="Frame Data (KH)"
              href={data.kh_url}
              description={"Kurogane Hammer's frame data and attributes for " + data.fighter_name + "." }
            />

            <Card
              header="SSBWiki"
              href={data.ssbw_url}
              description={"Changes, Patches, etc. for " + data.fighter_name + "." }
            />
          </Card.Group>

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
          <SegmentEditor type="text" />
          <SegmentEditor type="links" />        
          <Button.Group><Button secondary>Save</Button><Button.Or /><Button>Cancel</Button></Button.Group>
          <Button color="green" icon="add" floated="right" />
        </Container>
      </div>
    );
  }
}

export { FighterEdit };
