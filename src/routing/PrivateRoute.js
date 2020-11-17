import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import Nav from '../components/Nav';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const listContext = useContext(ListContext);
  // const Component = props.component;

  return (
    <div>
      {/*Show the component only when the user is logged in
            // Otherwise, redirect the user to /signin page*/}
      <Route
        {...rest}
        render={(props) =>
          listContext.token ? <Component {...props} /> : <Redirect to="/" />
        }
      />
      <Nav />
    </div>
  );
};

export default PrivateRoute;
