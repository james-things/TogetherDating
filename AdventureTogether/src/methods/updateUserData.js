// Description: An async function to update user profile attributes
// Accepts a userData object and leverages firebase to update all matching values automatically

import { doc, getFirestore, updateDoc } from 'firebase/firestore';

export default async function updateUserData(userId, userData) {
  const db = getFirestore();
  const ref = doc(db, `users/${userId}`);
  await updateDoc(ref, userData)
    .catch((err) => {
      console.log(`Unable to update user: ${err.message}`);
    });
}
