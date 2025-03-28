import React from 'react';
import Button from '@mui/material/Button';
import { actionButtonTypography } from './styles';
import colors from '@/assets/colors';
import { CustomStyleI } from '@/constants/types';

type Props = {
  buttonTitle?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  iconPosition?: 'end' | 'start';
  onClick?: () => void | undefined | number;
  customStyle?: CustomStyleI;
  disabled?: boolean;
};

export const disabledLightButtonStyle = {
  backgroundColor: 'lightGrey',
  cursor: 'not-allowed',
};

export const ActionButton = ({
  buttonTitle,
  icon,
  iconPosition,
  customStyle,
  onClick,
  type,
  disabled
}: Props) => {
  return (
    <Button
      data-testid="action-button"
      id="action-button"
      type={type}
      onClick={() => {
        return onClick?.();
      }}
      sx={{ ...actionButtonTypography, ...customStyle }}
      style={{
        backgroundColor:
          customStyle?.backgroundColor || `${colors.primaryBlue100}`,
        border: customStyle?.border || `1px solid ${colors.primaryBlue500}`,
        ...(disabled && disabledLightButtonStyle)
      }}
      variant={customStyle?.variant}
      startIcon={iconPosition === 'start' && icon}
      endIcon={iconPosition === 'end' && icon}
    >
      {buttonTitle}
    </Button>
  );
};
