'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WestIcon from '@mui/icons-material/West';
import { stepperContainer, stepTitle } from './styles';
import { CheckMarkIcon } from '@/assets/svg';
import { TableTitle as FormTitle, StepperLabel } from '@/components/Typography';
import { demandDepositSteps } from '@/constants/Steps';
import colors from '@/assets/colors';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  stepperTitle?: string;
  step: number | 1;
  stepMapper?: object;
};

export const StepperContainer = ({ stepperTitle, stepMapper, step }: Props) => {
  const { isDesktop, setDirection } =
    useCurrentBreakpoint();

  const direction = {
    mobileDirection: 'column',
    tabletDirection: 'column',
    desktopDirection: 'row',
  };

  return (
    <Stack
        sx={{
          padding: '25px',
          width: '100%',
          marginTop: '80px',
        }}
        direction={setDirection(direction)}
        justifyContent="center"
        spacing={isDesktop ? 20 : 0}
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
          {isDesktop && (
            <Box sx={stepperContainer}>
              <Typography sx={stepTitle}>Step {step} of 5</Typography>
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
          )}
        </Box>
        <Box>
          <FormTitle title={stepperTitle} styles={{ marginBottom: '30px' }} />
          {!isDesktop && (
            <Box>
              <Typography mb={2} sx={stepTitle}>
                Step {step} of 5
              </Typography>
            </Box>
          )}
          <Box sx={stepperContainer}>
            {(stepMapper as { [key: number]: React.ReactNode })[step]}
          </Box>
        </Box>
      </Stack>
  );
};
