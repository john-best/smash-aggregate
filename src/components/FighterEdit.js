import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Container,
  Card,
  Header,
  Image,
  Button,
  Loader
} from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fighterActions } from "../actions/fighterActions";
import { authActions } from "../actions/authActions";
import { bindActionCreators } from "redux";
import DescriptionEditor from "./editor/DescriptionEditor";
import SegmentManager from "./editor/SegmentManager";
import MatchupEditor from "./editor/MatchupEditor";

class FighterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    document.title = "Smash Aggregate - Loading... (edit)";
  }

  componentDidMount() {
    // we probably want to check if the user is allowed access to edit this page
    // if not, we should redirect

    this.props.actions.loadFighter(this.props.match.params.fighter);
  }

  handleAdd = () => {
    this.props.actions.addSegment()
  }

  saveFighter = () => {
    this.props.actions.saveFighter(this.props.match.params.fighter)
  }

  render() {
    let options = fighters.map(fighter => {
      return {
        key: fighter.url,
        value: fighter.url,
        text: fighter.fighter_name,
        image: { avatar: true, src: fighter.icon }
      };
    });
    options.unshift({ key: "-1", value: "", text: "Select Fighter" });

    return (
      <div>
        <Navbar active="fighters" />
        <Container>
          {this.props.loaded === true ? (
            <>
              <Header>
                <Image avatar src={fighters.find(o => o.url === this.props.match.params.fighter).icon} />
                {this.props.fighter_name}
              </Header>

              <DescriptionEditor />

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

              <MatchupEditor />

              <SegmentManager />
              
              <Button.Group>
                <Button onClick={this.saveFighter}>Save</Button>
                <Button.Or />
                <Button
                  as={Link}
                  to={"/fighters/" + this.props.match.params.fighter}
                  color="red"
                >
                  Cancel
                </Button>
              </Button.Group>

              <Button
                color="green"
                icon="add"
                floated="right"
                onClick={this.handleAdd}
              />
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
    state.fighterReducer.fighter_loaded === true
  ) {
    document.title =
      "Smash Aggregate - " +
      state.fighterReducer.fighter_name +
      " (edit)";
      return {
        discord_url: state.fighterReducer.discord_url,
        fighter_name: state.fighterReducer.fighter_name,
        fighter_url: state.fighterReducer.fighter_url,
        fd_url: state.fighterReducer.fd_url,
        ssbw_url: state.fighterReducer.ssbw_url,
        loaded: true
      };
  }
  
  return {loaded: false}
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(fighterActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
};

const connectedFighterEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(FighterEdit);

export { connectedFighterEdit as FighterEdit }
