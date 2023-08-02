import React from 'react';
import Typography from '@mui/material/Typography';
import { NavTitleStyle } from './styles';

type Props = {
  buttonTitle: string;
};

export default function NavBarButton({ buttonTitle }: Props) {
  return <Typography sx={NavTitleStyle}>{buttonTitle}</Typography>;
}
