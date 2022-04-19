// Description: SSO login component handling firebase authentication
// Refactored to use reactfire

import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from 'reactfire';

// Component main function - now accepts configuration "props"
// this configuration determines if it is a login or registration component
function FirebaseUI({ props }) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const auth = useAuth();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, []);

  // If not signed in, display the SSO button UI
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center w-full">
        <StyledFirebaseAuth uiConfig={props} firebaseAuth={auth} />
      </div>
    );
  }
  // Otherwise, show some text confirming login by displaying name
  return (
    <div className="flex flex-col items-center w-full">
      <p>
        Welcome to AdventureTogether
        {' '}
        {auth.currentUser.displayName}
      </p>
      {/* code to enable a sign-out button currently not in use
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
    </div>
  );
}

export default FirebaseUI;
