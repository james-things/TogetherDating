/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import ButtonMap from '../components/ButtonMap';
import CollapsibleMultiSelect from '../components/CollapsibleMultiSelect';

let container = null;
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
      firebase.initializeApp(firebaseConfig);
      render(<Router><Navbar /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});

describe('ButtonMap', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><ButtonMap /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});

describe('CollapsibleMultiSelect', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><CollapsibleMultiSelect /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});
