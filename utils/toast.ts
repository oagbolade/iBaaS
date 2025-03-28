import { AlertColor } from '@mui/material';
import { IToastActions } from '@/constants/types';

export const toast = (
  message: string,
  title: string,
  severity: AlertColor,
  toastActions: IToastActions
) => {
  toastActions.toggleSnackbar();
  toastActions.setMessage(message);
  toastActions.setTitle(title);
  toastActions.setSeverity(severity);
};
