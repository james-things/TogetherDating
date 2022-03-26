// Description: An async function to create a dating profile from a google SSO login
import firebase from 'firebase/compat';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerGoogleProfile(descState) {
  // Prepare available data from google login
  const bDay = localStoreGet('localBirthdate');
  const user = firebase.auth().currentUser;
  const userid = user.uid;
  const uname = firebase.auth().currentUser.displayName;

  // Await firestore creation of profile
  await firebase.firestore().collection('users').doc(userid).set({
    name: uname,
    description: descState,
    imageUrl: firebase.auth().currentUser.photoURL,
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
    id: userid,
  })
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(uname, userid);
  await loginCometChatUser(userid);
}
