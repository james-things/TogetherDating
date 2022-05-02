/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of IndexPage
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import { cometConfig, firebaseConfig } from '../environment';
import SorryPage from '../pages/sorry';
import AgePage from '../pages/age';
import IndexPage from '../pages';
import NewDBPage from '../pages/new-db';
import UserProfilePage from '../pages/user-profile';
import EmailRegisterPage from '../pages/email-register';
import GoogleRegisterPage from '../pages/google-register';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestoreInstance = getFirestore(firebaseApp);

afterAll(() => {
  cleanup();
});

describe('Sorry Page', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <SorryPage />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('Age Page', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <AgePage />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});

describe('Index Page', () => {
  it('renders correctly', async () => {
    shallow(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Router>
              <IndexPage />
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
              <EmailRegisterPage />
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
              <GoogleRegisterPage />
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
              <NewDBPage />
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
              <UserProfilePage />
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseAppProvider>,
    );
  });
});
