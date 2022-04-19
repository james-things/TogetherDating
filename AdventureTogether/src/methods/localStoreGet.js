// Description: A function to retrieve a localStored item by key name

// todo: create a destructuring version of this to fix retrieval issues
//  eg: return { id, name, imgUrl } = getItem(x)

export default function localStoreGet(storageKey) {
  return window.localStorage.getItem(`${storageKey}`);
}
