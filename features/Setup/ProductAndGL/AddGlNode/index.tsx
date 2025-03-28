import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { CreateGLNode } from '../Form/AddGlNode';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetProductType } from '@/api/general/useProductType';
import { useGetGLAccount, useGetGLType } from '@/api/admin/useCreateGLAccount';

type Props = {
  nodeId: string | null;
  prodCode: string | null;
};

export const AddGlNode = ({ nodeId, prodCode }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle={`${isEditing ? 'Save Changes' : 'Submit'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { glType } = useGetGLType();

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          {glType !== undefined && Array.isArray(glType) && (
            <CreateGLNode
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              nodeId={nodeId}
              glType={glType}
              prodCode={prodCode}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
