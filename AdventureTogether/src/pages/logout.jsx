// Description: A page which logs out and then redirects the user home
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { logoutCometChatUser } from '../cometchat';

// Main function/"page content"
export default function LogoutPage() {
  const history = useHistory();

  // Approximately on load, log the user out, then log the user out of CometChat
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await logoutCometChatUser();
        history.push('/');
      });
  }, []);

  return <div />;
}
