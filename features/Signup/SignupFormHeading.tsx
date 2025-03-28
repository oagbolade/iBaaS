import { Typography } from '@mui/material';
import React from 'react';
import { form1heading } from './styles';

interface Props {
  text: string;
}

export const SignupFormHeading = ({ text }: Props) => {
  return <Typography sx={form1heading}>{text}</Typography>;
};
