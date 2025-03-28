'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton
} from '@/components/Modal/styles';
import { PageTitle } from '@/components/Typography';

type Props = {
  setStep?: (isNext: boolean) => void;
  isFormOne?: boolean | undefined;
  BackButtonTitle?: string;
  SaveButtonTitle?: string;
  StyleBack?: any | undefined;
};

export const ModalActions = ({
  setStep,
  BackButtonTitle,
  SaveButtonTitle,
  StyleBack,
  isFormOne = false
}: Props) => {
  return (
    <Grid justifyContent="center" container mt={9} ml={2}>
      <Grid item mobile={4} desktop={3}>
        {!isFormOne && (
          <PrimaryIconButton
            onClick={() => {
              return setStep?.(false);
            }}
            buttonTitle={BackButtonTitle}
            customStyle={{ ModalBackButton, ...StyleBack }}
          />
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        item
        mobile={2}
        desktop={6}
      >
        <Button variant="text">
          <PageTitle title="Reset" styles={ResetButton} />
        </Button>
      </Grid>
      <Grid
        sx={{ display: { mobile: 'flex' }, justifyContent: 'flex-end' }}
        item
        mobile={4}
        desktop={3}
      >
        <PrimaryIconButton
          // type="submit" to do handle submit together with setStep
          onClick={() => {
            return setStep?.(true);
          }}
          buttonTitle={SaveButtonTitle}
          customStyle={ModalSaveButton}
        />
      </Grid>
    </Grid>
  );
};
