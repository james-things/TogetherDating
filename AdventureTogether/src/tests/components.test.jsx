/* eslint-disable no-undef, max-len */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act, render } from '@testing-library/react';
import ButtonMap from '../components/ButtonMap';
import CollapsibleMultiSelect from '../components/CollapsibleMultiSelect';

let container = null;

beforeAll(() => {
  // setup a DOM element as a render target
  container = document.createElement('root');
  document.body.appendChild(container);
});

afterAll(async () => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ButtonMap', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><ButtonMap /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});

describe('CollapsibleMultiSelect', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><CollapsibleMultiSelect /></Router>, container);
    });
    expect(container.toBeVisible);
  });
});
