'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WestIcon from '@mui/icons-material/West';
import { CheckMarkIcon } from '@/assets/svg';
import { TableTitle as FormTitle, StepperLabel } from '@/components/Typography';
import { demandDepositSteps } from '@/constants/Steps';
import colors from '@/assets/colors';
import { stepperContainer, stepTitle } from './styles';
import {
  FormOne,
  FormTwo,
  FormThree,
  FormFour,
  FormFive,
} from '@/features/Setup/Forms';

type Props = {
  stepperTitle?: string;
  steps?: Array<string>;
  forms?: React.ReactNode;
};

export const StepperContainer = ({ stepperTitle, forms, steps }: Props) => {
  const [step, setStep] = useState<number>(1);

  const handleSetStep = (isNext: boolean) => {
    if (!isNext && step === 1) return;
    if (isNext && step === demandDepositSteps.length) return;
    if (isNext) return setStep(step + 1);
    setStep(step - 1);
  };

  const stepMapper = {
    '1': <FormOne setStep={handleSetStep} />,
    '2': <FormTwo setStep={handleSetStep} />,
    '3': <FormThree setStep={handleSetStep} />,
    '4': <FormFour setStep={handleSetStep} />,
    '5': <FormFive setStep={handleSetStep} />,
  };

  return (
    <>
      <Stack
        sx={{
          padding: '25px',
          width: '100%',
          marginTop: '80px',
        }}
        direction="row"
        justifyContent="center"
        spacing={20}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              marginBottom: '30px',
              color: `${colors.backButtonGrey}`,
            }}
          >
            <WestIcon /> Back
          </Typography>
          <Box sx={stepperContainer}>
            <Typography sx={stepTitle}>Step 1 of 5</Typography>
            {demandDepositSteps.map((steps, index) => {
              const highlightCurrentStep = index + 1 === step;

              return (
                <Box key={index} mt={5}>
                  <Stack direction="row">
                    <CheckMarkIcon
                      color={
                        highlightCurrentStep
                          ? `${colors.activeBlue400}`
                          : `${colors.neutral400}`
                      }
                    />
                    <StepperLabel title={steps} />
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <FormTitle title={stepperTitle} styles={{ marginBottom: '30px' }} />
          <Box sx={stepperContainer}>
            {(stepMapper as { [key: number]: React.ReactNode })[step]}
          </Box>
        </Box>
      </Stack>
    </>
  );
};
