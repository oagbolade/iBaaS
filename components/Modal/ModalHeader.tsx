import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ModalTitle, ModalHeader as ModalHeaderStyle } from './styles';

type Props = {
  title: string | undefined;
};

export const ModalHeader = ({ title }: Props) => {
  return (
    <Box sx={ModalHeaderStyle}>
      <Typography sx={ModalTitle}>{title}</Typography>
    </Box>
  );
};
