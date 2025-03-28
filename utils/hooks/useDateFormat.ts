import moment from 'moment';

export const formatDateAndTime = (currentDate: any) => {
  // Format the date
  const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss'); // e.g., "2024-04-03"

  return formattedDate;
};
