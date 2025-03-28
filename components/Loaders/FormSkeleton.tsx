import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function FormSkeleton({ noOfLoaders }: { noOfLoaders: number }) {
  const skeletons = Array.from({ length: noOfLoaders }, (_, index) => (
    <Skeleton key={index} variant="rectangular" height={100} />
  ));

  return (
    <Stack
      data-testid="loading-skeleton"
      sx={{ marginTop: '10px' }}
      spacing={2}
    >
      {skeletons}
    </Stack>
  );
}
