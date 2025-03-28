export function getCurrentDate(): string {
  const currentDate = new Date();

  // Get the year, month, and day
  const year = currentDate.getFullYear();
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // Months are zero-based
  const day = `0${currentDate.getDate()}`.slice(-2);

  // Format the date in the desired format
  return `${year}-${month}-${day}`;
}

export function getCurrentIsoDate(): string {
  const now: Date = new Date();
  const year: string = String(now.getFullYear());
  const month: string = String(now.getMonth() + 1).padStart(2, '0');
  const day: string = String(now.getDate()).padStart(2, '0');
  const hours: string = String(now.getHours()).padStart(2, '0');
  const minutes: string = String(now.getMinutes()).padStart(2, '0');
  const seconds: string = String(now.getSeconds()).padStart(2, '0');
  const milliseconds: string = String(now.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}
