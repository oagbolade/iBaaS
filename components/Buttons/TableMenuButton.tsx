import React from 'react';
import Box from '@mui/material/Box';
import { CustomStyleI } from '@/constants/types';

type Props = {
  buttonTitle: string;
  icon?: any;
  customStyle?: CustomStyleI;
};

export const TableMenuButton = ({ buttonTitle, icon, customStyle }: Props) => {
  return (
    <Box
      sx={{
        padding: '10px',
        borderBottom: '1px solid #DCE0E6',
        minWidth: '146px',
        ...customStyle,
      }}
    >
      {icon}
      {buttonTitle}
    </Box>
  );
};
