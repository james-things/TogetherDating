// Description: An async function to create a dating profile from a google SSO login
// refactored to firebase v9 code

import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerGoogleProfile(descState) {
  const db = getFirestore();
  const auth = getAuth();
  // Prepare available data from google login
  const bDay = localStoreGet('localBirthdate');
  const user = auth.currentUser;
  const userId = user.uid;
  const uname = user.displayName;
  const image = user.photoURL;

  // Await firestore creation of profile
  await setDoc(doc(db, `users/${userId}`), ({
    name: uname,
    description: descState,
    imageUrl: image,
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
    completedRegistration: false,
    id: userId,
  }))
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(uname, userId);
  await loginCometChatUser(userId);
}
