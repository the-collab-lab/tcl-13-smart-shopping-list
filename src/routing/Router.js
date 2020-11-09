import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ViewList from '../components/ViewList';
import AddItems from '../components/AddItems';
import NoMatch from '../components/NoMatch';
import NewList from '../components/NewList';
import Welcome from '../components/Welcome';

const Router = () => {
  // If there's no user token, Add Items and View List redirects to Welcome

  return (
    <div>
      <Switch>
        {/*if users is not logged in, show the welcome component or new list*/}
        <PublicRoute component={Welcome} path="/" exact />
        <PublicRoute component={NewList} path="/new-list" exact />
        {/*if users is logged in, show view list or add items*/}
        <PrivateRoute component={ViewList} path="/view-list" exact />
        <PrivateRoute component={AddItems} path="/add-items" exact />
        {/*if no routes match*/}
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default Router;
