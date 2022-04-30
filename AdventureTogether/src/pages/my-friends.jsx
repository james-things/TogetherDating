/* eslint-disable max-len, react/jsx-no-bind */
// Description: A host page for testing the editable user profile component

import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useFirestoreDocData, useUser } from 'reactfire';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Modal from 'react-modal';
import { withLayout } from '../wrappers/layout';
import UserProfile from '../components/UserProfile';

// Interface state initialization
const initialState = {
  targetUid: '',
  targetName: '',
};

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

// Management of document state
const reducer = (state, action) => {
  switch (action.type) {
    case 'targetUid':
      return { ...state, targetUid: action.payload };
    case 'targetName':
      return { ...state, targetName: action.payload };
    default:
      throw new Error();
  }
};

function MyFriendsPage() {
  // Subscribe to user/data
  const db = getFirestore();
  const { status, data: user } = useUser();
  const userRef = doc(db, `new-users/${user?.uid}`);
  const { refstatus, data } = useFirestoreDocData(userRef);

  // Define array/state constants
  const [friends, setFriends] = useState([]);
  const myInterests = [];
  const friendIds = [];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalUID, setModalUID] = useState();

  // Call in reducer to handle inputs
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

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

  function openModal(person) {
    setModalUID(person.id);
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log('modal opened successfully');
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (user && (user.uid.length > 0)) {
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
    }
  }, [user, data, friends]);

  // If there is an error, it will end up status
  if (refstatus === 'error' || refstatus === 'error') {
    return <span>Error Loading Projects.</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (refstatus === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  return (
    <>
      {(!loading) && (data) && (friends.length > 0) && (!modalIsOpen)
        && (
        <div className="top-20 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full">
          <div className="flex flex-col justify-center items-center">
            <Link to="/">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect className="cls-1" x={0.13} width={24} height={24} />
                  </clipPath>
                </defs>
                <g className="cls-2">
                  <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                  <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                  <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                  <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
                </g>
              </svg>
            </Link>
            <h3 className="text-2xl font-extrabold my-4">
              My Outdoorsies
            </h3>
            Users you have connected with on our app!
          </div>
          <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
            <>
              {(friends.length === 0) && (<div>No connections yet, head to Discover!</div>)}
              {(!loading) && (data) && (friends.length > 0) && (!modalIsOpen)
            && (
              <div className="flex items-center justify-center py-8">
                <div className="max-w-3xl rounded shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="dark:bg-gray-900 bg-gray-100">
                      <tr>
                        <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-8 py-4 pl-14">
                          <div className="flex items-center">
                            Outdoorsie
                          </div>
                        </td>
                        <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-8 uppercase">
                          <div className="flex items-center">
                            Shared Interests
                          </div>
                        </td>
                        <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pr-8 uppercase">
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
                          <td className="py-4 pl-8">
                            <div>
                              <svg
                                onClick={() => openModal(friend)}
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                id="Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <defs>
                                  <clipPath id="clip-path">
                                    <rect className="cls-1" x={0.13} width={24} height={24} />
                                  </clipPath>
                                </defs>
                                <g className="cls-2">
                                  <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                                  <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                                  <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                                  <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
                                </g>
                              </svg>
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
            </>
            <div className="py-4 z-50">
              <div className="flex justify-between items-center">.</div>
            </div>
          </div>
        </div>
        )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* eslint-disable-next-line no-return-assign */}
        <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
          {(modalUID) && <UserProfile userId={modalUID} />}
        </div>
      </Modal>
    </>
  );
}

export default withLayout(MyFriendsPage, { bgImage: true });
