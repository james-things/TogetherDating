// Description: A page which logs out and then redirects the user home
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { logoutCometChatUser } from '../cometchat';

export default function LogoutPage() {
  const history = useHistory();

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
