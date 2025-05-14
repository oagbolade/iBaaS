import React from 'react';
import { Box } from '@mui/material';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';

type Props = {
  content?: string;
  title?: string;
};

export const MiniCard = ({ title, content }: Props) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title={title || ''} />
      <Details title={content || ''} />
    </Box>
  );
};
