// Description: A function to store a value at a specified localStored key

export default function localStorePut(storageKey, dataValue) {
  window.localStorage.setItem(`${storageKey}`, JSON.stringify(dataValue));
}
