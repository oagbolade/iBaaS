'use client';
import { createContext, useMemo, useState, useCallback, useEffect } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { useGetSystemDate } from '@/api/general/useSystemDate';


type DateRangePickerContextType = {
  dateValue: DateRange<Dayjs>;
  isDateFilterApplied: boolean;
  setDateValue: (newValue: DateRange<Dayjs>) => void;
  setIsDateFilterApplied: (isApplied: boolean) => void;
};

const initialValuesContext: DateRangePickerContextType = {
  isDateFilterApplied: false,
  dateValue: [dayjs(), dayjs()],
  setDateValue: () => {},
  setIsDateFilterApplied: () => {}
};

export const DateRangePickerContext =
  createContext<DateRangePickerContextType>(initialValuesContext);

export default function DateRangePickerContextProvider({ children }: any) {
  const { currentDate, nextDate } = useFormattedDates();
  const { sysmodel } = useGetSystemDate();

  // Default to previous and current date
  const [dateValue, setValue] = useState<DateRange<Dayjs>>([
    dayjs(currentDate),
    dayjs(nextDate),
  ]);

  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false);

  const setDateValue = useCallback((newValue: DateRange<Dayjs>) => {
    setValue(newValue);
  }, []);


  useEffect(() => {
    if (sysmodel?.systemDate) {
      const systemDate = dayjs(sysmodel.systemDate);
      const prevSystemDate = systemDate.subtract(1, 'day');
      setValue([prevSystemDate, systemDate]);
    }
  }, [sysmodel?.systemDate]);

  const value = useMemo(
    () => ({
      dateValue,
      setDateValue,
      isDateFilterApplied,
      setIsDateFilterApplied
    }),
    [dateValue, isDateFilterApplied]
  );

  return (
    <DateRangePickerContext.Provider value={value}>
      {children}
    </DateRangePickerContext.Provider>
  );
}
