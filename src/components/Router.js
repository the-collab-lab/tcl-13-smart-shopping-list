import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';
import NewList from './NewList';
import Welcome from './Welcome';
import Nav from './Nav';

const Router = () => {
  const currentList = useContext(ListContext);

  // If there's no user token, Add Items and View List redirects to Welcome

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {currentList.token ? <Redirect to="/view-list" /> : <Welcome />}
        </Route>
        <Route exact path="/view-list">
          {!currentList.token ? <Redirect to="/" /> : <ViewList />}
        </Route>
        <Route exact path="/add-items">
          {!currentList.token ? <Redirect to="/" /> : <AddItems />}
        </Route>
        <Route exact path="/new-list">
          {currentList.token ? <Redirect to="/view-list" /> : <NewList />}
        </Route>
        <Route component={NoMatch} />
      </Switch>
      {/* Nav doesn't render unless there's a token */}
      {currentList.token && <Nav />}
    </div>
  );
};

export default Router;
