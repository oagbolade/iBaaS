'use client';
import React, { useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ToastText,
  ToastStyle,
  ToastContainers,
  Toasts,
  ToastTitleContainer,
  textFieldStyle
} from './style';
import { PageTitle } from '@/components/Typography';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import colors from '@/assets/colors';

type Props = {
  title?: string;
  body?: string;
  alertType?: 'success' | 'error' | 'warning';
};

export const ToastMessage = ({ body, title, alertType = 'success' }: Props) => {
  const {
    open,
    toggleSnackbar,
    severity,
    message,
    title: contextTitle
  } = useContext(ToastMessageContext);
  
  const env = process.env.NODE_ENV || 'production';

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        toggleSnackbar();
      }, env === 'development' ? 2000 : 7000);
    }
  }, [open]);

  return (
    <Box>
      {open && (
        <Box
          sx={{
            ...Toasts,
            backgroundColor: `${
              severity === 'error'
                ? colors.activeYellow100
                : colors.activeGreen100
            }`,
            border: `${
              severity === 'error'
                ? colors.activeYellow400
                : colors.activeGreen200
            }`
          }}
        >
          <Box
            sx={{
              ...ToastContainers,
              backgroundColor: `${
                severity === 'error'
                  ? colors.activeYellow400
                  : colors.activeGreen400
              }`
            }}
          />
          <Box sx={ToastTitleContainer}>
            <Box sx={ToastStyle}>
              <PageTitle
                title={contextTitle || title}
                styles={{
                  ...textFieldStyle,
                  color: `${
                    severity === 'error'
                      ? colors.activeYellow600
                      : colors.activeGreen600
                  }`
                }}
              />
            </Box>
            <Box sx={ToastStyle}>
              <Typography
                pb={1}
                sx={{
                  ...ToastText,
                  color: `${
                    severity === 'error'
                      ? colors.activeYellow600
                      : colors.activeGreen600
                  }`
                }}
              >
                {message || body}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
