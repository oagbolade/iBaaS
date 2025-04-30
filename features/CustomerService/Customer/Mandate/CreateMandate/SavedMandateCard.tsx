'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Stack } from '@mui/material';
import { documentUpload } from '@/features/Operation/Forms/style';
import { removeMandate } from '@/features/CustomerService/Form/style';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { PrimaryIconButton } from '@/components/Buttons';

interface IMandateInfo {
  title: string;
  photo: File | null;
  signature: File | null;
  fileIndex: number;
}

type Props = {
  mandateInfo: IMandateInfo;
  handleDelete: Function;
};

export const SavedMandateCard = ({ mandateInfo, handleDelete }: Props) => {
  return (
    <Box mb={3} sx={documentUpload}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ width: '25%' }}>
          <SubTitle title="Mandate" />
          <Details title={mandateInfo.title} />
        </Box>
        <Box sx={{ width: '25%' }}>
          <SubTitle title="Photo" />
          <Box>
            <Image
              alt=""
              src={URL.createObjectURL(mandateInfo.photo as File)}
              priority
              width={100}
              height={131}
            />
          </Box>{' '}
        </Box>
        <Box sx={{ width: '25%' }}>
          <SubTitle title="Signature" />
          <Box>
            <Image
              alt=""
              src={URL.createObjectURL(mandateInfo.signature as File)}
              priority
              width={72}
              height={43}
            />
          </Box>{' '}
        </Box>
        <Box sx={{ width: '20%', marginLeft: '-40px' }}>
          <PrimaryIconButton
            onClick={() => {
              return handleDelete(mandateInfo.fileIndex);
            }}
            buttonTitle="Delete"
            customStyle={removeMandate}
          />
        </Box>
      </Stack>
    </Box>
  );
};
