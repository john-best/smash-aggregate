import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Button,
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

import Matchup from "./common/Matchup";
import { fighterActions } from "../actions/fighterActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import fighters from "./fighterlist/characters";

class Fighter extends Component {
  constructor(props) {
    super(props);
    document.title = "Smash Aggregate - Loading...";
  }

  componentDidMount() {
    this.props.actions.loadFighter(this.props.match.params.fighter);
  }

  render() {
    let segments = [];
    if (this.props.loaded === true) {
      segments = this.props.segment_ids.map(id => {
        if (this.props.segments[id].type === "text") {
          return (
            <Segment key={id}>
              <Header> {this.props.segments[id].title} </Header>
              <ReactMarkdown source={this.props.segments[id].text} />
            </Segment>
          );
        } else if (this.props.segments[id].type === "links") {
          return (
            <Segment key={id}>
              <Header> {this.props.segments[id].title} </Header>
              <List divided relaxed selection>
                {this.props.segments[id].link_ids.map(link_id => {
                  var link = this.props.segments[id].links[link_id];
                  return (
                    <List.Item
                      key={link_id}
                      icon={link.type}
                      content={<a href={link.url}>{link.title}</a>}
                    />
                  );
                })}
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
                <Image
                  avatar
                  src={
                    fighters.find(
                      o => o.url === this.props.match.params.fighter
                    ).icon
                  }
                />{" "}
                {this.props.fighter_name}{" "}
                <Button
                  as={Link}
                  to={this.props.match.url + "/edit"}
                  floated="right"
                >
                  Edit
                </Button>
              </Header>

              <Segment>
                <Header> Description </Header>
                <ReactMarkdown source={this.props.description} />
              </Segment>

              <Card.Group centered={true} itemsPerRow={3}>
                <Card href={this.props.discord_url}>
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
                  header="Frame Data"
                  href={this.props.fd_url}
                  description={
                    "Frame data and attributes for " +
                    this.props.fighter_name +
                    "."
                  }
                />

                <Card
                  header="SSBWiki"
                  href={this.props.ssbw_url}
                  description={
                    "Changes, Patches, etc. for " +
                    this.props.fighter_name +
                    "."
                  }
                />
              </Card.Group>

              <Matchup />

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
  if (state.fighterReducer.fighter_loaded === true) {
    document.title = "Smash Aggregate - " + state.fighterReducer.fighter_name;
    return {
      discord_url: state.fighterReducer.discord_url,
      fighter_name: state.fighterReducer.fighter_name,
      fighter_url: state.fighterReducer.fighter_url,
      fd_url: state.fighterReducer.fd_url,
      ssbw_url: state.fighterReducer.ssbw_url,
      segments: state.fighterReducer.segments,
      segment_ids: state.fighterReducer.segment_ids,
      description: state.fighterReducer.description,
      loaded: true
    };
  } else {
    return { loaded: false };
  }
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
