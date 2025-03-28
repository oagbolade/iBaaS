import { Dayjs } from 'dayjs';

export function toISOStringFormat(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Ensure the date is valid
  if (Number.isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }

  // Convert to ISO 8601 string format
  return dateObj.toISOString();
}

export const formatFormikDatePickerToISO = (date: Dayjs) => {
  if (!date) return '';
  const isoString = new Date(
    date.year(),
    date.month(),
    date.date(),
    date.hour(),
    date.minute(),
    date.second(),
    date.millisecond()
  ).toISOString();
  return isoString; // This will provide the format: 2025-01-28T23:56:38.509Z
};
