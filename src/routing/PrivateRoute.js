import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ListContext } from '../context/ListContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const listContext = useContext(ListContext);

  return (
    <div>
      {/*Show the component only when the user is logged in 
      otherwise, redirect the user to /signin page*/}
      <Route
        {...rest}
        render={(props) =>
          listContext.token ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </div>
  );
};

export default PrivateRoute;
