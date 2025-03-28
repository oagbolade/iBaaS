'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { PrivilegeSection } from '../AddTransaction/PrivilegeSection';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSkeleton } from '@/components/Loaders';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { createTransactionTypeInitialValues } from '@/schemas/schema-values/setup';
import { createTransactionTypeSchema } from '@/schemas/setup';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { MenuIDList } from '@/utils/getCheckedMenus';
import { encryptData } from '@/utils/encryptData';

import {
  useCreateTransactionType,
  useGetTransactionTypeByCode
} from '@/api/setup/useTransactionType';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  transactionId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  bankgl?: IGLAccount[] | Array<any>;
};

export const AddTransactionType = ({
  transactionId,
  isSubmitting,
  setIsSubmitting,
  bankgl
}: Props) => {
  const searchParams = useSearchParams();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateTransactionType(
    Boolean(isEditing),
    encryptData(transactionId)
  );
  const [transactionPriviledgeList, setAuthPriviledgeCheckList] =
    React.useState<MenuIDList>([]);
  const { transactType, isLoading } = useGetTransactionTypeByCode(
    encryptData(transactionId) || null
  );
  const { mappedGlAccount } = useMapSelectOptions({
    bankgl
  });

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Transaction`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={transactType || createTransactionTypeInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createTransactionTypeSchema}
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
                  <FormTextInput
                    name="tranType"
                    placeholder="Enter Transaction Code"
                    label="Transaction Code"
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
                    name="tranName"
                    placeholder="Enter Transaction Name"
                    label="Transaction Name"
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
                    name="tranShortname"
                    placeholder="Enter Transaction Mnemonic"
                    label="Transaction Mnemonic"
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
                  <RadioButtons
                    className="permissionOptions"
                    options={[
                      { label: 'Credit', value: '1' },
                      { label: 'Debit', value: '0' }
                    ]}
                    title="Select Transaction Type"
                    name="status"
                    value=""
                  />
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
        <PrivilegeSection
          setSumbissionCheckList={setAuthPriviledgeCheckList}
          title="Transaction Charges"
        />
      </Box>
    </Box>
  );
};
