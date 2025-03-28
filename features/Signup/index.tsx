'use client';

import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Wizard from './Wizard';
import SignupForm from './SignupForm';

export const Signup = () => {
  const defaultStep = 2;
  const [step, setStep] = useState<number>(defaultStep);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Wizard step={step} />
      <SignupForm step={step} setStep={setStep} />
    </Stack>
  );
};
