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
  Image,
  Loader
} from "semantic-ui-react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Matchup } from "./common/Matchup";
import { fighterActions } from "../actions/fighterActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Fighter extends Component {
  constructor(props) {
    super(props);

    // we could load from database for name
    document.title = "Smash Aggregate - Loading...";
  }

  componentDidMount() {
    this.props.actions.loadFighter(this.props.match.params.fighter);
  }

  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  render() {
    let segments = [];
    if (this.props.loaded === true) {
      this.props.fighter_data.segments.forEach((segment, index) => {
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
          console.log(segment);
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
    }

    return (
      <div>
        <Navbar active="fighters" />
        <Container>
          {this.props.loaded === true ? (
            <>
              <Header>
                <Image avatar src={this.props.fighter_data.icon} />{" "}
                {this.props.fighter_data.fighter_name}{" "}
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
                {this.props.fighter_data.description}
              </Segment>

              <Card.Group centered={true} itemsPerRow={3}>
                <Card href={this.props.fighter_data.discord_url}>
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
                  href={this.props.fighter_data.kh_url}
                  description={
                    "Kurogane Hammer's frame data and attributes for " +
                    this.props.fighter_data.fighter_name +
                    "."
                  }
                />

                <Card
                  header="SSBWiki"
                  href={this.props.fighter_data.ssbw_url}
                  description={
                    "Changes, Patches, etc. for " +
                    this.props.fighter_data.fighter_name +
                    "."
                  }
                />
              </Card.Group>

              <Matchup edit={false} />

              {segments}
            </>
          ) : (
            <Loader content="Loading..." active />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (
    state.fighterReducer.fighter_loading === false &&
    state.fighterReducer.error === false
  ) {
    document.title =
      "Smash Aggregate - " + state.fighterReducer.fighter_data.fighter_name;
  }

  return {
    fighter_data: state.fighterReducer.fighter_data,
    loaded:
      state.fighterReducer.fighter_loading === false &&
      state.fighterReducer.error === false
        ? true
        : false
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
)(Fighter);
