import React, { Component } from "react";
import Navbar from "./common/Navbar";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

class Home extends Component {
  constructor(props) {
    super(props);
    document.title = "Smash Aggregate - Home";
  }

  // this home page probably should be an advertisement on why this site is great
  // uhh.................
  render() {
    return (
      <div>
        <Navbar active="home" />
        <Container text>
          <Header
            as="h1"
            content="Smash Aggregate"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3.5em"
            }}
          />
          <Header
            as="h2"
            content="A website for beginners to learn more about their character."
            style={{
              fontSize:"1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
        </Container>
      </div>
    );
  }
}

export { Home };
