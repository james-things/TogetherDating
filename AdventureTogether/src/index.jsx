// Description: As I understand it, this is our entry point. Significant changes to this page,
// if any, should not be necessary in this project.
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import firebase from 'firebase/compat';
import { CometChat } from '@cometchat-pro/chat';
import { firebaseConfig, cometConfig } from './environment';

import './styles/index.css';
import './styles/tailwind.css';
import App from './App';

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(cometConfig.region)
  .build();

CometChat.init(cometConfig.appId, appSetting).then(
  () => {
    if (CometChat.setSource) {
      CometChat.setSource('ui-kit', 'web', 'reactjs');
    }
    console.log('Initialization completed successfully');

    ReactDOM.render(
      <React.StrictMode>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <FirestoreProvider {...firebaseConfig} firebase={firebase}>
            <App />
          </FirestoreProvider>
        </FirebaseAuthProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
  (error) => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);
