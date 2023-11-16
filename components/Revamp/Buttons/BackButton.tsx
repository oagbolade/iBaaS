import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Stack } from '@mui/material';
import { BackIcon } from '@/assets/svg';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        return router.back();
      }}
    >
      <Stack direction="row">
        <BackIcon />
        <Typography mt={0.4} ml={1}>
          Back
        </Typography>
      </Stack>
    </button>
  );
};
