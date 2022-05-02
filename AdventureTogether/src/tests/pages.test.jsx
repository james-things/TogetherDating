/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of IndexPage
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
import firebase from 'firebase/compat/app';
import { cleanup as hooksCleanup } from '@testing-library/react-hooks/lib/pure';
import { cleanup } from '@testing-library/react';
import { cometConfig, firebaseConfig } from '../environment';
import SorryPage from '../pages/sorry';
import AgePage from '../pages/age';
import IndexPage from '../pages';
import NewDBPage from '../pages/new-db';
import UserProfilePage from '../pages/user-profile';
import SignupPage from '../pages/signup';
import LogoutPage from '../pages/logout';
import LoginPage from '../pages/login';
import MyFriendsPage from '../pages/my-friends';
import GoogleRegister from '../pages/google-register';
import EmailRegisterPage from '../pages/email-register';

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

describe('Sorry Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <SorryPage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('Age Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <AgePage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('Index Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <IndexPage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('EmailRegister Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <EmailRegisterPage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('GoogleRegister Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <GoogleRegister Page />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('NewDB Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <NewDBPage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('UserProfile Page', () => {
  it('Should render successfully', () => {
    act(() => {
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestoreInstance}>
              <Router>
                <UserProfilePage />
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});
