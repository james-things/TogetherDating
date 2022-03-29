// Description: An async function to create a dating profile for an email-registered user
import firebase from 'firebase/compat';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerEmailProfile(imageState, nameState, descState) {
  // Prepare the profile data already collected
  const bDay = localStoreGet('localBirthdate');
  const doc = localStoreGet('doc');
  const { uid } = doc.user;
  const imageRef = firebase.storage().ref(`/profiles/${uid}`);

  await imageRef.put(imageState);

  const imageUrl = await imageRef.getDownloadURL();

  // Await firebase profile storage
  await firebase.firestore().collection('users').doc(uid).set({
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
    id: uid,
  })
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });

  // Then register and log the user in to CometChat
  await registerCometChatUser(nameState, uid);
  await loginCometChatUser(uid);
}
