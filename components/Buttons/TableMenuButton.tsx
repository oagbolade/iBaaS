import React from 'react';
import Box from '@mui/material/Box';
import { CustomStyleI } from '@/constants/types';
import colors from '@/assets/colors';

type Props = {
  buttonTitle: string;
  disabled?: boolean;
  icon?: any;
  customStyle?: CustomStyleI;
};

const disableEditStyle = {
  color: `${colors.disabledColor}`,
  cursor: 'not-allowed'
};

export const TableMenuButton = ({ buttonTitle, icon, customStyle, disabled }: Props) => {
  return (
    <Box
      sx={{
        padding: '10px',
        borderBottom: `1px solid ${colors.disabledColor}`,
        minWidth: '146px',
        ...customStyle,
        ...(disabled && disableEditStyle)}}
    >
      {icon}
      {buttonTitle}
    </Box>
  );
};
