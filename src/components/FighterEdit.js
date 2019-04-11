import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Message,
  Icon,
  Container,
  Card,
  Header,
  Image,
  Button
} from "semantic-ui-react";
import fighters from "./fighterlist/characters";
import { SegmentEditor } from "./Editor/SegmentEditor";
import { Matchup } from "./common/Matchup";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom"
import { data } from "./tempdata"

class FighterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data
    }

    // we could load from database for name
    document.title = "Smash Aggregate - " + data.fighter_name + " (edit)";
  }

  handleMove = (segment_index, direction) => {

    if (segment_index === 0 && direction === "up") {
      console.log("user tried to move top most segment upwards!")
      return
    }

    if (segment_index === this.state.data.segments.length - 1 && direction === "down") {
      console.log("user tried to move bottom most segment downwards!")
      return
    }

    let segment = this.state.data.segments[segment_index];
    let new_segments = [...this.state.data.segments]

    // delete 
    new_segments.splice(segment_index, 1);

    // insert
    new_segments.splice(direction === "up" ? segment_index - 1 : segment_index, 0, segment);
    let new_data = { ...this.state.data, segments: new_segments }
    this.setState({data: new_data})
  }

  handleAdd = () => {
    let new_segments = [...this.state.data.segments]
    new_segments.push({ type: "text", title: "", text: "" })
    let new_data = { ...this.state.data, segments: new_segments }
    this.setState({data: new_data})
  }

  handleRemove = (segment_index) => {
    console.log("removing " + segment_index)
    let new_segments = [...this.state.data.segments]
    console.log(new_segments.splice(segment_index, 1));
    let new_data = { ...this.state.data, segments: new_segments }
    this.setState({data: new_data})
  }

  // TODO: load from database, but we don't actually have a databse yet lmao
  // for now, just generate how the webpage SHOULD look like!
  // actual todo: convert the data in these into actual data so we can smoothly transition once we start pulling from

  // might need to split some stuff up to make it easier since Fighter is just going to be the bulk of this webapp
  render() {
    console.log(this.state)
    let options = fighters.map(fighter => {
      return {
        key: fighter.url,
        value: fighter.url,
        text: fighter.fighter_name,
        image: { avatar: true, src: fighter.icon }
      }
    });
    options.unshift({ key: "-1", value: "", text: "Select Fighter" });

    let segments = []
    this.state.data.segments.forEach((segment, index) => {
      if (segment.type === "links") {
        segments.push(
          <SegmentEditor
            type="links"
            title={segment.title}
            links={segment.links}
            key={index}
            index={index}
            move={this.handleMove}
            remove={this.handleRemove}
            />  
        );

      } else {
        segments.push(
          <SegmentEditor
            type="text"
            title={segment.title}
            text={segment.text}
            textAreaOnly={false}
            key={index}
            index={index}
            move={this.handleMove}
            remove={this.handleRemove}
          />
        )
      }
    })

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

          <SegmentEditor
            type="text"
            title="Description"
            text={data.description}
            textAreaOnly={true}
          />

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

          <Matchup edit={true}/>
          
          {segments}

          <Button.Group>
            <Button>Save</Button>
            <Button.Or />
            <Button as={Link} to={"/fighters/" + this.props.match.params.fighter} color="red">Cancel</Button>
          </Button.Group>

          <Button color="green" icon="add" floated="right" onClick={this.handleAdd}/>
        </Container>
      </div>
    );
  }
}

export { FighterEdit };
