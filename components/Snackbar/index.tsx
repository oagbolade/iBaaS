'use client';
import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MuiSnackbar = () => {
  const { open, toggleSnackbar, severity, message } =
    useContext(MuiSnackbarContext);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={toggleSnackbar}>
      <Alert
        onClose={() => toggleSnackbar()}
        severity={severity as AlertColor}
        sx={{ width: '40%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
