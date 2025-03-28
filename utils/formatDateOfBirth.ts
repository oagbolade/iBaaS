import moment from 'moment';

export const formatDateOfBirth = (currentDate: any) => {
  if (!currentDate || currentDate.toString().trim().length === 0) {
    return 'N/A';
  }

  // Format the date
  const formattedDate = moment(currentDate).format('YYYY-MM-DD'); // e.g., "2024-04-03"

  return formattedDate;
};
