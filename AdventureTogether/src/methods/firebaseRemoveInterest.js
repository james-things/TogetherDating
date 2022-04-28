// Description: a function to pull the current list of outdoorActivities and remove a
// matching value. The document will always be updated, whether or not a matching entry
// was found, however it will be replaced with an identical copy of itself in the case
// of no matching element to remove.

import { doc, getDoc, getFirestore } from 'firebase/firestore';
import updateUserData from './updateUserData';

export default async function firebaseRemoveInterest(targetName, userId) {
  const db = getFirestore();
  const ref = doc(db, `users/${userId}`);
  await getDoc(ref).then((docPromise) => {
    const docInterests = docPromise.data().outdoorActivities;
    const newInterests = docInterests.filter((interest) => interest !== targetName);
    updateUserData(userId, { outdoorActivities: newInterests });
  }).catch((err) => {
    console.log(`Unable to update user: ${err.message}`);
  });
}
