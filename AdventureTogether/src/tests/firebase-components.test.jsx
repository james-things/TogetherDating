/* eslint-disable no-undef, max-len */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { firebaseConfig } from '../environment';
import LocalStoreManager from '../components/LocalStoreManager';
import UserProfile from '../components/UserProfile';
import Navbar from '../components/Navbar';
import UserProfileEditable from '../components/UserProfileEditable';
import ButtonMap from '../components/ButtonMap';
import FriendsGrid from '../components/FriendsGrid';
import FriendsList from '../components/FriendsList';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestoreInstance = getFirestore(firebaseApp);

afterAll(() => {
  cleanup();
});

describe('UserProfile Component', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <UserProfile userId="testrandomfakeuid" />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('UserProfileEditable Component', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <UserProfileEditable userId="testrandomfakeuid" />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('Navbar Component', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <Navbar />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('LocalStoreManager Component', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <LocalStoreManager>
                <ButtonMap />
              </LocalStoreManager>
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('UserProfileEditable Component', async () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <FriendsList userId="testrandomfakeuid" />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('UserProfileEditable Component', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <FriendsGrid userId="testrandomfakeuid" />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});
