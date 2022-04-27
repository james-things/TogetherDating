// Description: a function to add matches for testing purposes

import {
  collection, doc, getDocs, getFirestore, query, updateDoc, where,
} from 'firebase/firestore';

async function addMatches() {
  const db = getFirestore();
  const q = query(collection(db, 'users'), where('id', '!=', ('ftSU0Vp08DQoTzkz1DZio0A8QhA2')));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((snappy) => {
    const tempRef = doc(db, `users/${snappy.data().id}`);
    updateDoc(tempRef, {
      matches: ['ftSU0Vp08DQoTzkz1DZio0A8QhA2', '3VHNy5TmlCh45iL13672VnD3IVk1'],
    });
  });
}
