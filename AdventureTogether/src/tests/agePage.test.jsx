/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'firebase/compat/auth';
import AgePage from '../pages/age';

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

describe('AgePage', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><AgePage /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});
