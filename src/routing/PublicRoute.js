import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ListContext } from '../context/ListContext';

const PublicRoute = (props) => {
  const listContext = useContext(ListContext);
  const Component = props.component;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      render={() =>
        listContext.token ? <Redirect to="/view-list" /> : <Component />
      }
    />
  );
};

export default PublicRoute;
