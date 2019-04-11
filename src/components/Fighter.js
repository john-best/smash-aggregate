import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Button,
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
import { Link } from "react-router-dom";

import { Matchup } from "./common/Matchup";
import { data } from "./tempdata"

class Fighter extends Component {
  constructor(props) {
    super(props);

    // we could load from database for name
    document.title = "Smash Aggregate - " + data.fighter_name;
  }

  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  render() {
    let segments = [];

    data.segments.forEach((segment, index) => {
      if (segment.type === "links")
        segments.push(
          <Segment key={index}>
            <Header>{segment.title}</Header>
            <List divided relaxed selection>
              {segment.links.map((link, index) => (
                <List.Item
                  key={index}
                  icon={link.type}
                  content={<a href={link.url}>{link.title}</a>}
                />
              ))}
            </List>
          </Segment>
        );
      else {
        console.log(segment)
        segments.push(
          <Segment key={index}>
            <Header> {segment.title} </Header>
            <List divided relaxed selection>
              <p>{segment.text}</p>
            </List>
          </Segment>
        );
      }
    });

    return (
      <div>
        <Navbar active="fighters" />
        <Container>
          <Header>
            <Image avatar src={data.icon} /> {data.fighter_name}{" "}
            <Button
              as={Link}
              to={this.props.match.url + "/edit"}
              floated="right"
            >
              Edit
            </Button>
          </Header>
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

          <Matchup edit={false} />

          {segments}
        </Container>
      </div>
    );
  }
}

export { Fighter };
