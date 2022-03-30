// Configure FirebaseUI.
import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { loginCometChatUser } from './cometchat';

const uiConfigRegister = {
  // Popup sign-in flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  // Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/google-register',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const uiConfigLogin = {
  // When the sign in is successful, don't redirect automatically
  callbacks: {
    signInSuccess() {
      // Return false to not redirect
      return false;
    },
  },
  // Popup sign-in flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  // Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/discover',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export {
  uiConfigRegister,
  uiConfigLogin,
};
