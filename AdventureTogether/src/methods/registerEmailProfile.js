// Description: An async function to create a dating profile for an email-registered user
// refactored to firebase v9 code

import React from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerEmailProfile(userId, imageState, nameState, descState) {
  const db = getFirestore();
  const storage = getStorage();
  // Prepare the profile data already collected
  const bDay = localStoreGet('localBirthdate');
  const imageRef = ref(storage, `/profiles/${userId}`);

  await uploadBytes(imageRef, imageState);

  const imageUrl = await getDownloadURL(imageRef);

  // Await firebase profile storage
  await setDoc(doc(db, `users/${userId}`), ({
    name: nameState,
    description: descState,
    imageUrl,
    likes: [],
    dislikes: [],
    favorites: [],
    matches: [],
    birthdate: bDay,
    height: '',
    gender: '',
    ethnicity: '',
    outdoorActivities: [],
    eyeColor: '',
    hairColor: '',
    bodyType: '',
    education: '',
    religion: '',
    ambition: '',
    alcoholUse: '',
    smoking: '',
    childStatus: '',
    astrologySign: '',
    id: userId,
  }))
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(nameState, userId);
  await loginCometChatUser(userId);
}
