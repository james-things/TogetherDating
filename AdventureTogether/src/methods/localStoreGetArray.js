// Description: A function to retrieve a localStored array item by key name

export default function localStoreGetArray(storageKey) {
  return JSON.parse(window.localStorage.getItem(`${storageKey}`));
}
