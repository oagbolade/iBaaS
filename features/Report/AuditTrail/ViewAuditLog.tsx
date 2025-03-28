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
  textTypography
} from './style';
import { TableSingleAction } from '@/components/Table';
import { IAuditTrail } from '@/api/ResponseTypes/reports';

export const ViewAuditLog = ({ auditReport }: { auditReport: IAuditTrail }) => {
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Button onClick={toggleModal}>
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
                    <Typography sx={textField}>
                      {auditReport?.action_performed || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Action Taken By</Typography>
                    <Typography sx={textField}>
                      ID - {auditReport?.action_performed || 'N/A'} .{' '}
                      {auditReport?.userId || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Old Data</Typography>
                    <Typography sx={textField}>
                      {auditReport?.old_data || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>New Data</Typography>
                    <Typography sx={textSuccess}>
                      {auditReport?.new_data || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Timestamp</Typography>
                    <Typography sx={textField}>
                      {auditReport?.createDate || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Affected Table</Typography>
                    <Typography sx={textField}>
                      {auditReport?.tablename || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Menu</Typography>
                    <Typography sx={textField}>
                      {auditReport?.menuname || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Procedure Called</Typography>
                    <Typography sx={textField}>
                      {auditReport?.procedurename || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>IP Address</Typography>
                    <Typography sx={textField}>
                      {auditReport?.id || 'N/A'}
                    </Typography>
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
