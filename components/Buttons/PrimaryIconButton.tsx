import React from 'react';
import { Button, Stack } from '@mui/material';
import { buttonTypography } from './styles';
import colors from '@/assets/colors';
import { ButtonLoader } from '@/assets/images';

type Props = {
  buttonTitle?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  onClick?: (event?: any) => void | undefined | number | Promise<void>;
  customStyle?: any | undefined;
  isLoading?: boolean;
  disabled?: boolean;
};

export const disabledButtonStyle = {
  backgroundColor: `${colors.disabledColor}`,
  color: 'white',
  cursor: 'not-allowed'
};

export const PrimaryIconButton = ({
  buttonTitle,
  icon,
  customStyle = {
    variant: 'contained'
  },
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false
}: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Button
        datatest-id={buttonTitle} 
        id="button"
        type={type}
        onClick={() => onClick?.()}
        sx={{ ...buttonTypography, ...customStyle }}
        style={{
          backgroundColor:
            customStyle?.backgroundColor || `${colors.activeBlue400}`,
          ...(disabled && disabledButtonStyle)
        }}
        variant={customStyle?.variant}
        startIcon={icon}
        disabled={disabled}
      >
        {buttonTitle}
      </Button>
      {isLoading && <ButtonLoader />}
    </Stack>
  );
};
