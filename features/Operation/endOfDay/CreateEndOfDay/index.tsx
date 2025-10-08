'use client';
import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { CreateEndOfDayForm } from '../../Forms/CreateEndofdayForm';
import { useGetCurrency } from '@/api/general/useCurrency';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { InWard } from '@/features/Operation/Forms/Clearing';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { TableSingleAction } from '@/components/Table';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { useGetEODProcesses } from '@/api/operation/useEndOfDay';

export const EndOfDayContainer = () => {
  const { currencies } = useGetCurrency();
  const { commBanks } = useGetCommercialBank();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingForward, setIsSubmittingForward] =
    useState<boolean>(false);
  const id = useParams();
  const { data, isLoading } = useGetEODProcesses();

  const taskId = data && data.length > 0 ? data[0].taskid : null;

  const actionButtons = taskId
    ? [
        <Box
          sx={{ display: 'flex' }}
          ml={{ mobile: 2, desktop: 0 }}
          key="view-details"
        >
          <Link
            href={`/setup/product-gl/view-eod-process/?isEditing=true&id=${taskId}`}
          >
            <TableSingleAction actionName="View Details" />
          </Link>
        </Box>
      ]
    : [];

  return (
    <>
      <Box
        sx={{
          marginTop: '60px',
          position: 'fixed',
          top: 0,
          width: 'calc(100vw - 300px)',
          zIndex: 1
        }}
      >
        <TopActionsArea actionButtons={actionButtons} />
      </Box>
      <CreateEndOfDayForm />
    </>
  );
};
