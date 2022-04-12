/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Enzyme, { mount, shallow } from 'enzyme';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import ButtonMap from '../components/ButtonMap';
import CollapsibleMultiSelect from '../components/CollapsibleMultiSelect';

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

describe('Navbar', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><Navbar /></Router>, container);
      expect(container.toBeVisible);
    });
    // expect(paragraph).toHaveLength(1);
  });
});

describe('ButtonMap', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><ButtonMap /></Router>, container);
      expect(container.toBeVisible);
    });
    // expect(paragraph).toHaveLength(1);
  });
});

describe('CollapsibleMultiSelect', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><CollapsibleMultiSelect /></Router>, container);
      expect(container.toBeVisible);
    });
    // expect(paragraph).toHaveLength(1);
  });
});
