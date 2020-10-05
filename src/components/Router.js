import React from 'react';
import App from '../App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      {/*<Route path="/store/:storeId" component={App} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
