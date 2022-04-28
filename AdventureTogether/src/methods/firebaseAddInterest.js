// Description: a function to pull the current list of outdoorActivities and add a value.
// If the value already exists, no changes will be made to the document.

import { doc, getDoc, getFirestore } from 'firebase/firestore';
import updateUserData from './updateUserData';

export default async function firebaseAddInterest(targetName, userId) {
  const db = getFirestore();
  const ref = doc(db, `users/${userId}`);
  await getDoc(ref).then((docPromise) => {
    const docInterests = docPromise.data().outdoorActivities;
    if (docInterests.indexOf(targetName) === -1) {
      console.log(`attempting to add interest ${targetName}`);
      const newInterests = [targetName, ...docInterests];
      updateUserData(userId, { outdoorActivities: newInterests });
    }
  }).catch((err) => {
    console.log(`Unable to update user: ${err.message}`);
  });
}
