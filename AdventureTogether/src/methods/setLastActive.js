// Description: An async function to update last logged in time

import { doc, getFirestore, updateDoc } from 'firebase/firestore';

export default async function setLastActive(userId) {
  const db = getFirestore();
  const ref = doc(db, `new-users/${userId}`);
  const now = Date.now();
  await updateDoc(ref, [{ lastLogin: now }])
    .catch((err) => {
      console.log(`Unable to set timestamp: ${err.message}`);
    });
}
