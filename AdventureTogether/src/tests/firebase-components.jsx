/* eslint-disable no-undef, max-len */
// Description: A unit test for the successful rendering of the Navbar component
import { act, cleanup as hooksCleanup } from '@testing-library/react-hooks';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { cleanup, render } from '@testing-library/react';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../environment';
import LocalStoreManager from '../components/LocalStoreManager';
import UserProfile from '../components/UserProfile';
import Navbar from '../components/Navbar';
import UserProfileEditable from '../components/UserProfileEditable';
import ButtonMap from '../components/ButtonMap';
import FriendsGrid from '../components/FriendsGrid';
import FriendsList from '../components/FriendsList';
import DataTest from '../components/DataTest';

const flushPromises = () => new Promise(setImmediate);
let container = null;
let firebaseApp = null;
let auth = null;
let firestoreInstance = null;

beforeAll(() => {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firestoreInstance = getFirestore(firebaseApp);
  // setup a DOM element as a render target
  container = document.createElement('root');
  document.body.appendChild(container);
});

afterAll(async () => {
  await firebase.app().delete();

  unmountComponentAtNode(container);
  container.remove();
  container = null;

  firebaseApp = null;
  auth = null;
  firestoreInstance = null;

  await hooksCleanup();
  cleanup();
  await flushPromises();
});

describe('UserProfileEditable Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <UserProfileEditable userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('Navbar Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <Navbar />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('UserProfile Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <UserProfile userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('LocalStoreManager Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
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
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('OutdoorInterestPicker Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <UserProfileEditable userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('FriendsList Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <FriendsList userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('FriendsGrid Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <FriendsGrid userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('DataTest Component', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <DataTest userId="testrandomfakeuid" />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});
