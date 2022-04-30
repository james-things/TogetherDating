/* eslint-disable max-len, react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useFirestoreDocData } from 'reactfire';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function FriendsGrid({ userId }) {
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

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // will clean this up after further testing
  useEffect(() => {
    // handle early potential early firing of useEffect
    if (refstatus === 'error' || refstatus === 'loading') {
      console.log('handled early firing of useEffect!');
    } else if (data && friends.length === 0) {
      // Build a list of friends and obtain their documents
      const temp = data.outdoorActivities;
      temp.forEach((i) => myInterests.push(i));
      data.likes.map((like) => friendIds.push(like)); // this works
      data.matches.map((match) => friendIds.push(match)); // this works
      fetchFriendDetails();
    }
    if (friends.length > 0) setLoading(false);
  }, [data, friends]);

  return (
    <>
      {(friends.length === 0) && (<div>No connections yet, head to Discover!</div>)}
      {(!loading) && (data) && (friends.length > 0) && (!modalIsOpen)
        && (
          <div className="flex items-center justify-center py-8">
            <div className="max-w-3xl rounded shadow overflow-x-auto">
              <table className="w-full">
                <thead className="dark:bg-gray-900 bg-gray-100">
                  <tr>
                    <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-8 py-4 pl-6">
                      <div className="flex items-center">
                        User
                      </div>
                    </td>
                    <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 pr-4 uppercase">
                      <div className="flex items-center">
                        Shared Interests
                      </div>
                    </td>
                    <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                      <div className="flex items-center">
                        View Profile
                      </div>
                    </td>
                    {/*
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
                  */}
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
                          </div>
                        </div>
                      </td>
                      <td className="py-4 sm:pl-6 pl-4 pr-4">
                        <div className="flex items-center">
                          <p className="text-s leading-tight text-gray-500 dark:text-gray-400 pl-3 min-w-max">
                            {friend.sharedInterests.map((interest, i) => (
                              <small key={`${interest}`}>
                                {interest}
                                {(i === friend.sharedInterests.length - 1) ? '' : ', '}
                              </small>
                            ))}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 sm:pl-6 pl-4">
                        <div>
                          <button type="button" onClick={openModal}>Open Modal</button>
                        </div>
                      </td>
                      {/*
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">M</p>
                    </td>
                    <td className="py-4 sm:px-6 px-4">
                      <div className="flex items-center">
                        // eslint-disable-next-line max-len
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
                        <Link to={makeCometChatCall(friend.id, 'audio')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                            <path
                              d="M16 3.99984C16 3.93317 16 3.79984 15.9333 3.73317C15.8667 3.59984 15.7333 3.4665 15.6 3.39984C15.5333 3.33317 15.4 3.33317 15.3333 3.33317H11.3333C10.9333 3.33317 10.6667 3.59984 10.6667 3.99984C10.6667 4.39984 10.9333 4.6665 11.3333 4.6665H13.7333L9 9.39984L6.13333 6.53317C5.86667 6.2665 5.46667 6.2665 5.2 6.53317L0.2 11.5332C-0.0666667 11.7998 -0.0666667 12.1998 0.2 12.4665C0.466667 12.7332 0.866667 12.7332 1.13333 12.4665L5.66667 7.93317L8.53333 10.7998C8.8 11.0665 9.2 11.0665 9.46667 10.7998L14.6667 5.59984V7.99984C14.6667 8.39984 14.9333 8.6665 15.3333 8.6665C15.7333 8.6665 16 8.39984 16 7.99984V3.99984Z"
                              fill="#15803D"
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                    */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      <Modal
        className=""
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* eslint-disable-next-line no-return-assign */}
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button type="button" onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button type="button">tab navigation</button>
          <button type="button">stays</button>
          <button type="button">inside</button>
          <button type="button">the modal</button>
        </form>
      </Modal>
    </>
  );
}
