import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.active };
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted={true}>
      <Menu.Item>Smash Aggregate</Menu.Item>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          as={Link} to='/'
        >
          Home
        </Menu.Item>

        <Menu.Item
          name="fighters"
          active={activeItem === "fighters"}
          as={Link} to='/fighters'
        >
          Fighters
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary>
              <FaDiscord /> Login
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
