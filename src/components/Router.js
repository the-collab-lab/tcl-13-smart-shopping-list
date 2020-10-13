import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';
import NewList from './NewList';
import Welcome from './Welcome';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/view-list" component={ViewList} />
    <Route exact path="/add-items" component={AddItems} />
    <Route exact path="/new-list" component={NewList} />
    <Route component={NoMatch} />
  </Switch>
);

export default Router;
