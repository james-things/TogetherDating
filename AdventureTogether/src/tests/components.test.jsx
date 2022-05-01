/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { act } from 'react-dom/test-utils';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import ButtonMap from '../components/ButtonMap';
import CollapsibleMultiSelect from '../components/CollapsibleMultiSelect';
import OutdoorInterestPicker from '../components/OutdoorInterestPicker';
import * as interestOptions from '../outdoorInterests.options';
import UserProfileEditable from '../components/UserProfileEditable';
import UserProfile from '../pages/user-profile';
import LocalStoreManager from '../components/LocalStoreManager';

let container = null;
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestoreInstance = getFirestore(firebaseApp);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('root');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Navbar', () => {
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

describe('OutdoorInterestPicker', () => {
  it('Should render successfully', () => {
    act(() => {
      const interests = ['test'];
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                {/* eslint-disable-next-line max-len */}
                <OutdoorInterestPicker dataset={interestOptions.optionClimbing} interests={interests} />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('UserProfileEditable', () => {
  it('Should render successfully', () => {
    act(() => {
      const interests = ['test'];
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                {/* eslint-disable-next-line max-len */}
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

describe('UserProfile', () => {
  it('Should render successfully', () => {
    act(() => {
      const interests = ['test'];
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                {/* eslint-disable-next-line max-len */}
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

describe('ButtonMap', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><ButtonMap /></Router>, container);
      expect(container.toBeVisible);
    });
  });
});

describe('CollapsibleMultiSelect', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><CollapsibleMultiSelect /></Router>, container);
      expect(container.toBeVisible);
    });
  });
});

describe('LocalStoreManager', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                {/* eslint-disable-next-line max-len */}
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
