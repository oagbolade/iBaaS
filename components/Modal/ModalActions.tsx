import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { PageTitle } from '@/components/Typography';
import { useCurrentBreakpoint } from '@/utils';

export const ModalActions = () => {
  const { isMobile } = useCurrentBreakpoint();

  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
  };
  return (
    <Grid container mt={5} ml={4}>
      <Grid item tablet={3}>
        <PrimaryIconButton buttonTitle="Back" customStyle={ModalBackButton} />
      </Grid>
      <Grid
        container
        direction={setDirction()}
        justifyContent="center"
        item
        tablet={6}
      >
        <Grid item mobile={12} desktop={6}>
          <Button variant="text">
            <PageTitle title="Reset" styles={ResetButton} />
          </Button>
        </Grid>
      </Grid>
      <Grid item tablet={3}>
        <PrimaryIconButton
          type="submit"
          buttonTitle="Save Changes"
          customStyle={ModalSaveButton}
        />
      </Grid>
    </Grid>
  );
};
