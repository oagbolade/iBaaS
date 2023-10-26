'use client';
import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { modalContainer } from './style';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  ShowPreview?: any;
};

export const MobileModalContainer = ({ ShowPreview }: Props) => {
  const { isMobile } = useCurrentBreakpoint();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {isMobile && (
        <>
          <Box mr={{ mobile: 90 }} ml={{ mobile: 9 }}>
            <Button
              sx={{
                marginBottom: '3700px',
                borderRadius: '6px',
                width: '136px',
                border: '1px solid rgb(48, 115, 153)',
                height: '40px',
                marginTop: '40px',
                alignItems: 'center',
                marginRight: '40px',
              }}
              onClick={handleClick}
            >
              Preview
            </Button>
          </Box>

          <Modal open={open} onClose={handleClose}>
            <Box sx={modalContainer}>{ShowPreview}</Box>
          </Modal>
        </>
      )}
    </Box>
  );
};
