import React from 'react';
import Link from 'next/link';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { miniCardContainer } from './styles';
import { greetingStyle } from '@/components/NavBar/styles';
import colors from '@/assets/colors';

type Props = {
  reportName: string;
  link: string;
};

export const MiniCard = ({ reportName, link }: Props) => {
  return (
    <Grid item tablet={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={miniCardContainer}
      >
        <Box>
          <Typography sx={{ ...greetingStyle, fontWeight: 600 }}>
            {reportName}
          </Typography>
        </Box>
        <Link href={link}>
          <Typography
            sx={{
              display: 'flex',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '18px',
              alignItems: 'center',
              width: '64px',
              height: '40px',
              color: `${colors.primaryBlue500}`,
              borderRadius: '6px',
              padding: '16px',
              backgroundColor: `${colors.primaryBlue100}`
            }}
          >
            View
          </Typography>
        </Link>
      </Stack>
    </Grid>
  );
};
