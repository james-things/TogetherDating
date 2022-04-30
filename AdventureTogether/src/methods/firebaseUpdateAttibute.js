// Description: A function to handle updating a specific attribute of a profile
import updateUserData from './updateUserData';

export default async function firebaseUpdateAttribute(userId, attribName, newValue) {
  let update;
  switch (attribName) {
    case 'gender':
      update = { gender: newValue };
      break;
    case 'astrologySign':
      update = { astrologySign: newValue };
      break;
    case 'alcoholUse':
      update = { alcoholUse: newValue };
      break;
    case 'bodyType':
      update = { bodyType: newValue };
      break;
    case 'childStatus':
      update = { childStatus: newValue };
      break;
    case 'religion':
      update = { religion: newValue };
      break;
    case 'smoking':
      update = { smoking: newValue };
      break;
    case 'education':
      update = { education: newValue };
      break;
    case 'ethnicity':
      update = { ethnicity: newValue };
      break;
    case 'hairColor':
      update = { hairColor: newValue };
      break;
    case 'eyeColor':
      update = { gender: newValue };
      break;
    case 'height':
      update = { height: newValue };
      break;
    default:
      console.log('invalid update request!');
  }
  await updateUserData(userId, update)
    .catch((err) => {
      console.log(`Unable to update user: ${err.message}`);
    });
}
