import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';
import NewList from './NewList';
import Welcome from './Welcome';

const Router = (props) => (
  <Switch>
    <Route exact path="/">
      {props.token ? <Redirect to="/view-list" /> : <Welcome />}
    </Route>
    <Route exact path="/view-list" component={() => <ViewList />} />
    <Route
      exact
      path="/add-items"
      component={() => <AddItems itemAddedHandler={props.itemAddedHandler} />}
    />
    <Route exact path="/new-list">
      {props.token ? (
        <Redirect to="/view-list" />
      ) : (
        <NewList tokenCreatedHandler={props.tokenCreatedHandler} />
      )}
    </Route>
    <Route component={NoMatch} />
  </Switch>
);

export default Router;
