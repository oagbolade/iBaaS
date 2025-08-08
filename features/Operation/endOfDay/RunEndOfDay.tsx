'use client';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { string } from 'yup';
import {
  automaticContainer,
  numberOfDays,
  runEndofdayStyle,
  endOfdayTitle,
  timeEndofdayStyle,
  endofDaytitle
} from './style';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import {
  TypographyButton,
  TypographyConfirm,
  ButtonContainer,
  ButtonColorStyle,
  ButtonText,
  CancelButton,
  ConfirmButton,
  AccountPasswordContainer,
  AccountPasswordTitleContainer,
  AccountPasswordTitle,
  AccountTitle,
  AccountPasswordBodyContainer
} from '@/components/Revamp/Modal/style';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { handleRedirect, useCurrentBreakpoint } from '@/utils';
import { RadioButtons2 } from '@/components/Revamp/Radio/RadioButton2';
import { cancelButton } from '@/features/Requests/styles';

type Props = {
  handleClose: Function;
  closeModalQuickly?: Function;
};
export const RunEndOfDayForm = ({ handleClose, closeModalQuickly }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const router = useRouter();
  const [addValues, setAddValues] = useState<String>('');
  const handleChange = (value: string) => {
    setAddValues(value);
  };
  const handleContinue = () => {
    const path = '/operation/createEndofday/';
    router.push(path);
  };
  return (
    <Box sx={AccountPasswordContainer}>
      <Box sx={AccountPasswordTitleContainer}>
        <Box sx={AccountPasswordTitle}>
          <PageTitle title="Run End of Day" styles={{ ...AccountTitle }} />
          <IconButton
            onClick={() => closeModalQuickly?.() || handleClose(null)}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Box sx={AccountPasswordBodyContainer}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <PageTitle
            title="Running end of day will stop all system activities until the process is completed.Are you sure you want to start running End of Day?"
            styles={{ ...endofDaytitle }}
          />
        </Box>
      </Box>
      <Box sx={ButtonContainer}>
        <Box sx={ButtonColorStyle}>
          <Box sx={ButtonText}>
            <Box sx={{ ...CancelButton, background: 'none' }}>
              <PrimaryIconButton
                onClick={() => closeModalQuickly?.() || handleClose(null)}
                buttonTitle="Cancel"
                customStyle={{
                  ...TypographyButton,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  padding: { mobile: '0 50px' }
                }}
              />
            </Box>
            <Box sx={{ ...ConfirmButton, background: 'none' }}>
              <PrimaryIconButton
                buttonTitle="Continue"
                customStyle={{
                  ...TypographyConfirm,
                  backgroundColor: `${colors.activeBlue400}`,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  borderRadius: '6px',
                  padding: { mobile: '8px 50px', desktop: '16px 78px' },
                  marginRight: { mobile: '70px', desktop: 0 }
                }}
                onClick={handleContinue}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
