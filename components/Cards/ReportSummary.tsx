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
      <div className="flex items-center justify-between mb-2">
        <Typography sx={{ ...primaryTitle }}>{title}</Typography>
        <ChartFilters filter={filter} />
      </div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: customStyle?.height ?? { xs: '220px', sm: '260px', md: '320px' },
          minHeight: '160px',
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
      {/* Commented for future update */}
      {/* <ReportLink link={link} /> */}
    </Box>
  );
};
