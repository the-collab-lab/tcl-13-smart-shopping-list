import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import AddItems from './AddItems';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/add-items" component={AddItems} />
    </Switch>
  </BrowserRouter>
);

export default Router;
