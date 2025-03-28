'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
  wizardBoxStyle,
  wizardheadingtext,
  wizardSubheadingtext,
  container,
  textBox1,
  mainContainer
} from './styles';
import { SignupSideFooter } from './SignupSideFooter';
import WhiteInterswitchLogo from '@/assets/interswitch/WhiteInterswitchLogo';
import { SignUpStepOneIcon, SignUpStepTwoIcon } from '@/assets/svg';

interface Props {
  step: number;
}

const Wizard = ({ step }: Props) => {
  return (
    <Stack flex={1.5} sx={wizardBoxStyle} justifyContent="space-between">
      <Box sx={mainContainer}>
        <WhiteInterswitchLogo />
        <Box sx={container}>
          {step === 1 ? <SignUpStepOneIcon /> : <SignUpStepTwoIcon />}
          <Box>
            <Box sx={textBox1}>
              <Typography sx={wizardheadingtext}>
                Your Organisation Details
              </Typography>
              <Typography sx={wizardSubheadingtext}>
                Tell us about your organisation
              </Typography>
            </Box>
            <Box sx={textBox1}>
              <Typography sx={wizardheadingtext}>
                Theme your Application
              </Typography>
              <Typography sx={wizardSubheadingtext}>
                Theme your application to fit your company
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <SignupSideFooter />
    </Stack>
  );
};

export default Wizard;
