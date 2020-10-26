import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewList from './ViewList';
import AddItems from './AddItems';
import NoMatch from './NoMatch';
import NewList from './NewList';
import Welcome from './Welcome';

const Router = () => {
  const currentList = useContext(ListContext);

  return (
    <Switch>
      <Route exact path="/">
        {currentList.token ? <Redirect to="/view-list" /> : <Welcome />}
      </Route>
      <Route exact path="/view-list" component={() => <ViewList />} />
      <Route exact path="/add-items" component={() => <AddItems />} />
      <Route exact path="/new-list">
        {currentList.token ? <Redirect to="/view-list" /> : <NewList />}
      </Route>
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Router;
