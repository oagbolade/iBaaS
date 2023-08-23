import * as React from 'react';
import Grid from '@mui/material/Grid';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import Button from '@mui/material/Button';
import { PageTitle } from '@/components/Typography';

export const ModalActions = () => {
  return (
    <Grid container mt={9} ml={2}>
      <Grid item md={3}>
        <PrimaryIconButton buttonTitle="Back" customStyle={ModalBackButton} />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        item
        md={6}
      >
        <Button variant="text">
          <PageTitle title="Reset" styles={ResetButton} />
        </Button>
      </Grid>
      <Grid item md={3}>
        <PrimaryIconButton
          type="submit"
          buttonTitle="Save Changes"
          customStyle={ModalSaveButton}
        />
      </Grid>
    </Grid>
  );
};
