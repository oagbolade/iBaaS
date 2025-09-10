import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { FilterSection } from './FilterSection';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useInvalidateQueries } from '@/utils/hooks/useInvalidateQueries';

type Props = {
  mainTitle?: string;
  secondaryTitle?: string;
  hideFilterSection?: boolean;
};

export const CustomTableHeader = ({
  mainTitle,
  secondaryTitle,
  hideFilterSection = false
}: Props) => {
  const { setDirection } = useSetDirection();
  const { invalidateQueries } = useInvalidateQueries();

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '20px 24px 19px 16px'
      }}
    >
      <Stack
        sx={{ width: '100%' }}
        direction={setDirection()}
        justifyContent={{ mobile: 'flex-start', desktop: 'space-between' }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{ fontSize: '20px', lineHeight: '32px', fontWeight: 700 }}
          >
            {mainTitle}
            <ReplayOutlinedIcon
              onClick={() => invalidateQueries()}
              sx={{
                color: `${colors.activeBlue400}`,
                marginLeft: '15px',
                cursor: 'pointer'
              }}
            />
          </Typography>
          <Typography
            sx={{
              fontSize: { mobile: '12px', desktop: '16px' },
              lineHeight: '24px',
              fontWeight: 400
            }}
          >
            {secondaryTitle}
          </Typography>
        </Box>
        {!hideFilterSection && (
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <FilterSection />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
