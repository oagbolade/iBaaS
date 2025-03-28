import React from 'react';
import { Stack } from '@mui/material';
import { ActionButton } from '@/components/Revamp/Buttons';
import colors from '@/assets/colors';

type Props = {
  setSelectedDays: Function;
  selectedDays: Array<string>;
};

export const ZoneDaysPicker = ({ setSelectedDays, selectedDays }: Props) => {
  const Days = [
    { name: 'Monday', value: '1' },
    { name: 'Tuesday', value: '2' },
    { name: 'Wednesday', value: '3' },
    { name: 'Thursday', value: '4' },
    { name: 'Friday', value: '5' },
    { name: 'Saturday', value: '6' },
    { name: 'Sunday', value: '7' }
  ];

  const handleSelect = (day: string) => {
    setSelectedDays(day);
  };

  return (
    <Stack sx={{ width: '100%' }} direction="row" spacing={1}>
      {Days.map((day) =>
        typeof day === 'string' ? (
          <ActionButton
            customStyle={{
              backgroundColor: `${
                selectedDays.includes(day)
                  ? colors.primaryBlue100
                  : colors.neutral200
              }`,
              color: `${
                selectedDays.includes(day)
                  ? colors.primaryBlue500
                  : colors.neutral600
              }`,
              border: `1px solid ${
                selectedDays.includes(day) ? colors.primaryBlue500 : '#F3F5F6'
              }`
            }}
            onClick={() => handleSelect(day)}
            type="button"
            buttonTitle={day}
          />
        ) : (
          <ActionButton
            customStyle={{
              backgroundColor: `${
                selectedDays.includes(day.value)
                  ? colors.primaryBlue100
                  : colors.neutral200
              }`,
              color: `${
                selectedDays.includes(day.value)
                  ? colors.primaryBlue500
                  : colors.neutral600
              }`,
              border: `1px solid ${
                selectedDays.includes(day.value)
                  ? colors.primaryBlue500
                  : '#F3F5F6'
              }`
            }}
            onClick={() => handleSelect(day.value)}
            type="button"
            buttonTitle={day.name}
          />
        )
      )}
    </Stack>
  );
};
