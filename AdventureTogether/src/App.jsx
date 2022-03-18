// Description: our core app component. Routing is handled here, so any new pages need
// to be added to the routes or they will not work.
import React, { useEffect } from 'react';
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import {
  Route, BrowserRouter, Switch, Redirect,
} from 'react-router-dom';
import IndexPage from './pages';
import AgePage from './pages/age';
import DiscoverPage from './pages/discover';
import InboxPage from './pages/inbox';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import RegisterPage from './pages/register';
import SorryPage from './pages/sorry';
import SignupPage from './pages/signup';
import GRegisterPage from './pages/gregister';

// Main function, essentially "if user exists then retrieve user" on every page load (I think)
function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // store the user on local storage
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then((doc) => {
            localStorage.setItem('user', JSON.stringify({
              ...doc.data(),
              id: doc.id,
            }));
          });
      } else {
        // removes the user from local storage on logOut
        localStorage.removeItem('user');
      }
    });
  }, []);

  // This is where the routing magic happens. If you need to add a new page just use the existing
  // routes as templates to add in new ones. I don't think order matters, but I would group
  // private and non-private routes and add in any new pages before the last one with the *
  // to keep things neat and play it safe.
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <PrivateRoute path="/discover">
            <DiscoverPage />
          </PrivateRoute>
          <PrivateRoute path="/inbox">
            <InboxPage />
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/logout">
            <LogoutPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/gregister">
            <GRegisterPage />
          </Route>
          <Route path="/age">
            <AgePage />
          </Route>
          <Route path="/sorry">
            <SorryPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="*">
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => (localStorage.getItem('user') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default App;
