import React from 'react';
import { Box, FormLabel, Grid, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useCurrentBreakpoint } from '@/utils';
import { CheckboxInput } from '@/components/FormikFields';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { queryKeys } from '@/react-query/constants';
import { FormSkeleton } from '@/components/Loaders';
import { useSetDirection } from '@/utils/hooks/useSetDirection';

interface PostingLimitData {
  limit?: {
    pointing?: number;
    checkBox?: number;
  };
}

export const PermissionsSection = () => {
  const { isTablet } = useCurrentBreakpoint();
  const { isLoading } = useGlobalLoadingState();
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const query = queryCache.findAll({
    queryKey: [queryKeys.getPostinglimitByCode]
  }) as { state: { data?: PostingLimitData } }[];
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const pointing = (query && query[0]?.state?.data?.limit?.pointing) || 0;
  const checkBox = (query && query[0]?.state?.data?.limit?.checkBox) || 0;
  const { setDirection } = useSetDirection();

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={1} />;
  }

  return (
    <Box
      sx={{
        padding: { mobile: 6, tablet: '30px 32px' },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '50%',
        borderLeft: `1px solid ${colors.neutral300}`
      }}
    >
      <LargeTitle title="Permissions" />
      <Box mt={2}>
        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
          <Box mt={2}>
            <RadioButtons
              options={[
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' }
              ]}
              id="createPostingLimitPermission"
              title="Pointing?"
              name="auth"
              value={`${isEditing ? pointing : 0}`}
            />
          </Box>
        </Grid>
        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
          <Box mt={2}>
            <RadioButtons
              options={[
                { label: 'Debit', value: '1' },
                { label: 'Credit', value: '0' }
              ]}
              id="createPostingLimit"
              title="Pointing Type?"
              name="status"
              value={`${isEditing ? pointing : 1}`}
            />
          </Box>
        </Grid>
        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }} mb={2}>
          <FormLabel sx={RadioButtonTitle}>Actions?</FormLabel>
          <Stack mt={1} direction={setDirection()}>
            <CheckboxInput
              className="permissionsCheckbox"
              label="Swing"
              name="swing"
              value={isEditing ? checkBox : 0}
            />
            <CheckboxInput
              className="permissionsCheckbox"
              label="Populate General Ledger"
              name="ledger"
              value={isEditing ? checkBox : 1}
            />
            <Box mr={{ mobile: 0, desktop: 3 }} ml={{ mobile: 0, desktop: 15 }}>
              <CheckboxInput
                className="permissionsCheckbox"
                label="Is System Posting?"
                name="posting"
                value={isEditing ? checkBox : 2}
              />
            </Box>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};
