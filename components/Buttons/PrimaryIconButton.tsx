import React from 'react';
import Button from '@mui/material/Button';
import { buttonTypography } from './styles';
import colors from '@/assets/colors';

type Props = {
  buttonTitle?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  onClick?: () => void | undefined | number;
  customStyle?: any | undefined;
};

export const PrimaryIconButton = ({
  buttonTitle,
  icon,
  customStyle,
  onClick,
  type,
}: Props) => {
  return (
    <Button
      id="button"
      type={type}
      onClick={() => {return onClick?.();}}
      sx={{ buttonTypography, ...customStyle }}
      style={{
        backgroundColor:
          customStyle?.backgroundColor || `${colors.activeBlue400}`,
      }}
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
    variant: 'contained',
  },
};
