import { CometChat } from '@cometchat-pro/chat';
import { cometConfig } from './environment';

const loginCometChatUser = async (uid) => {
  try {
    const user = await CometChat.login(
      uid,
      cometConfig.authKey,
    );
    console.log('Login Successful:', { user });
  } catch (error) {
    console.log('Login failed with exception:', { error });
  }
};

const logoutCometChatUser = async () => {
  try {
    await CometChat.logout();
    console.log('Logout Successful:');
  } catch (error) {
    console.log('Login failed with exception:', { error });
  }
};

const registerCometChatUser = async (name, uid) => {
  const user = new CometChat.User(uid);

  user.setName(name);

  try {
    const createdUser = await CometChat.createUser(
      user,
      cometConfig.authKey,
    );
    console.log('user created', createdUser);
  } catch (error) {
    console.log('Register failed with exception:', { error });
  }
};

const sendCometChatMessage = async (ratedPersonId, messageText) => {
  const receiverType = CometChat.RECEIVER_TYPE.USER;
  const textMessage = new CometChat.TextMessage(
    ratedPersonId,
    messageText,
    receiverType,
  );

  CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log('Message sent successfully:', message);
    },
    (error) => {
      console.log('Message sending failed with error:', error);
    },
  );
};

const makeCometChatCall = async (targetPerson, type) => {
  const receiverType = CometChat.RECEIVER_TYPE.USER;
  const audioCall = new CometChat.Call(targetPerson, CometChat.CALL_TYPE.AUDIO, receiverType);

  await CometChat.initiateCall(audioCall).then(
    (call) => {
      console.log('Audio call placed successfully:', audioCall);
    },
    (error) => {
      console.log('Audio call failed with error:', error);
    },
  );
};

export {
  CometChat,
  loginCometChatUser,
  registerCometChatUser,
  sendCometChatMessage,
  logoutCometChatUser,
  makeCometChatCall,
};
