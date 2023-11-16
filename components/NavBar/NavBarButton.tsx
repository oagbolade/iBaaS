import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavNameStyle, greetingStyle } from './styles';

type Props = {
  name: string;
  greeting: string;
};

export default function NavBarButton({ greeting, name }: Props) {
  return (
    <Box>
      <Typography sx={greetingStyle}>{greeting}</Typography>
      <Typography sx={NavNameStyle}>{name}</Typography>
    </Box>
  );
}
