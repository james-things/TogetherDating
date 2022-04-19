// Description: A work in progress component which fetches and displays details
// about a user's friends (aka matches)

// todo: identify cause of failing to pull user documents back out of array after
//  successful retrieval from firebase, then build remaining features. this is the most
//  incomplete component currently.

import React, { useEffect } from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export default function FriendsList({ userId }) {
  // Define array constants
  const friendIds = [];
  const friends = [];

  // Get firestore
  const db = getFirestore();

  // Subscribe to user session
  const { status, data: user } = useUser();

  // Subscribe to document associated with user session (passed as props)
  // 'users/17aeqVDSRSd1Zf1tME57sIUAlwy2' // `users/${user?.uid}` // (test strings)
  const userRef = doc(db, `users/${userId}`);
  const { refstatus, data } = useFirestoreDocData(userRef);

  // If there is an error, it will end up status
  if (status === 'error' || refstatus === 'error') {
    return <span>Error Loading Projects.</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (status === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  // Build a list of friends and obtain their documents
  // todo: figure out why friends object wont appear in component below
  if (data) {
    data.likes.map((match) => friendIds.push(match)); // this works
    friendIds.forEach(async (id) => {
      console.log(id); // working through here
      const docRef = doc(db, `users/${id}`); // this works
      const docSnap = await getDoc(docRef); // this code is from firebase documentation
      friends.push(docSnap.data()); // <-- problem might be here
      console.log('Friends Log:');
      console.log(friends); // this is a problem maybe bc nested array into array?
    });
  }

  // If it is a timing issue, useEffect may be the solution
  // useEffect(() => {}, [friends]);

  // Just some testing stuff for now
  return (
    <pre>
      {(data) && (friends.length > 0)
        && (
          <div className="container mx-auto">
            <div className="grid grid-cols-4 font-sans">
              {/* above this */}
              <div className="flex items-stretch justify-center">
                <div className="col-span-1 self-center">
                  <img
                    className="self-auto rounded-full"
                    width="150"
                    src={data.imageUrl}
                    alt="User Profile Pic"
                  />
                </div>
              </div>
              <div className="col-span-3 self-center">
                <div className="text-center text-4xl">
                  {data.name}
                </div>
              </div>
            </div>
            <div>
              Friends:
              {' '}
              {(JSON.stringify(friends))}
            </div>
          </div>
        )}
    </pre>
  );
}
