'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react';
import { AlertColor } from '@mui/material/Alert';
import { domain } from '@/utils/hooks/useAuthGuard';

const initialSnackbarContext = {
  open: false,
  message: '',
  title: '',
  severity: 'success' as AlertColor,
  toggleSnackbar: () => {},
  setMessage: (() => {}) as Dispatch<SetStateAction<string>>,
  setTitle: (() => {}) as Dispatch<SetStateAction<string>>,
  setSeverity: (() => {}) as Dispatch<SetStateAction<AlertColor>>
};

type ToastMessageContextType = {
  open: boolean;
  message: string;
  title: string;
  severity: AlertColor | string;
  toggleSnackbar: () => void;
  setMessage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setSeverity: Dispatch<SetStateAction<AlertColor>>;
};

export const ToastMessageContext = createContext<ToastMessageContextType>(
  initialSnackbarContext
);

export default function ToastMessageContextProvider({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    if (title === 'Unauthorised user') {
      setTimeout(() => {
        window.location.href = `${domain}/login?auth=false`;
      }, 3000);
    }
  }, [title]);

  const toggleSnackbar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const value: ToastMessageContextType = useMemo(() => {
    return {
      open,
      message,
      title,
      severity,
      toggleSnackbar,
      setMessage,
      setTitle,
      setSeverity
    };
  }, [toggleSnackbar, open]);

  return (
    <ToastMessageContext.Provider value={value}>
      {children}
    </ToastMessageContext.Provider>
  );
}
