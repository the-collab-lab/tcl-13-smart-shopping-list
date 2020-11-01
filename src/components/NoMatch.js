import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <p>404 Not Found</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NoMatch;
