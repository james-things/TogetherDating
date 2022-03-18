export default function localStoreGet(storageKey) {
  return JSON.parse(window.localStorage.getItem(`${storageKey}`));
}
