import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class App extends Component {
    render() {
        return <div id="app">{this.props.routes}</div>;
    }
}

export default App;