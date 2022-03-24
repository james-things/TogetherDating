/* eslint-disable no-undef */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'firebase/compat/auth';
import IndexPage from '../pages';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
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
      render(<Router><IndexPage /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});
