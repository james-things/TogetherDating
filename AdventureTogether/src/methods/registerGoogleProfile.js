// Description: An async function to create a dating profile from a google SSO login
// refactored to firebase v9 code

import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerGoogleProfile(state) {
  const db = getFirestore();
  const auth = getAuth();
  // Prepare available data from google login
  const bDay = localStoreGet('localBirthdate');
  const user = auth.currentUser;
  const userId = user.uid;
  const uname = user.displayName;
  const image = user.photoURL;
  const {
    description,
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

  // Await firestore creation of profile
  await setDoc(doc(db, `new-users/${userId}`), ({
    name: uname,
    description,
    imageUrl: image,
    likes: [],
    dislikes: [],
    favorites: [],
    matches: [],
    birthdate: bDay,
    outdoorActivities: [],
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
    id: userId,
  }))
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(uname, userId);
  await loginCometChatUser(userId);
}
