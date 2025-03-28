'use client';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import colors from '@/assets/colors';

export const emptyTableMainTitle = {
  color: `${colors.neutral900}`,
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px'
};

export const emptyTableSecondaryTitle = {
  color: `${colors.neutral800}`,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  width: '289px',
  height: '40px',
  whiteSpace: 'wrap'
};

export const StyledMenu = styled((props: MenuProps) => {
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    />
  );
})(({ theme }) => {
  return {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25) !important',
      color:
        theme.palette.mode === 'light'
          ? 'rgb(55, 65, 81)'
          : theme.palette.grey[300],
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          )
        }
      }
    }
  };
});
