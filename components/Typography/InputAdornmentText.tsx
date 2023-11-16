import React from 'react';
import Typography from '@mui/material/Typography';
import { inputAdornment } from './styles';

type Props = {
  children: React.ReactNode;
};

export const InputAdornmentText = ({ children }: Props) => {
  return <Typography sx={inputAdornment}>{children}</Typography>;
};
