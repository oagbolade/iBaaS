'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WestIcon from '@mui/icons-material/West';
import { CheckMarkIcon } from '@/assets/svg';
import { TableTitle as FormTitle, StepperLabel } from '@/components/Typography';
import { demandDepositSteps } from '@/constants/Steps';
import colors from '@/assets/colors';
import { stepperContainer, stepTitle } from './styles';

type Props = {
  stepperTitle?: string;
  step: number | 1;
  stepMapper?: object;
};

export const StepperContainer = ({ stepperTitle, stepMapper, step }: Props) => {
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
