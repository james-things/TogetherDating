// Description: An async function to create a firebase user with a provided email and password
import firebase from 'firebase/compat';
import localStorePut from './localStorePut';
import localStoreGet from './localStoreGet';

export default async function createEmailUser(email, password) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (doc) => doc)
    // await localStorePut('doc', doc);
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });
  console.log(localStoreGet('doc'));
}
