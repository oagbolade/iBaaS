import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { FilterSection } from './FilterSection';
import colors from '@/assets/colors';

type Props = {
  mainTitle?: string;
  secondaryTitle?: string;
};

export const CustomTableHeader = ({ mainTitle, secondaryTitle }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '20px 24px 19px 16px',
        alignItems: 'flex-start',
        gap: '16px',
        alignSelf: 'stretch',
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography
            sx={{ fontSize: '20px', lineHeight: '32px', fontWeight: 700 }}
          >
            {mainTitle}
            <ReplayOutlinedIcon
              sx={{ color: `${colors.activeBlue400}`, marginLeft: '15px' }}
            />
          </Typography>
          <Typography
            sx={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}
          >
            {secondaryTitle}
          </Typography>
        </Box>
        <Box
          sx={{ width: '600px', display: 'flex', justifyContent: 'flex-end' }}
        >
          <FilterSection />
        </Box>
      </Stack>
    </Box>
  );
};
