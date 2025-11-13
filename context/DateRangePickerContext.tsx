'use client';
import { createContext, useMemo, useState, useCallback, useEffect, useContext } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { ToastMessageContext } from './ToastMessageContext';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { toast } from '@/utils/toast';

type DateRangePickerContextType = {
  dateValue: DateRange<Dayjs>;
  isDateFilterApplied: boolean;
  // second arg is optional — allowSingle bypasses start/end validation for single-date pickers
  setDateValue: (newValue: DateRange<Dayjs>, opts?: { allowSingle?: boolean }) => void;
  setIsDateFilterApplied: (isApplied: boolean) => void;
};

const initialValuesContext: DateRangePickerContextType = {
  isDateFilterApplied: false,
  dateValue: [dayjs(), dayjs()],
  setDateValue: (_newValue: DateRange<Dayjs>, _opts?: { allowSingle?: boolean }) => {},
  setIsDateFilterApplied: () => { }
};

export const DateRangePickerContext =
  createContext<DateRangePickerContextType>(initialValuesContext);

export default function DateRangePickerContextProvider({ children }: any) {
  const { currentDate, nextDate } = useFormattedDates();
  const { sysmodel } = useGetSystemDate();
  const toastActions = useContext(ToastMessageContext);

  // Default to previous and current date
  const [dateValue, setValue] = useState<DateRange<Dayjs>>([
    dayjs(currentDate),
    dayjs(nextDate),
  ]);

  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false);

  const setDateValue = useCallback(
    (newValue: DateRange<Dayjs>, opts?: { allowSingle?: boolean }) => {
      const [start, end] = newValue;
      if (!opts?.allowSingle) {
        if (start && end && !end.isAfter(start, 'day')) {
          toast(
            'End date must be after the start date.',
            'Invalid Date Range',
            'error',
            toastActions
          );
          return;
        }
      }
      setValue(newValue);
    },
    [toastActions]
  );

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
