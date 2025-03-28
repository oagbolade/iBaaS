'use client';
import { useContext } from 'react';
import { AlertColor } from '@mui/material';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';

export const useToastMessage = () => {
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);
  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  return {
    toast
  };
};
