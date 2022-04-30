import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useFirestoreDocData } from 'reactfire';

export default function FriendsGrid({ userId }) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);

  const [loading, setLoading] = useState(true);
  const myInterests = [];
  const friendIds = [];

  // Define array constants
  const [friends, setFriends] = useState([]);

  // Get firestore
  const db = getFirestore();

  // Subscribe to document associated with user session (passed as props)
  // 'new-users/17aeqVDSRSd1Zf1tME57sIUAlwy2' // `new-users/${user?.uid}` // (test strings)
  const userRef = doc(db, `new-users/${userId}`);
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
      const docRef = doc(db, `new-users/${id}`);
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
        lastLogin: curFriend.data().lastLogin,
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

  return (
    <>
      {(!!loading) && (data) && (friends.length > 0)
        && (
        <div className="flex items-center justify-center py-8">
          <div className="max-w-3xl rounded shadow overflow-x-auto">
            <table className="w-full">
              <thead className="dark:bg-gray-900 bg-gray-100">
                <tr>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-8 py-4 sm:pl-4 pl-2">
                    <div className="flex items-center">
                      Name
                    </div>
                  </td>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                    <div className="flex items-center">
                      Shared Interests
                    </div>
                  </td>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                    <div className="flex items-center">
                      Last Online
                    </div>
                  </td>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                    <div className="flex items-center">
                      Message
                    </div>
                  </td>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase sm:pr-6 pr-4">
                    <div className="flex items-center">
                      Call
                    </div>
                  </td>
                  <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase sm:pr-6 pr-4">
                    <div className="flex items-center">
                      Video Call
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {friends.map((friend, index) => (
                  <tr className="border-b border-gray-200 dark:border-gray-900" key={friend.id.slice(0, -5)}>
                    <td className="py-4 sm:pl-6 pl-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={friend.image}
                            alt="?"
                          />
                        </div>
                        <div className="pl-5">
                          <p className="text-sm font-semibold leading-none text-gray-800 dark:text-gray-100 pb-2">{friend.name}</p>
                          <p className="text-xs leading-3 text-gray-500 dark:text-gray-400">subtext</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x={0} y={1} width={18} height={16}>
                              <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5H15C16.275 1.5 17.25 2.475 17.25 3.75V11.25C17.25 12.525 16.275 13.5 15 13.5H9.75V15H12C12.45 15 12.75 15.3 12.75 15.75C12.75 16.2 12.45 16.5 12 16.5H6C5.55 16.5 5.25 16.2 5.25 15.75C5.25 15.3 5.55 15 6 15H8.25V13.5H3C1.725 13.5 0.75 12.525 0.75 11.25V3.75C0.75 2.475 1.725 1.5 3 1.5ZM15 12C15.45 12 15.75 11.7 15.75 11.25V3.75C15.75 3.3 15.45 3 15 3H3C2.55 3 2.25 3.3 2.25 3.75V11.25C2.25 11.7 2.55 12 3 12H15Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0)">
                              <rect width={18} height={18} fill="#1D4ED8" />
                            </g>
                          </svg>
                        </div>
                        <p className="text-sm leading-tight text-gray-500 dark:text-gray-400 pl-3">{friend.sharedInterests}</p>
                      </div>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm font-semibold leading-none text-gray-800 dark:text-gray-100">Last Online</p>
                      <p className="text-xs leading-3 text-gray-500 dark:text-gray-400 pt-2">{`Placeholder ${friend.lastLogin}`}</p>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">M</p>
                    </td>
                    <td className="py-4 sm:px-6 px-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold pr-3 leading-none text-gray-800 dark:text-gray-100">C</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                          <path
                            d="M16 3.99984C16 3.93317 16 3.79984 15.9333 3.73317C15.8667 3.59984 15.7333 3.4665 15.6 3.39984C15.5333 3.33317 15.4 3.33317 15.3333 3.33317H11.3333C10.9333 3.33317 10.6667 3.59984 10.6667 3.99984C10.6667 4.39984 10.9333 4.6665 11.3333 4.6665H13.7333L9 9.39984L6.13333 6.53317C5.86667 6.2665 5.46667 6.2665 5.2 6.53317L0.2 11.5332C-0.0666667 11.7998 -0.0666667 12.1998 0.2 12.4665C0.466667 12.7332 0.866667 12.7332 1.13333 12.4665L5.66667 7.93317L8.53333 10.7998C8.8 11.0665 9.2 11.0665 9.46667 10.7998L14.6667 5.59984V7.99984C14.6667 8.39984 14.9333 8.6665 15.3333 8.6665C15.7333 8.6665 16 8.39984 16 7.99984V3.99984Z"
                            fill="#15803D"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 sm:px-6 px-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold pr-3 leading-none text-gray-800 dark:text-gray-100">V</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                          <path
                            d="M16 3.99984C16 3.93317 16 3.79984 15.9333 3.73317C15.8667 3.59984 15.7333 3.4665 15.6 3.39984C15.5333 3.33317 15.4 3.33317 15.3333 3.33317H11.3333C10.9333 3.33317 10.6667 3.59984 10.6667 3.99984C10.6667 4.39984 10.9333 4.6665 11.3333 4.6665H13.7333L9 9.39984L6.13333 6.53317C5.86667 6.2665 5.46667 6.2665 5.2 6.53317L0.2 11.5332C-0.0666667 11.7998 -0.0666667 12.1998 0.2 12.4665C0.466667 12.7332 0.866667 12.7332 1.13333 12.4665L5.66667 7.93317L8.53333 10.7998C8.8 11.0665 9.2 11.0665 9.46667 10.7998L14.6667 5.59984V7.99984C14.6667 8.39984 14.9333 8.6665 15.3333 8.6665C15.7333 8.6665 16 8.39984 16 7.99984V3.99984Z"
                            fill="#15803D"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
    </>
  );
}
