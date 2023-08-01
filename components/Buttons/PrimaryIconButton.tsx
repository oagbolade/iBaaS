import React from 'react';
import Button from '@mui/material/Button';
import colors from '@/assets/colors';
import { buttonTypography } from './styles';

interface ButtonStyles {
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  height?: string | undefined;
  width?: string | undefined;
  color?: string | undefined;
  backgroundColor?: string | undefined;
  borderRadius?: string | undefined;
  border?: string | undefined;
  variant?: 'contained' | 'outlined' | undefined;
};

type Props = {
  buttonTitle: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  onClick?: () => void | undefined;
  customStyle?: ButtonStyles | undefined;
};

export const PrimaryIconButton = ({ buttonTitle, icon, customStyle, onClick, type }: Props) => {
  return (
    <Button
      type={type}
      onClick = { () => onClick?.() }
      sx={{ buttonTypography, ...customStyle }}
      style={{ backgroundColor: customStyle?.backgroundColor || `${colors.activeBlue400}` }}
      variant={customStyle?.variant}
      startIcon={icon}
    >
      {buttonTitle}
    </Button>
  );
};

PrimaryIconButton.defaultProps = {
  type: 'button',
  customStyle: {
    variant: 'contained'
  }
}
