'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useCallback
} from 'react';
import { AlertColor } from '@mui/material/Alert';

const initialSnackbarContext = {
  open: false,
  message: '',
  severity: 'success' as AlertColor,
  toggleSnackbar: () => {},
  setMessage: (() => {}) as Dispatch<SetStateAction<string>>,
  setSeverity: (() => {}) as Dispatch<SetStateAction<AlertColor>>
};

type MuiSnackbarContextType = {
  open: boolean;
  message: string;
  severity: AlertColor;
  toggleSnackbar: () => void;
  setMessage: Dispatch<SetStateAction<string>>;
  setSeverity: Dispatch<SetStateAction<AlertColor>>;
};

export const MuiSnackbarContext = createContext<MuiSnackbarContextType>(
  initialSnackbarContext
);

export default function MuiSnackbarContextProvider({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const toggleSnackbar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const value: MuiSnackbarContextType = useMemo(() => {
    return { open, message, severity, toggleSnackbar, setMessage, setSeverity };
  }, [toggleSnackbar, open]);

  return (
    <MuiSnackbarContext.Provider value={value}>
      {children}
    </MuiSnackbarContext.Provider>
  );
}
