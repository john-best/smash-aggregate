import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Message,
  Icon,
  Container,
  Card,
  Segment,
  Header,
  List,
  Image
} from "semantic-ui-react";
import { FaDiscord } from "react-icons/fa";

import { Matchup } from "./common/Matchup";

let data = {
  icon: "/fighters_icon/zero_suit_samus.png",
  fighter_name: "Zero Suit Samus",
  fighter_url: "zero_suit_samus",
  discord_url: "#",
  kh_url: "#",
  ssbw_url: "#",

  description:
    "she's not smash 4 zss but she's still good (but buff her anyways)",
  matchups: { mario: "", donkey_kong: "" },

  segments: [
    {
      id: 0,
      type: "list",
      title: "Videos of Interest",
      data: [
        {
          title: "marss vs light at some local",
          type: "youtube",
          url: "#",
          id: 0
        },
        { title: "twitter combo video", type: "twitter", url: "#", id: 1 },
        {
          title: "document on why wuhu island should be legal",
          type: "linkify",
          url: "#",
          id: 2
        }
      ]
    },
    {
      id: 1,
      type: "text",
      title: "some information that might interest you",
      data: "this website sucks! why can't someone who actually knows how to make websites work on this???"
    }
  ]
};

function generate_segements(segments) {
  return segments.map(generate_segment);
}

function generate_segment(segment) {
  if (segment.type == "list") {
    return (
      <Segment key={segment.id}>
        <Header>{segment.title}</Header>
        <List divided relaxed selection>
          {segment.data.map(generate_list)}
        </List>
      </Segment>
    );
  }

  return (
      <Segment key={segment.id}>
      <Header> {segment.title} </Header>
      <List divided relaxed selection>
        <p>{segment.data}</p>
      </List>
    </Segment>
  );
}

function generate_list(item, index) {
  return (
    <List.Item key={item.id} icon={item.type} content={<a href={item.url}>{item.title}</a>} />
  );
}

class Fighter extends Component {
  constructor(props) {
    super(props);

    // we could load from database for name
    document.title = "Smash Aggregate - " + data.fighter_name;
  }

  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  // actual todo: convert the data in these into actual data so we can smoothly transition once we start pulling from

  // might need to split some stuff up to make it easier since Fighter is just going to be the bulk of this webapp
  render() {
    return (
      <div>
        <Navbar active="fighters" />
        <Container>
          <Header>
            <Image avatar src={data.icon} /> {data.fighter_name}{" "}
          </Header>
          <Message
            header="Work In Progress!"
            content="This page currently serves as an example of what a fighter page could look like. Nothing is set in stone yet."
            icon={<Icon name="exclamation" />}
          />

          <Segment>
            <Header> Description </Header>
            <p>{data.description}</p>
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
              description={
                "Kurogane Hammer's frame data and attributes for " +
                data.fighter_name +
                "."
              }
            />

            <Card
              header="SSBWiki"
              href={data.ssbw_url}
              description={
                "Changes, Patches, etc. for " + data.fighter_name + "."
              }
            />
          </Card.Group>

          <Matchup />
          {generate_segements(data.segments)}
        </Container>
      </div>
    );
  }
}

export { Fighter };
