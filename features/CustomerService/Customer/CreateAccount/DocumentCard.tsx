'use client';
import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import colors from '@/assets/colors';
import { labelTypography } from '@/components/Labels/styles';

type DocumentCardProps = {
  documentName: string;
  reqId: number;
  isSubmitted: boolean;
  handleCheck: Function;
};

export const DocumentCard = ({
  documentName,
  reqId,
  isSubmitted,
  handleCheck
}: DocumentCardProps) => {
  return (
    <Box
      mb={2}
      sx={{
        display: 'flex',
        padding: '20px 24px 19px 16px',
        alignItems: 'center',
        gap: '16px',
        borderRadius: '8px',
        border: `1px solid ${colors.neutral300}`,
        width: '630px',
        height: '69px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          mt={1}
          sx={{
            ...labelTypography,
            color: `${colors.neutral800}`,
            maxWidth: '100%',
            height: '20px',
            textWrap: 'wrap'
          }}
        >
          {documentName}
        </Typography>
        <Box>
          <Checkbox checked={isSubmitted} onChange={() => handleCheck(reqId)} />
        </Box>
      </Box>
    </Box>
  );
};
