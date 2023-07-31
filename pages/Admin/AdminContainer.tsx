'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { MainSection, SearchSection } from '@/components/Shared';
import { MuiTableContainer } from '@/components/Table';
import { ModalContainer } from '@/components/Modal/index';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput, CheckboxInput, FormSelectInput } from '@/components/TextFields';
import { PageTitle } from '@/components/Typography';
import { AdminContextProvider } from './AdminContext';

type Props = {
  title: string;
  modalTitle?: string;
  buttonTitle: string;
  tableTitle: string;
  searchTitle: string;
};

const ModalForm = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormTextInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        <Grid item md={6}>
          <FormSelectInput placeholder="002789765" label="Staff Id" required />{' '}
        </Grid>
        {/* Checkboxes */}
        <Grid item md={6}>
          <CheckboxInput label="Does this staff supervise others?" />
        </Grid>
        <Grid item md={6}>
          <CheckboxInput label="Can this staff print statements?" />
        </Grid>
        {/* Checkboxes */}

        <Grid container mt={9} ml={2}>
          {/* Button */}
          <Grid item md={3}>
            <PrimaryIconButton
              buttonTitle="Back"
              customStyle={ModalBackButton}
            />
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
              buttonTitle="Save Changes"
              customStyle={ModalSaveButton}
            />
          </Grid>
          {/* Button */}
        </Grid>
      </Grid>
    </Box>
  );
};

export const AdminContainer = (props: Props) => {
  return (
    <AdminContextProvider>
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <MainSection title={props.title} buttonTitle={props.buttonTitle} />
        <SearchSection
          tableTitle={props.tableTitle}
          searchTitle={props.searchTitle}
        />
        <MuiTableContainer columns={[]} />
        <ModalContainer form={<ModalForm />} title={props.modalTitle} />
      </Box>
    </AdminContextProvider>
  );
};
