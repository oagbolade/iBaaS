import React from 'react';
import { Typography } from '@mui/material';
import colors from '@/assets/colors';

const styles = {
  color: `${colors.activeBlue400}`,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  cursor: 'pointer'
};

type Props = {
  actionName: string;
};

export const TableSingleAction = ({ actionName }: Props) => {
  return <Typography sx={{ ...styles }}>{actionName}</Typography>;
};
