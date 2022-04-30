import firebase from 'firebase/compat';
import localStoreGet from './localStoreGet';

export default async function updateProfile(outdoorState) {
  const doc = localStoreGet('doc');
  const { uid } = doc.user;
  console.log(uid, outdoorState);
  const outdoorConst = firebase.firestore().collection('new-users').doc(uid);

  // Set the 'capital' field of the city
  const res = await outdoorConst.update({ outdoorActivities: outdoorState });

  firebase
    .firestore()
    .doc(`/new-users/${uid}`)
    .get()
    .then((evt) => {
      localStorage.setItem('user', JSON.stringify({
        ...evt.data(),
        id: evt.id,
      }));
    });
}
