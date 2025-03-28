import { Typography } from '@mui/material';
import React from 'react';
import { form1paragraph } from './styles';

interface Props {
  text: string;
}

export const SignupFormSubheading = ({ text }: Props) => {
  return <Typography sx={form1paragraph}>{text}</Typography>;
};
