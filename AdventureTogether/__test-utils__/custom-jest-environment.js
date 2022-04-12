/* eslint-disable class-methods-use-this,no-empty-function */
'use strict';

/**
 * Correct Jest bug that prevents the Firestore tests from running. More info here:
 * https://github.com/firebase/firebase-js-sdk/issues/3096#issuecomment-637584185
 */
import BrowserEnvironment from 'jest-environment-jsdom';

class MyEnvironment extends BrowserEnvironment {
  constructor(config) {
    super(
      {
        ...config,
        globals: {
          ...config.globals,
          Uint32Array,
          Uint8Array,
          ArrayBuffer,
        },
      },
    );
  }

  async setup() {}

  async teardown() {}
}

module.exports = MyEnvironment;
