'use client';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormTextInput, CheckboxInput } from '@/components/TextFields';
import { ModalHeader } from './ModalHeader';
import { ModalContainer as ModalContainerStyle } from './styles';

type Props = {
  title: string;
  children: any;
};

export const ModalContainer = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            color: 'red',
          },
        }}
        sx={{
          backgroundColor: '#00425F',
          opacity: 0.7,
        }}
      >
        <Fade in={open}>
          <Box sx={ModalContainerStyle}>
            <ModalHeader title={props.title} />
            <Box sx={{}}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                <Grid item md={6}>
                  <FormTextInput
                    placeholder="002789765"
                    label="Staff Id"
                    required
                  />{' '}
                </Grid>
                {/* <Box> */}
                  <Grid item md={6}>
                    <CheckboxInput label='Does this staff supervise others?' />
                  </Grid>
                  <Grid item md={6}>
                    <CheckboxInput label='Can this staff print statements?' />
                  </Grid>
                {/* </Box> */}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
