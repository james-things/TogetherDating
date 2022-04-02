// Description: An async function to create a dating profile for an email-registered user
import React from 'react';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerEmailProfile(userId, imageState, nameState, descState) {
  // Prepare the profile data already collected
  const bDay = localStoreGet('localBirthdate');
  const imageRef = firebase.storage().ref(`/profiles/${userId}`);

  await imageRef.put(imageState);

  const imageUrl = await imageRef.getDownloadURL();

  // Await firebase profile storage
  await firebase.firestore().collection('users').doc(userId).set({
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
  })
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(nameState, userId);
  await loginCometChatUser(userId);
}
