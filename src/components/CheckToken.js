import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function CheckToken(props) {
  let history = useHistory();
  const push = history.push;

  const checkToken = (token) => {
    if (token != null) {
      alert('Your list coming up!');
      return true;
    } else {
      alert(`You don't have a list!`);
      return false;
    }
  };

  useEffect(() => {
    let checkingToken = checkToken(props.token);
    if (checkingToken === true) {
      push('/view-list');
    } else {
      push('/');
    }
  }, []);

  return null;
}
