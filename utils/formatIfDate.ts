import moment, { MomentInput } from 'moment';

export const formatIfDate = (
  key: string,
  value: unknown,
  dateKeys: readonly string[] | string[]
): string => {
  if (!dateKeys.includes(key)) {
    return value != null && value !== '' ? String(value) : 'N/A';
  }

  const parsedDate = moment(value as MomentInput);

  if (!parsedDate.isValid()) return 'N/A';

  return parsedDate.format('MMMM Do YYYY, h:mm:ss a');
};
