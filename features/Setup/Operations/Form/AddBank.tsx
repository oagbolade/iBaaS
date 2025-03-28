'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSkeleton } from '@/components/Loaders';
import {
  useCreateCommercialBank,
  useGetCommercialBankByCode
} from '@/api/setup/useCommercialBank';
import { createCommercialBankInitialValue } from '@/schemas/schema-values/setup';
import { createCommercialBankSchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  bankId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateBank = ({
  bankId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateCommercialBank(
    Boolean(isEditing),
    encryptData(bankId)
  );
  const { commBanks, isLoading } = useGetCommercialBankByCode(
    encryptData(bankId) || null
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
    return (
      <Box>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Bank`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={commBanks || createCommercialBankInitialValue}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createCommercialBankSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                {isEditing && (
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                  >
                    <FormTextInput
                      name="bankcode"
                      placeholder="Enter Bank Code"
                      label="Bank Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                )}

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="bankName"
                    placeholder="Enter Bank Name"
                    label="Bank Name"
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
                    name="bankshortname"
                    placeholder="Enter Bank Mnemonic"
                    label="Bank Mnemonic"
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
