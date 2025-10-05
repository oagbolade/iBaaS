'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { documentUpload } from '@/features/Operation/Forms/style';
import { removeMandate } from '@/features/CustomerService/Form/style';
import { PrimaryIconButton } from '@/components/Buttons';
import colors from '@/assets/colors';

type Props = {
  photo?: File | null;
  signature?: File | null;
  handleDelete: Function;
};

export const labelStyle = {
  color: `${colors.neutral700}`,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '16px'
};

export const PreviewUploadedMandates = ({
  photo,
  signature,
  handleDelete
}: Props) => {
  let fileSize = '0';
  if (photo) {
    fileSize = (photo.size / 1024).toFixed(2);
  } else if (signature) {
    fileSize = (signature.size / 1024).toFixed(2);
  }

  return (
    <Box sx={documentUpload}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <Box>
          <Image
            alt=""
            src={
              photo
                ? URL.createObjectURL(photo as File)
                : URL.createObjectURL(signature as File)
            }
            priority
            width={photo ? 100 : 72}
            height={photo ? 131 : 43}
          />
        </Box>
        <Stack direction="row" justifyContent="end" alignItems="flex-end">
          <Box
            ml={5}
            mt={6}
            sx={{ marginBottom: '-9px', marginRight: '-40px' }}
          >
            <Typography
              sx={{ ...labelStyle, marginBottom: '0px', width: '20px' }}
            >
              {`${fileSize}kb`}
            </Typography>
          </Box>
          <Box mt={8} ml={8}>
            <PrimaryIconButton
              onClick={() => handleDelete(photo ? 'photo' : 'signature')}
              buttonTitle="Remove"
              customStyle={{
                ...removeMandate,
                padding: '0px',
                width: '0px',
                height: '0px'
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
