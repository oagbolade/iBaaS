'use client';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

export const useFinancialLastDate = () => {
  const [financialLastDate, setFinancialLastDate] =
    React.useState<Dayjs | null>(dayjs());
  const [financialNewDate, setFinancialNewDate] = React.useState<Dayjs | null>(
    dayjs()
  );

  const formattedFinancialLastDate = financialLastDate
    ? financialLastDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    : '';
  const formattedFinancialNewDate = financialNewDate
    ? financialNewDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    : '';
  return {
    financialLastDate,
    setFinancialLastDate,
    formattedFinancialLastDate,
    formattedFinancialNewDate,
    setFinancialNewDate
  };
};
