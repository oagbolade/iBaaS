import React from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const SignupForm = ({ step, setStep }: Props) => {
  if (step === 1) {
    return <StepOne step={step} setStep={setStep} />;
  }

  return <StepTwo setStep={setStep} />;
};

export default SignupForm;
