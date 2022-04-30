// Description: An async function to create a dating profile for an email-registered user
// refactored to firebase v9 code

import React from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerEmailProfile(userId, state) {
  const {
    name,
    description,
    image,
    alcoholUse,
    astrologySign,
    bodyType,
    childStatus,
    education,
    ethnicity,
    gender,
    hairColor,
    eyeColor,
    religion,
    smoking,
    height,
    completedRegistration,
  } = state;
  const db = getFirestore();
  const storage = getStorage();
  // Prepare the profile data already collected
  const bDay = localStoreGet('localBirthdate');
  const imageRef = ref(storage, `/profiles/${userId}`);

  await uploadBytes(imageRef, image);

  const imageUrl = await getDownloadURL(imageRef);

  // Await firebase profile storage
  await setDoc(doc(db, `new-users/${userId}`), ({
    name,
    description,
    imageUrl,
    alcoholUse,
    astrologySign,
    bodyType,
    childStatus,
    education,
    ethnicity,
    gender,
    hairColor,
    eyeColor,
    religion,
    smoking,
    height,
    completedRegistration,
    likes: [],
    dislikes: [],
    favorites: [],
    matches: [],
    outdoorActivities: [],
    id: userId,
  }))
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(name, userId);
  await loginCometChatUser(userId);
}
