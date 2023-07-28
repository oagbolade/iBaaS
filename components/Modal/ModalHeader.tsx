import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ModalTitle, ModalHeader as ModalHeaderStyle } from './styles';

type Props = {
  title: string;
};

export const ModalHeader = (props: Props) => {
  return (
    <Box sx={ModalHeaderStyle}>
      <Typography sx={ModalTitle}>{props.title}</Typography>
    </Box>
  );
};
