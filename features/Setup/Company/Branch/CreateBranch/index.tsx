'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetDepartments } from '@/api/general/useDepartments';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetStatus } from '@/api/general/useStatus';
import { CreateBranchForm } from '@/features/Setup/Company/Forms/CreateBranchForm';
import { useGetBrancheType } from '@/api/general/useBranchType';
import { useGetCitys } from '@/api/general/useCity';
import {
  useGetAllCountries,
  useGetAllStates
} from '@/api/general/useGeography';

type Props = {
  branchId?: string | null;
};

export const CreateBranch = ({ branchId }: Props) => {
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create Branch'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { branches } = useGetBranches();
  const { branchTypes } = useGetBrancheType();
  const { states } = useGetAllStates();
  const { towns } = useGetCitys();
  const { countries } = useGetAllCountries();
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
          {countries !== undefined &&
            towns !== undefined &&
            branchTypes !== undefined &&
            branches !== undefined &&
            states !== undefined && (
              <CreateBranchForm
                branchId={branchId}
                branches={branches}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                branchTypes={branchTypes}
                states={states}
                towns={towns}
                countries={countries}
              />
            )}
        </Box>
      </Box>
    </>
  );
};
