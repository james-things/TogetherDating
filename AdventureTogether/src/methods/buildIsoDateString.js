// Convert a MM-DD-YYYY (US) ordered date input to YYYY-MM-DD (ISO) date string
export default function buildIsoDateString(a, b, c) {
  return `${c}-${a}-${b}`;
}
