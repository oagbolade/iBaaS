'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { CreateGLAccount as CreateGLAccountForm } from '@/features/Administrator/Forms/CreateGLAccount';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetStatus } from '@/api/general/useStatus';
import { useGetGLAccount, useGetGLType } from '@/api/admin/useCreateGLAccount';

export const CreateGLAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { currencies } = useGetCurrency();
  const { glType } = useGetGLType();
  const { status } = useGetStatus();
  const { bankgl } = useGetGLAccount();

  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <Box sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: { mobile: '100%', desktop: '50%' },
            padding: { mobile: 6, tablet: '30px 0' }
          }}
        >
          {currencies !== undefined &&
            glType !== undefined &&
            status !== undefined &&
            bankgl !== undefined && (
              <CreateGLAccountForm
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                glType={glType}
                currencies={currencies}
                status={status}
                bankgl={Array.isArray(bankgl) ? bankgl : []}
              />
            )}
        </Box>
      </Box>
    </>
  );
};
