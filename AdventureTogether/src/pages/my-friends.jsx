// Description: A host page for testing the editable user profile component

import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { withLayout } from '../wrappers/layout';
import FriendsList from '../components/FriendsList';
import FriendsGrid from '../components/FriendsGrid';

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
        {(user) && <FriendsGrid userId={user?.uid} />}
        <div className="py-4">
          <div className="flex justify-between items-center"> </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(MyFriendsPage, { bgImage: true });
