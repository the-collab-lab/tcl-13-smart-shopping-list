import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';

const Router = () => (
  <Switch>
    <Route exact path="/" />
    <Route exact path="/view-list" component={ViewList} />
    <Route exact path="/add-items" component={AddItems} />
    <Route component={NoMatch} />
  </Switch>
);

export default Router;
