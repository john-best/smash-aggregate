import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.active, logged_in: localStorage.getItem("access_token") };
  }

  loginDiscord = () => {
    window.location.replace(
      "https://discordapp.com/api/oauth2/authorize?client_id=565042163189022741&redirect_uri=https%3A%2F%2Fsa.johnbest.me%2Foauth2&response_type=code&scope=identify"
    );
  };

  logoutDiscord = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.setState({logged_in: false})
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted style={{ borderRadius: 0 }}>
        <Menu.Item>Smash Aggregate</Menu.Item>
        <Menu.Item name="home" active={activeItem === "home"} as={Link} to="/">
          Home
        </Menu.Item>

        <Menu.Item
          name="fighters"
          active={activeItem === "fighters"}
          as={Link}
          to="/fighters"
        >
          Fighters
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            {this.state.logged_in ? (
              <Button primary onClick={this.logoutDiscord}>
                <FaDiscord /> Logout
              </Button>
            ) : (
              <Button primary onClick={this.loginDiscord}>
                <FaDiscord /> Login
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
