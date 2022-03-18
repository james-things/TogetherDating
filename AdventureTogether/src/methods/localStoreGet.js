// Description: A function to retrieve a localStored item by key name
export default function localStoreGet(storageKey) {
  return JSON.parse(window.localStorage.getItem(`${storageKey}`));
}
