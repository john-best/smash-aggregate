import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Message,
  Icon,
  Container,
  Card,
  Header,
  Image,
  Button,
  Loader
} from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import SegmentEditor from "./editor/SegmentEditor";
import { Matchup } from "./common/Matchup";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import shortid from "shortid";
import { connect } from "react-redux";
import { fighterActions } from "../actions/fighterActions";
import { bindActionCreators } from "redux";
import DescriptionEditor from "./editor/DescriptionEditor";

class FighterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    // we could load from database for name
    document.title = "Smash Aggregate - Loading... (edit)";
  }

  componentDidMount() {
    this.props.actions.loadFighter(this.props.match.params.fighter);
  }
  /*
  handleMove = (segment_index, direction) => {
    if (segment_index === 0 && direction === "up") {
      console.log("user tried to move top most segment upwards!");
      return;
    }

    if (
      segment_index === this.state.data.segments.length - 1 &&
      direction === "down"
    ) {
      console.log("user tried to move bottom most segment downwards!");
      return;
    }

    let new_segments = [...this.state.data.segments];
    new_segments.splice(
      direction === "up" ? segment_index - 1 : segment_index + 1,
      0,
      new_segments.splice(segment_index, 1)[0]
    );
    this.setState({ data: { ...this.state.data, segments: new_segments } });
    console.log(new_segments);
  };

  handleAdd = () => {
    let new_segments = [...this.state.data.segments];
    new_segments.push({ type: "text", title: "", text: "", edit: true });
    this.setState({ data: { ...this.state.data, segments: new_segments } });
  };

  handleRemove = segment_index => {
    console.log("removing " + segment_index);
    let new_segments = [...this.state.data.segments];
    console.log(new_segments.splice(segment_index, 1));
    this.setState({ data: { ...this.state.data, segments: new_segments } });
  };

  handleEdit = (segment_index, isEdit) => {
    let new_segments = [...this.state.data.segments];
    new_segments[segment_index].edit = isEdit;

    console.log(new_segments);
    this.setState({ data: { ...this.state.data, segments: new_segments } });
  };

  handleUpdateText = (segment_index, new_text) => {
    let new_segments = [...this.state.data.segments];
    new_segments[segment_index].text = new_text;
    this.setState({ data: { ...this.state.data, segments: new_segments } });
  };
  */

  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  // actual todo: convert the data in these into actual data so we can smoothly transition once we start pulling from

  // might need to split some stuff up to make it easier since Fighter is just going to be the bulk of this webapp
  // splitting means more states and more callbacks ugh
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
                <Image avatar src={this.props.fighter_data.icon} />{" "}
                {this.props.fighter_data.fighter_name}{" "}
              </Header>
              <Message
                header="Work In Progress!"
                content="This page currently serves as an example of what a fighter page could look like. Nothing is set in stone yet."
                icon={<Icon name="exclamation" />}
              />

              <DescriptionEditor
                title="Description"
                text={this.props.fighter_data.description}
                edit={false}
              />

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

              <Matchup edit={true} />

              {this.props.fighter_data.segments.map((segment, index) => {
                if (segment.type === "links") {
                  return (
                    <SegmentEditor
                      type="links"
                      title={segment.title}
                      links={segment.links}
                      key={shortid.generate()}
                      index={index}
                      edit={segment.edit === true}
                    />
                  );
                } else {
                  return (<SegmentEditor
                    type="text"
                    title={segment.title}
                    text={segment.text} 
                    textAreaOnly={false}
                    key={shortid.generate()}
                    index={index}
                    edit={segment.edit === true}
                  />);
                }
              })}
              <Button.Group>
                <Button>Save</Button>
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
    state.fighterReducer.fighter_loading === false &&
    state.fighterReducer.error === false
  ) {
    document.title =
      "Smash Aggregate - " +
      state.fighterReducer.fighter_data.fighter_name +
      " (edit)";
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
)(FighterEdit);
