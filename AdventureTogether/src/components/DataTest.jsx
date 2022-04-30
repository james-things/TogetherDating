// Description: A reference component for the use of reactfire

// todo: use this as a reference if you build firebase functions/components!

import React from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'; // reactfire imports
import { doc } from 'firebase/firestore'; // firebase v9 functions can be used with reactfire too

export default function DataTest() {
  // Subscribe to firebase user session
  // Variable will update whenever the data changes
  const { status, data: user } = useUser();

  // Subscribe to firestore document works similarly
  // However a reference to the document should be defined first
  const userRef = doc(useFirestore(), `new-users/${user?.uid}`); // this is how to use uid from user
  const { refstatus, data } = useFirestoreDocData(userRef);

  // If there is an error, it will end up in the status
  if (status === 'error' || refstatus === 'error') {
    return <span>Error Loading Projects.</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (status === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  // Arrays can be displayed with stringify
  // Currently configured to monitor outdoorActivities array
  return (
    <pre>
      {/*
      <i>USER:</i>
      <br />
      {JSON.stringify(user, null, 2)}
      <br />
      */}
      <h3>Firestore Live View</h3>
      <i>Outdoor Interests:</i>
      <br />
      {JSON.stringify(data.outdoorActivities, null, 2)}
    </pre>
  );
}
