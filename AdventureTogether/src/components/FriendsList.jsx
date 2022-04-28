// Description: A work in progress component which fetches and displays details
// about a user's friends (aka matches)

// todo: identify cause of failing to pull user documents back out of array after
//  successful retrieval from firebase, then build remaining features. this is the most
//  incomplete component currently.

import React, { useEffect, useState } from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import {
  doc, getDoc, getFirestore,
} from 'firebase/firestore';

export default function FriendsList({ userId }) {
  const [loading, setLoading] = useState(true);
  const myInterests = [];
  const friendIds = [];

  // Define array constants
  const [friends, setFriends] = useState([]);

  // Get firestore
  const db = getFirestore();

  // Subscribe to document associated with user session (passed as props)
  // 'users/17aeqVDSRSd1Zf1tME57sIUAlwy2' // `users/${user?.uid}` // (test strings)
  const userRef = doc(db, `users/${userId}`);
  const { refstatus, data } = useFirestoreDocData(userRef);

  // If there is an error, it will end up status
  if (refstatus === 'error' || refstatus === 'error') {
    return <span>Error Loading Projects.</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (refstatus === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  // for each friend, fetch their data and shared interests and build a list
  function fetchFriendDetails() {
    friendIds.forEach(async (id) => {
      const sharedInterests = [];
      const docRef = doc(db, `users/${id}`);
      const curFriend = await getDoc(docRef);
      const friendInterests = curFriend.data().outdoorActivities;

      myInterests.forEach((interest) => {
        friendInterests.forEach((friendInterest) => {
          if (interest === friendInterest) sharedInterests.push(friendInterest);
        });
      });

      const friendInfo = {
        name: curFriend.data().name,
        id: curFriend.data().id,
        image: curFriend.data().imageUrl,
        sharedInterests,
      };

      setFriends((oldFriends) => [friendInfo, ...oldFriends]);
      console.log(`added person: \n name: ${friendInfo.name} \n sharedInterests: ${friendInfo.sharedInterests} \n imageRef: ${friendInfo.image}`);
    });
  }

  // will clean this up after further testing
  useEffect(() => {
    // handle early potential early firing of useEffect
    if (refstatus === 'error' || refstatus === 'loading') {
      console.log('handled early firing of useEffect!');
    } else if (data && friends.length === 0) {
      // Build a list of friends and obtain their documents
      // todo: perform additional testing to confirm timings work as expected
      const temp = data.outdoorActivities;
      temp.forEach((i) => myInterests.push(i));
      data.likes.map((match) => friendIds.push(match)); // this works
      fetchFriendDetails();
    }
    if (friends.length > 0) setLoading(false);
  }, [data]);

  // Just some testing stuff for now
  return (
    <pre>
      {(!!loading) && (data) && (friends.length > 0)
        && (
          <div className="container">
            <div className="grid grid-cols-4 font-sans">
              {/* above this */}
              <div className="col-span-1 self-center">
                <img
                  className="self-auto rounded-full"
                  width="150"
                  src={data.imageUrl}
                  alt="User Profile Pic"
                />
              </div>
              <div className="col-span-3 self-center text-center text-4xl">
                {data.name}
              </div>
              <div className="container col-span-4">
                {friends.map((friend) => (
                  <div className="col-span-1" key={friend.id}>
                    {friend.name}
                    {'    '}
                    {friend.sharedInterests}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </pre>
  );
}
