import firebase from 'firebase/compat';
import localStoreGet from './localStoreGet';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';

export default async function registerEmailProfile(imageState, nameState, descState) {
  const bDay = localStoreGet('localBirthdate');
  const doc = localStoreGet('doc');
  const { uid } = doc.user;
  const imageRef = firebase.storage().ref(`/profiles/${uid}`);

  await imageRef.put(imageState);

  const imageUrl = await imageRef.getDownloadURL();

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

  await registerCometChatUser(nameState, uid);
  await loginCometChatUser(uid);
}
