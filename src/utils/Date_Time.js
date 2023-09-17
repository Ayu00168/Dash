export function formatDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return inputDate.toLocaleDateString(undefined, options);
}

export function convertToTimezone(dateString) {
  const date = new Date(dateString);
  const day = new Date();
  const timezoneOffset = day.getTimezoneOffset();
  const utcTime = date.getTime() - date.getTimezoneOffset() * 60000;
  const localTime = new Date(utcTime + timezoneOffset * 60000);

  const hours = String(localTime.getUTCHours()).padStart(2, "0");
  const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
