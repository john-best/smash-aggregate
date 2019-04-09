import React, { Component } from "react";
import Navbar from "./common/Navbar";

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
      </div>
    );
  }
}

export { Home };
