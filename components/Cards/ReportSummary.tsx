import React from 'react';
import { Box, Typography } from '@mui/material';
import { reportSummary } from './styles';
import { primaryTitle } from '@/components/Confirmation/styles';
import { ChartFilters, Ifilter } from '@/features/Report/Overview/ChartFilters';
import { CustomStyleI } from '@/constants/types';
import { ReportLink } from '@/features/Report/Overview/ReportLink';

type Props = {
  children: React.ReactNode;
  title: string;
  link?: string;
  filter: Ifilter['filter'];
  customStyle?: CustomStyleI;
};

export const ReportSummary = ({
  children,
  title,
  filter,
  link = '',
  customStyle
}: Props): React.ReactElement => {
  return (
    <Box sx={{ ...reportSummary, ...customStyle }}>
      <Typography sx={{ ...primaryTitle }}>{title}</Typography>
      <ChartFilters filter={filter} />
      {children}
      <ReportLink link={link} />
    </Box>
  );
};
