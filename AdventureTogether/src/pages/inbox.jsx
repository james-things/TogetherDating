// Description: display cometchat ui as messaging inbox

import React from 'react';
import { withLayout } from '../wrappers/layout';
// Import 'error' safe to ignore
import { CometChatConversationListWithMessages } from '../CometChatWorkspace/src';

// Main func/page content
const InboxPage = () => (
  <div
    className="absolute inset-0 top-auto w-screen bg-white"
    style={{
      height: '90vh',
    }}
  >
    <CometChatConversationListWithMessages />
  </div>
);

export default withLayout(InboxPage);
