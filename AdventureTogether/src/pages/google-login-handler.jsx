// Description: A page which allows a user to log in to an existing account
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import FirebaseUI from '../components/FirebaseUI';
import { loginCometChatUser } from '../cometchat';
import { withLayout } from '../wrappers/layout';
import { uiConfigLogin } from '../firebaseui.config';
import localStoreGet from '../methods/localStoreGet';

// Main func
const GoogleLoginHandlerPage = () => {
  const history = useHistory();

  // Log in function, called on submit (email/pw only)
  // If the user opts to log in with SSO, this is bypassed
  useEffect(async () => {
    try {
      const doc = await localStoreGet('user');
      await loginCometChatUser(doc.id);
      history.push('/discover');
    } catch (e) { console.log(`Unknown Error Occurred: ${e.message}`); }
  }, []);
  // Page content
  // You will notice <FirebaseLogin /> in the code. This singular line links
  // in the Firebase UI SSO component. Currently, our system lacks logic to differentiate
  // a SSO registration from a SSO login, so this will need to be implemented.
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full md:w-7/12">
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <svg
            className="w-10"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <radialGradient
                id="svg-fill-radial__tinder"
                cx="0.5"
                cy="1"
                fr="0"
                fx="0.5"
                fy="1"
                r="1"
                spreadMethod="pad"
              >
                <stop offset="0%" stopColor="#ff7854" />
                <stop offset="100%" stopColor="#fd267d" />
              </radialGradient>
            </defs>
            <path
              d="M8.21 10.08c-.02 0-.04 0-.06-.02-.67-.9-.84-2.44-.89-3.03 0-.11-.13-.18-.23-.12C4.93 8.08 3 10.86 3 13.54 3 18.14 6.2 22 11.7 22c5.15 0 8.7-3.98 8.7-8.46 0-5.87-4.2-9.77-7.93-11.53a.13.13 0 0 0-.19.14c.48 3.16-.18 6.6-4.07 7.93z"
              fill="url(#svg-fill-radial__tinder)"
              fillRule="nonzero"
            />
          </svg>
        </Link>
        <h3 className="text-2xl font-extrabold italic uppercase my-4">
          Please wait a moment while we get you signed in...
        </h3>
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        <div className="py-4">
          <h3 className="text-2xl font-extrabold italic uppercase my-4">
            Get the app!
          </h3>
          <div className="flex justify-between items-center">
            <img width="130" src="/appStore.webp" alt="AppStore Download" />
            <img
              width="170"
              src="/playStore.webp"
              alt="PlayStore Download"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(GoogleLoginHandlerPage, { bgImage: true });
