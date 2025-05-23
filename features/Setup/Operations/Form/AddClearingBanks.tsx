'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/schemas/auth';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { EditOperations } from '@/constants/OperationOptions';
import { FormSkeleton } from '@/components/Loaders';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  useCreateClearingBank,
  useGetClearingBankByCode
} from '@/api/setup/useClearingBank';
import { createClearingBanksInitialValues } from '@/schemas/schema-values/setup';
import { createClearingBankSchema } from '@/schemas/setup';
import { IGetCommercialBank } from '@/api/ResponseTypes/setup';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  clearingBankId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  commBanks: IGetCommercialBank[] | Array<any>;
};

export const AddClearingBank = ({
  clearingBankId,
  isSubmitting,
  setIsSubmitting,
  commBanks
}: Props) => {
  const searchParams = useSearchParams();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const isEditing = searchParams.get('isEditing');
  const { mappedCommercialBank } = useMapSelectOptions({
    commBanks
  });
  const { mutate } = useCreateClearingBank(
    Boolean(isEditing),
    encryptData(clearingBankId)
  );

  const { clearBanks, isLoading } = useGetClearingBankByCode(
    encryptData(clearingBankId) || null
  );

  const onSubmit = async (values: any) => {
    await mutate({
      ...values
    });
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
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} New`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={clearBanks || createClearingBanksInitialValues}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createClearingBankSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormSelectField
                    name="bankCode"
                    options={mappedCommercialBank}
                    label="Select a Commercial Bank"
                    disabled={Boolean(isEditing)}
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="bankCode"
                    placeholder="Enter Clearing Code"
                    label="Clearing Code"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="chequeinClear"
                    placeholder="Enter Operating Account"
                    label="Operating Account(Exclude Branch Code)"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="nostro"
                    placeholder="Enter CMA Account"
                    label="CMA Account(Exclude Branch Code)"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="unclearedgl"
                    placeholder="Enter Cheque for Collection"
                    label="Cheque for Collection(Exclude Branch Code)"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="collectiongl"
                    placeholder="Enter Uncleared Effect Account"
                    label="Uncleared Effect Account(Exclude Branch Code)"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
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
