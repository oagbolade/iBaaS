'use client';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ProgressBar } from '@/components/ProgressBar';
import { stepTitle, formContainer } from './styles';
import { BusinessMainSection } from './BusinessMainSection';
import { FormOne, FormTwo } from '@/features/Setup/BusinessSetup/Forms';

export const BusinessSetup = () => {
  const [step, setStep] = useState<number>(1);
  const maxSteps = 2;
  const progress = step === 1 ? 50 : 100;

  const handleSetStep = (isNext: boolean) => {
    if (!isNext && step === 1) return;
    if (isNext && step === maxSteps) return;
    if (isNext) return setStep(step + 1);
    setStep(step - 1);
  };

  const stepMapper = {
    '1': <FormOne setStep={handleSetStep} />,
    '2': <FormTwo setStep={handleSetStep} />,
  };

  return (
    <Box sx={{ width: '100%', marginTop: '80px' }}>
      <ProgressBar progress={progress} />
      <Typography sx={stepTitle}>Step {step}/2</Typography>
      <BusinessMainSection />
      <Box sx={formContainer}>
        {(stepMapper as { [key: number]: React.ReactNode })[step]}
      </Box>
    </Box>
  );
};
