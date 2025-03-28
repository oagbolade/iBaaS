import React from 'react';
import Button from '@mui/material/Button';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton
} from '@/components/Modal/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';

import {
  ButtonApprove,
  ButtonApproveTitle,
  ButtonContainer,
  ButtonDeposit,
  ButtonReset
} from './style';

type Props = {
  title: string;
  buttonTitle: string;
  bttonTitles: string;
};

export const ButtonForms = (props: Props) => {
  return (
    <Grid container mt={9} ml={2}>
      {/* Button */}
      <Box sx={ButtonContainer}>
        <Box sx={{ marginRight: '10px' }}>
          <Grid item mobile={3}>
            <PrimaryIconButton
              buttonTitle={props.bttonTitles}
              customStyle={{ ...ModalBackButton, ...ButtonReset }}
            />
          </Grid>
        </Box>
        <Box>
          <Grid item mobile={3}>
            <PrimaryIconButton
              type="submit"
              buttonTitle={props.buttonTitle}
              customStyle={{ ...ModalSaveButton, ...ButtonDeposit }}
            />
          </Grid>
        </Box>
        <Box sx={ButtonApprove}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            mobile={6}
          >
            <Button variant="text">
              <Box sx={ButtonApproveTitle}>
                <PageTitle
                  title={props.title}
                  styles={{ ...ResetButton, ...ButtonApproveTitle }}
                />
              </Box>
            </Button>
          </Grid>
        </Box>
      </Box>

      {/* Button */}
    </Grid>
  );
};
