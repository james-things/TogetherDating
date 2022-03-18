// Description: SSO login component handling firebase authentication
// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  // Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/gregister',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

// Component main function
function FirebaseSSO() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, []);

  // If not signed in, display the SSO button UI
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center w-full">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  // Otherwise, show some text confirming login by displaying name
  return (
    <div className="flex flex-col items-center w-full">
      <p>
        Welcome to AdventureTogether
        {' '}
        {firebase.auth().currentUser.displayName}
      </p>
      {/* code to enable a sign-out button currently not in use
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
    </div>
  );
}

export default FirebaseSSO;
