import { useMemo } from 'react';

const useFormattedDates = () => {
  return useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 since months are zero-based
    const currentDay = String(now.getDate()).padStart(2, '0');
    const nextDay = String(now.getDate() + 1).padStart(2, '0');

    return {
      currentDate: `${currentYear}-${currentMonth}-${currentDay}`,
      nextDate: `${currentYear}-${currentMonth}-${nextDay}`
    };
  }, []);
};

export default useFormattedDates;
