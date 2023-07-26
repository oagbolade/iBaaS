import React from 'react';
import Button from '@mui/material/Button';
import colors from '@/assets/colors';
import { buttonTypography } from './styles';

type Props = {
  buttonTitle: string;
  icon: any;
};

export const PrimaryIconButton = ({ buttonTitle, icon }: Props) => {
  return (
    <Button
      sx={buttonTypography}
      style={{ backgroundColor: `${colors.activeBlue400}` }}
      variant="contained"
      startIcon={icon}
    >
      {buttonTitle}
    </Button>
  );
};
