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
import { cometConfig, firebaseConfig } from '../environment';
import SorryPage from '../pages/sorry';
import AgePage from '../pages/age';

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

describe('Sorry Page', () => {
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
