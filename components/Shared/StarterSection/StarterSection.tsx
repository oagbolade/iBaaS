'use client';
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/components/Typography';
import {
  branchButtonAdd,
  branchContainer,
  branchButton,
  branchTitle,
  StackContainer,
} from './style';

import { PrimaryIconButton } from '@/components/Buttons';
import { handleRedirect } from '@/utils';
import { SetupContext } from '@/features/Setup/SetupContext';

type Props = {
  title: string;
  buttonTitle: string;
  isSetup?: boolean | undefined;
  redirectLink?: string | undefined;
};

export const StarterSection = (props: Props) => {
  const { toggleSetupModal } = useContext(SetupContext);
  const router = useRouter();
  const isEditing = false;

  return (
    <Box sx={branchContainer}>
      <Stack direction="column" sx={StackContainer}>
        <Box>
          <PageTitle title={props.title} styles={branchTitle} />
        </Box>
        <Box>
          <PrimaryIconButton
             onClick={() => {
              if (props.isSetup) return toggleSetupModal(isEditing);
              handleRedirect(router, props.redirectLink);
            }}
            type="submit"
            buttonTitle={props.buttonTitle}
            customStyle={branchButtonAdd}
          />
        </Box>
      </Stack>
    </Box>
  );
};
