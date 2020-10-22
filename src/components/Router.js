import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';
import NewList from './NewList';
import Welcome from './Welcome';

const Router = (props) => (
  <Switch>
    <Route exact path="/" component={Welcome} />
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
    <Route
      exact
      path="/new-list"
      component={() => (
        <NewList tokenCreatedHandler={props.tokenCreatedHandler} />
      )}
    />
    <Route component={NoMatch} />
  </Switch>
);

export default Router;
