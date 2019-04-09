import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Message,
  Icon,
  Container,
  Card,
  Dropdown,
  Segment,
  Embed,
  Header,
  List,
  Image
} from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import { FaDiscord } from "react-icons/fa";

function translate(fighter) {
  return {
    key: fighter.url,
    value: fighter.url,
    text: fighter.fighter_name,
    image: { avatar: true, src: fighter.icon }
  };
}

class Fighter extends Component {
  constructor(props) {
    super(props);

    // we could load from database for name
    document.title = "Smash Aggregate - Zero Suit Samus";
    this.state = {
      opponent: "",
      matchup_text: ""
    };
  }

  handleChangeMatchup = (event, data) => {
    if (data.value !== -1) {
      this.setState({
        opponent: data.value,
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
          <Header><Image avatar src="/fighters_icon/zero_suit_samus.png" />Zero Suit Samus </Header>
          <Message
            header="Work In Progress!"
            content="This page currently serves as an example of what a fighter page could look like. Nothing is set in stone yet."
            icon={<Icon name="exclamation" />}
          />

          <Segment>
            <Header> Description </Header>
            <p>she's not smash 4 zss but she's still good (but buff her anyways)</p>
          </Segment>

          <Card.Group centered={true} itemsPerRow={3}>
            <Card href="#">
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
              href="#"
              description="Kurogane Hammer's frame data and attributes for Zero Suit Samus."
            />

            <Card
              header="SSBWiki"
              href="#"
              description="Changes, Patches, etc. for Zero Suit Samus."
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

          <Segment>
            <Header> Youtube Videos </Header>
            <List divided relaxed selection>
              <List.Item
                icon="youtube"
                content={<a href="#">Orio's Video on Flip Kick</a>}
              />
              <List.Item
                icon="youtube"
                content={
                  <a href="#">
                    Overclocked Ultimate (W.Finals) - Marss vs Light
                  </a>
                }
              />
              <List.Item
                icon="youtube"
                content={<a href="#">Watch this epic ZSS showcase video</a>}
              />
              <List.Item icon="youtube" content={<a href="#">etc</a>} />
            </List>
          </Segment>

          <Segment>
            <Header> Twitter Posts </Header>
            <List divided relaxed selection>
              <List.Item
                icon="twitter"
                content={<a href="#">Flip Kick Momentum Cancelling</a>}
              />
              <List.Item
                icon="twitter"
                content={<a href="#">Instant Tether Trump</a>}
              />
              <List.Item icon="twitter" content={<a href="#">etc</a>} />
            </List>
          </Segment>

          <Segment>
            <Header> Useful Links </Header>
            <List divided relaxed selection>
              <List.Item
                icon="linkify"
                content={
                  <a href="#">Frame Advantage/Disadvantage on Attacks</a>
                }
              />
              <List.Item
                icon="linkify"
                content={<a href="#">ZSS Labs Ultimate (%labs)</a>}
              />
              <List.Item
                icon="linkify"
                content={<a href="#">ZSS Combo Sheet</a>}
              />
              <List.Item icon="linkify" content={<a href="#">etc</a>} />
            </List>
          </Segment>
        </Container>
      </div>
    );
  }
}

export { Fighter };
