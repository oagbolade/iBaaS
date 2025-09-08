import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { FilterSection } from './FilterSection';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/react-query/constants';
import { FormSkeleton } from '@/components/Loaders';

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

    const queryClient = useQueryClient();

   const isFetching = useIsFetching({
    queryKey: [queryKeys.filterGroupSearch]
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.filterGroupSearch]
    });
  };

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
               {isFetching ? (
              <FormSkeleton noOfLoaders={3} />
          ) : (
            <IconButton onClick={handleRefresh}>
              <ReplayOutlinedIcon
                sx={{ color: colors.activeBlue400, marginLeft: '8px' }}
              />
            </IconButton>
          )}
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
