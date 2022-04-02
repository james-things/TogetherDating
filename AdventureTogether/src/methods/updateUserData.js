// Description: An async function to update user profile attributes
import firebase from 'firebase/compat';

export default async function updateUserData(userId, userData) {
  await firebase.firestore().collection('users').doc(userId).update(userData)
    .catch((err) => {
      console.log(`Unable to update user: ${err.message}`);
    });
}
