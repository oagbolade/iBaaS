'use client';
import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import {
  modalBody,
  modalBodyContainer,
  modalContainer,
  modalTitle,
  modalTitleContainer,
  modalTitleStyle,
  modalTyopgraphy,
  text,
  textField,
  textSuccess,
  textTypography,
} from './style';
import { TableSingleAction } from '@/components/Table';

export const ViewAuditLog = () => {
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Button sx={{ marginLeft: '190px' }} onClick={toggleModal}>
          <TableSingleAction actionName="View" />
        </Button>
        <Modal open={open} onClose={toggleModal}>
          <Box sx={modalContainer}>
            <Box sx={modalTitleContainer}>
              <Box sx={modalTitle}>
                <Box sx={modalTitleStyle}>
                  <Typography sx={modalTyopgraphy}>View Audit Log</Typography>
                  <Button onClick={toggleModal}>
                    <Close />
                  </Button>
                </Box>
              </Box>
              <Box sx={modalBodyContainer}>
                <Box sx={modalBody}>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Action</Typography>
                    <Typography sx={textField}>User Login</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Action Taken By</Typography>
                    <Typography sx={textField}>
                      ID - 493994 . Tamarabibi Adams
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Old Data</Typography>
                    <Typography sx={textField}>
                      iswadmin4445thTHIS GOOD
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>New Data</Typography>
                    <Typography sx={textSuccess}>Successful</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Timestamp</Typography>
                    <Typography sx={textField}>Nov 24, 2023. 8:00am</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Affected Table</Typography>
                    <Typography sx={textField}>tbl_Login</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Menu</Typography>
                    <Typography sx={textField}>User Login</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Procedure Called</Typography>
                    <Typography sx={textField}>Proc_Validation</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>IP Address</Typography>
                    <Typography sx={textField}>69.247.238.50</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
