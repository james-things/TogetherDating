// Description: An async function to create a firebase user with a provided email and password
// refactored to firebase v9 code

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default async function createEmailUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (doc) => doc)
    .catch((err) => {
      console.log(`Unable to register user: ${err.message}`);
    });
}
