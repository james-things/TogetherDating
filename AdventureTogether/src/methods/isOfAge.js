// Return true if age of ISO-formatted date string is 18 or higher
import getAge from './getAge';

export default function isOfAge(dateString) {
  return (getAge(dateString) >= 18);
}
