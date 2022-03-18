export default function localStorePut(storageKey, dataValue) {
  window.localStorage.setItem(`${storageKey}`, JSON.stringify(dataValue));
}
