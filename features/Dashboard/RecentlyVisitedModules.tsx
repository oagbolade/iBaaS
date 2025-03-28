'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { recetntModulesTypography, recetntModulesCard } from './styles';
import { TableSingleAction } from '@/components/Table';
import { primaryTitle } from '@/components/Confirmation/styles';
import { TrackRecentlyVisitedModulesContext } from '@/context/TrackRecentlyVisitedModulesContext';
import { IRecentlyVisited } from '@/utils/user-storage';
import colors from '@/assets/colors';

export const RecentlyVisitedModules = () => {
  const { recentlyVisited } = useContext(TrackRecentlyVisitedModulesContext);

  return (
    <Box sx={recetntModulesCard}>
      <Box
        sx={{
          borderBottom: `1px solid ${colors.neutral300}`,
          padding: '0 0 15px'
        }}
      >
        <Typography sx={primaryTitle}>Recently Visited Modules</Typography>
      </Box>

      {recentlyVisited.slice(0, 6).map((module: IRecentlyVisited) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            borderBottom: `1px solid ${colors.neutral300}`,
            padding: '15px 0 15px'
          }}
        >
          <Box>
            <Typography sx={recetntModulesTypography}>
              {module.moduleName}
            </Typography>
          </Box>
          <Box>
            <Link href={module.moduleLink}>
              <TableSingleAction actionName="View" />
            </Link>{' '}
          </Box>
        </Stack>
      ))}

      {recentlyVisited.length === 0 && (
        <Box sx={{ padding: '15px 0 15px' }}>
          <Typography sx={recetntModulesTypography}>
            No modules visited today!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
