// Description: A host page for testing the editable user profile component

import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { withLayout } from '../wrappers/layout';
import FriendsList from '../components/FriendsList';

// Interface state initialization
const initialState = {
  targetUid: '',
  targetName: '',
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
  MyFriendsPage.displayName = 'my-friends';
  const [loading, setLoading] = useState(false);
  // Subscribe to user session
  const { status, data: user } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Call in reducer to handle inputs
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  useEffect(() => {
    if (user && (user.uid.length > 0)) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-9/12 lg:w-1/2 md:w-6/12 sm:w-7/12">
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <svg
            className="w-10"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <radialGradient
                id="svg-fill-radial__tinder"
                cx="0.5"
                cy="1"
                fr="0"
                fx="0.5"
                fy="1"
                r="1"
                spreadMethod="pad"
              >
                <stop offset="0%" stopColor="#ff7854" />
                <stop offset="100%" stopColor="#fd267d" />
              </radialGradient>
            </defs>
            <path
              d="M8.21 10.08c-.02 0-.04 0-.06-.02-.67-.9-.84-2.44-.89-3.03 0-.11-.13-.18-.23-.12C4.93 8.08 3 10.86 3 13.54 3 18.14 6.2 22 11.7 22c5.15 0 8.7-3.98 8.7-8.46 0-5.87-4.2-9.77-7.93-11.53a.13.13 0 0 0-.19.14c.48 3.16-.18 6.6-4.07 7.93z"
              fill="url(#svg-fill-radial__tinder)"
              fillRule="nonzero"
            />
          </svg>
        </Link>
        <h3 className="text-2xl font-extrabold italic uppercase my-4">
          Friends List Test Page
        </h3>
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        {(user) && <FriendsList userId={user?.uid} />}
        <div className="py-4">
          <div className="flex justify-between items-center"> </div>
        </div>
        {(user) && user?.uid}
      </div>
    </div>
  );
}

export default withLayout(MyFriendsPage, { bgImage: true });
