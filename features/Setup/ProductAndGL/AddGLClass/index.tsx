import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { CreateGLClass } from '../Form/AddGLClass';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetNode } from '@/api/admin/useCreateGLAccount';

type Props = {
  classId: string;
};

export const AddGlClass = ({ classId }: Props) => {
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
  const { node } = useGetNode();
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
          {node !== undefined && (
            <CreateGLClass
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              classId={classId}
              node={node}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
