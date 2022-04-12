/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of IndexPage
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'firebase/compat/auth';
import firebase from 'firebase/compat';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import IndexPage from '../pages';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import AgePage from '../pages/age';
import SorryPage from '../pages/sorry';
import ConfigureProfilePage from '../pages/configure-profile';
import DiscoverPage from '../pages/discover';
import EmailRegisterPage from '../pages/email-register';
import { uiConfigRegister } from '../firebaseui.config';
import App from '../App';
import {FirestoreProvider} from '@react-firebase/firestore';
import {FirebaseAuthProvider} from '@react-firebase/auth';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('root');
  document.body.appendChild(container);
  Enzyme.configure({ adapter: new Adapter() });
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
      render(<Router><IndexPage /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});

describe('Navbar', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><Navbar /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});

describe('AgePage', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><AgePage /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});

describe('SorryPage', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><SorryPage /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});

