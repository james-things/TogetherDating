// Description: Highest-level project component
// Reactfire/Firebase v9 is implemented here through FirebaseAppProvider
import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/compat/app';
import { CometChat } from '@cometchat-pro/chat';
import { ThemeProvider } from '@primer/react';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig, cometConfig } from './environment';

import './styles/index.css';
import './styles/tailwind.css';
import App from './App';

const container = document.getElementById('root');

// this line allows us to use firebase v8 code when it is more convenient
firebase.initializeApp(firebaseConfig);

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
    render(
      <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </FirebaseAppProvider>
      </React.StrictMode>,
      container,
    );
  },
  (error) => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);
