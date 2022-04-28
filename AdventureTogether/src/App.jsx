// A component which sets the composition and routing structure of the site
// and allows providers to provide services to child components

// todo: determine value offered by PrivateRoute functionality and re-implement if desired
//  (this functionality redirects the user if they manually navigate to a disallowed page based on
//  logged in state. it should not be difficult to restore, I just haven't gotten to it since I did
//  my react 17 update!)

import React from 'react';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import {
  Route, BrowserRouter as Router, Routes,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import IndexPage from './pages';
import AgePage from './pages/age';
import DiscoverPage from './pages/discover';
import InboxPage from './pages/inbox';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import EmailRegisterPage from './pages/email-register';
import SorryPage from './pages/sorry';
import SignupPage from './pages/signup';
import GoogleRegisterPage from './pages/google-register';
import ConfigureProfilePage from './pages/configure-profile';
import OutdoorInterestsPage from './pages/outdoor-interests';
import LocalStoreManager from './components/LocalStoreManager';
import DataTest from './components/DataTest';
import UserProfileOtherPage from './pages/user-profile-other';
import MyFriendsPage from './pages/my-friends';
import UserProfilePage from './pages/user-profile';

// React v17 routing - this was necessary to implement other core upgrades
function App() {
  const app = useFirebaseApp(); // assumes a parent component contains a `FirebaseAppProvider`
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(app);
  return (
    <>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreInstance}>
          <LocalStoreManager>
            <Router>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/email-register" element={<EmailRegisterPage />} />
                <Route path="/google-register" element={<GoogleRegisterPage />} />
                <Route path="/configure-profile" element={<ConfigureProfilePage />} />
                <Route path="/outdoor-interests" element={<OutdoorInterestsPage />} />
                <Route path="/age" element={<AgePage />} />
                <Route path="/sorry" element={<SorryPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/data-test" element={<DataTest />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/user-profile-other" element={<UserProfileOtherPage />} />
                <Route path="/my-friends" element={<MyFriendsPage />} />
                <Route path="*" element={<IndexPage />} />
              </Routes>
            </Router>
          </LocalStoreManager>
        </FirestoreProvider>
      </AuthProvider>
    </>
  );
}

/* TODO: Restore PrivateRoute functionality using react-router-dom v6 syntax if desired.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => (localStorage.getItem('user') ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}
*/

export default App;
