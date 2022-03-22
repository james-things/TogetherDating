// Return true if age is 18 or higher
import getAge from './getAge';

export default function isOfAge(dateString) {
  return (getAge(dateString) >= 18);
}
