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
    <Route
      exact
      path="/view-list"
      component={() => (
        <ViewList
          token={props.token}
          itemsRef={props.itemsRef}
          userList={props.userList}
        />
      )}
    />
    <Route
      exact
      path="/add-items"
      component={() => (
        <AddItems
          token={props.token}
          itemsRef={props.itemsRef}
          userList={props.userList}
          itemAddedHandler={props.itemAddedHandler}
        />
      )}
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
