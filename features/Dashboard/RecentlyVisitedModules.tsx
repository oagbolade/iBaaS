'use client';
import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { recetntModulesTypography, recetntModulesCard } from './styles';
import { TableSingleAction } from '@/components/Table';
import { primaryTitle } from '@/components/Confirmation/styles';

export const RecentlyVisitedModules = () => {
  return (
    <Box sx={recetntModulesCard}>
      <Box
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '0 0 15px',
        }}
      >
        <Typography sx={primaryTitle}>Recently Visited Modules</Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '15px 0 15px',
        }}
      >
        <Box>
          <Typography sx={recetntModulesTypography}>Loan Management</Typography>
        </Box>
        <Box>
          <Link href="/">
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '15px 0 15px',
        }}
      >
        <Box>
          <Typography sx={recetntModulesTypography}>Requests</Typography>
        </Box>
        <Box>
          <Link href="/">
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '15px 0 15px',
        }}
      >
        <Box>
          <Typography sx={recetntModulesTypography}>Operations</Typography>
        </Box>
        <Box>
          <Link href="/">
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '15px 0 15px',
        }}
      >
        <Box>
          <Typography sx={recetntModulesTypography}>
            Customer Service
          </Typography>
        </Box>
        <Box>
          <Link href="/">
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid var(--colour-neutral-neutral300, #E1E6ED)',
          padding: '15px 0 15px',
        }}
      >
        <Box>
          <Typography sx={recetntModulesTypography}>
            Vault Management
          </Typography>
        </Box>
        <Box>
          <Link href="/">
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </Box>
      </Stack>
    </Box>
  );
};
