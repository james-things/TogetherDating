/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of IndexPage
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AuthProvider, FirebaseAppProvider } from 'reactfire';
import IndexPage from '../pages';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import AgePage from '../pages/age';
import SorryPage from '../pages/sorry';

let container = null;
const firebaseApp = initializeApp(firebaseConfig);

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

describe('IndexPage', () => {
  it('Should render successfully', () => {
    act(() => {
      const auth = getAuth(firebaseApp);
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <Router>
              <IndexPage />
            </Router>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('AgePage', () => {
  it('Should render successfully', () => {
    act(() => {
      const auth = getAuth(firebaseApp);
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <Router>
              <AgePage />
            </Router>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('SorryPage', () => {
  it('Should render successfully', () => {
    act(() => {
      const auth = getAuth(firebaseApp);
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <Router>
              <SorryPage />
            </Router>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});
