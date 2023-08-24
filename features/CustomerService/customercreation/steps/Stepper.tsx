'use client';
import React, { useState } from 'react';
import { StepperContainer } from '@/components/Shared/Stepper';
import {
  FormOne,
  FormTwo,
  FormThree,
  FormFour,
  FormFive,
} from '@/features/Setup/Forms/CreateDemandDeposit';
import { demandDepositSteps } from '@/constants/Steps';

export const Stepper = () => {
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
    <StepperContainer
      stepMapper={stepMapper}
      step={step}
      stepperTitle="Create Treasury Product"
    />
  );
};
