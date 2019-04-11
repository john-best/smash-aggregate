import React, { Component } from "react";
import { Footer } from "./components/common/Footer";
class App extends Component {
    render() {
        return <><div id="app">{this.props.routes}</div><Footer /></>;
    }
}

export default App;