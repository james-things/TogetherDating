// Description: A wrapper component which keeps important data in the
// local store, ensuring predictable access. Data is cleared by log out component.

import {
  useFirestore, useFirestoreDocData, useUser,
} from 'reactfire';
import { doc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

export default function LocalStoreManager(props) {
  // Subscribe to user and user document
  const { status, data: user } = useUser();
  const userRef = doc(useFirestore(), `users/${user?.uid}`);
  const { refstatus, data } = useFirestoreDocData(userRef);

  // Each time user or data updates, if it is not undefined, update the localStore
  useEffect(() => {
    if (user) {
      const userArray = { user };
      const userId = userArray.user.uid;
      localStorage.setItem('uid', userId);
      // console.log(`Current UID: ${userId}`);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userImage', data.imageUrl);
        localStorage.setItem('userLikes', JSON.stringify(data.likes));
        localStorage.setItem('userDislikes', JSON.stringify(data.dislikes));
        localStorage.setItem('userMatches', JSON.stringify(data.matches));
        localStorage.setItem('userFavorites', JSON.stringify(data.favorites));
        localStorage.setItem('userInterests', JSON.stringify(data.outdoorActivities));
      }
    }
  }, [user, data]);

  // Return wrapped components
  // See app.jsx file for the implementation of this component
  return props.children;
}

LocalStoreManager.propTypes = { children: PropTypes.node };
