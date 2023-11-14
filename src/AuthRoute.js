import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import firebase from './firebase-config';

const AuthRoute = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe the listener when the component unmounts
    };
  }, []);

  if (currentUser === null) {
    // Firebase is still checking the authentication state, you can show a loading spinner here
    return <center>Loading...</center>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
