'use client';
import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { modalContainer } from './style';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  ShowPreview?: any;
  customStyle?: object;
};

export const MobileModalContainer = ({ ShowPreview, customStyle }: Props) => {
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
          <Box ml={4}>
            <Button
              sx={{
                borderRadius: '6px',
                width: '136px',
                border: '1px solid rgb(48, 115, 153)',
                height: '40px',
                marginTop: '40px',
                alignItems: 'center',
                ...customStyle,
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
