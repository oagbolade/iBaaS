import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  useCreatePostingLimit,
  useGetPostingLimitByBranchCode
} from '@/api/admin/usePostingLimit';
import { IBranches, IRoles } from '@/api/ResponseTypes/general';
import { createPostingLimitInitialValues } from '@/schemas/schema-values/admin';
import { createPosting } from '@/schemas/admin';
import { FormSkeleton } from '@/components/Loaders';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { encryptData } from '@/utils/encryptData';

type Props = {
  unitTestingInitialValues?: any;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  branches: IBranches[] | Array<any>;
  roles: IRoles[] | Array<any>;
};

export const CreatePostingLimit = ({
  isSubmitting,
  setIsSubmitting,
  branches,
  roles,
  unitTestingInitialValues
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const roleId = useGetParams('roleId') || '';
  const branchId = useGetParams('branchId') || '';

  const { mappedBranches, mappedRole } = useMapSelectOptions({
    roles,
    branches
  });
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreatePostingLimit(Boolean(isEditing));
  const { isLoading, limit } = useGetPostingLimitByBranchCode(
    encryptData(roleId) || null,
    encryptData(branchId) || null
  );

  const onSubmit = async (values: any) => {
    await mutate({ ...values });
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <LargeTitle
          title={`${isEditing ? 'Edit Limit' : 'Create New Limit'}`}
        />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            isEditing
              ? { ...limit, branchCode: branchId, roleId }
              : unitTestingInitialValues || createPostingLimitInitialValues
          }
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createPosting}
        >
          <Form>
            <Box mt={4}>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectField
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                    fontSize: '14px'
                  }}
                  name="roleId"
                  options={mappedRole}
                  label="Role"
                  required
                />{' '}
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectField
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                    fontSize: '14px'
                  }}
                  name="branchCode"
                  options={mappedBranches}
                  label="Branch"
                  required
                />{' '}
              </Grid>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="branchCredit"
                    placeholder="0.0"
                    label="Credit Limit ( Max amount for withdrawal )"
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="branchDebit"
                    placeholder="0.0"
                    label="Debit Limit ( Max amount for deposit )"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interBranchCr"
                    placeholder="0.0"
                    label="CR Interbranch Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interBranchDr"
                    placeholder="0.0"
                    label="DR Interbranch Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interBankCr"
                    placeholder="0.0"
                    label="CR Interbank Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interBankDr"
                    placeholder="0.0"
                    label="DR Interbank Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="tdLimit"
                    placeholder="0.0"
                    label="Term Deposit Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="loanLimit"
                    placeholder="0.0"
                    label="Loan Limit"
                    required
                  />{' '}
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
