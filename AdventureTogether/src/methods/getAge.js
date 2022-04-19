// Description: Get an age value returned from an ISO formatted date string

export default function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    // eslint-disable-next-line no-plusplus
    age--;
  }
  return age;
}
