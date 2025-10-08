'use client';
import { createContext, useMemo, useState, useCallback } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import useFormattedDates from '@/utils/hooks/useFormattedDates';

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
  const { currentDate, previousDate } = useFormattedDates();
  const [dateValue, setValue] = useState<DateRange<Dayjs>>([
    dayjs(previousDate),
    dayjs(currentDate)
  ]);

  const [isDateFilterApplied, setIsDateFilterApplied] =
    useState<boolean>(false);

  const setDateValue = useCallback(
    (newValue: DateRange<Dayjs>) => {
      setValue(newValue);
    },
    [dateValue]
  );

  const value: DateRangePickerContextType = useMemo(() => {
    return {
      dateValue,
      setDateValue,
      isDateFilterApplied,
      setIsDateFilterApplied
    };
  }, [dateValue]);

  return (
    <DateRangePickerContext.Provider value={value}>
      {children}
    </DateRangePickerContext.Provider>
  );
}
