import React from "react";
import { Route, Switch } from "react-router";

import { Home } from "./components/Home";
import Fighter from "./components/Fighter";
import { FighterList } from "./components/FighterList";
import { FighterEdit } from "./components/FighterEdit";


export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path ="/fighters/:fighter/edit" component={FighterEdit} />
        <Route exact path ="/fighters/:fighter" component={Fighter} />
        <Route exact path ="/fighters" component={FighterList} />
    </Switch>
);