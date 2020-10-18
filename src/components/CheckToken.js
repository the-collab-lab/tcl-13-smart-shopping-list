import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function CheckToken() {
  let history = useHistory();
  const push = history.push;

  const checkToken = () => {
    const token = localStorage.getItem('tcl13-token');
    if (token !== null) {
      alert('Your list coming up!');
      return true;
    } else {
      alert(`You don't have a list!`);
      return false;
    }
  };

  useEffect(() => {
    let checkingToken = checkToken();
    if (checkingToken === true) {
      push('/view-list');
    } else {
      push('/');
    }
  }, []);

  return null;
}
