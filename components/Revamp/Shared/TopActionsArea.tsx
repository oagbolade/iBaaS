import React, { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { BackButton } from '@/components/Revamp/Buttons';

type Props = {
  actionButtons?: Array<ReactNode>;
};

export const TopActionsArea = ({ actionButtons }: Props) => {
  return (
    <Stack
      sx={{
        borderBottom: '1px solid #E8E8E8',
        padding: '12px 20px',
        width: { mobile: '100%', tablet: '84.2vw' }, // causing a horizontal overflow, may remove later
        marginTop: '60px',
      }}
      direction="row"
      justifyContent={{ mobile: 'flex-start', tablet: 'space-between' }}
      alignItems="center"
      spacing={{ tablet: 2 }}
    >
      <BackButton />
      <Stack direction="row">
        {actionButtons?.map((buttons, index) => {
          return (
            <Box key={index} mr={1}>
              {buttons}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};
