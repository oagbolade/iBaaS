import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  ToastText,
  ToastStyle,
  ToastContainers,
  Toasts,
  ToastTitleContainer,
  textFieldStyle,
} from './style';
import { PageTitle } from '@/components/Typography';

type Props = {
  title: string;
  body: string;
};

export const ToastMessage = ({ body, title }: Props) => {
  return (
    <Box sx={Toasts}>
      <Box sx={ToastContainers} />
      <Box sx={ToastTitleContainer}>
        <Box sx={ToastStyle}>
          <PageTitle title={title} styles={{ ...textFieldStyle }} />
        </Box>
        <Box sx={ToastStyle}>
          <Typography pb={1} sx={{ ...ToastText }}>
            {body}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
