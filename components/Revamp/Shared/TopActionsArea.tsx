import React, { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { BackButton } from '@/components/Revamp/Buttons';
import { CustomStyleI } from '@/constants/types';

type Props = {
  actionButtons?: Array<ReactNode>;
  customStyle?: CustomStyleI;
  showBackButon?: boolean;
};

export const TopActionsArea = ({
  actionButtons,
  customStyle,
  showBackButon = true,
}: Props) => {
  return (
    <Stack
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: '#fff',
        borderBottom: '1px solid #E8E8E8',
        padding: '8px 12px',
        marginTop: '60px',
        ...customStyle,
      }}
      direction="row"
      justifyContent={{ mobile: 'space-between', tablet: 'space-between' }}
      alignItems="center"
      spacing={{ tablet: 2 }}
    >
      {showBackButon ? <BackButton /> : <Box />}
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
