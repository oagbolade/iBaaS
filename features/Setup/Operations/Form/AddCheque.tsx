'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { GLAccountPreviewContent } from './GLPreviewContent/GlAccountPreview';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSkeleton } from '@/components/Loaders';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { createChequeBookInitialValues } from '@/schemas/schema-values/setup';
import { createChequeBokSchema, createDormancySchema } from '@/schemas/setup';
import { useCreateCheque, useGetChequeById } from '@/api/setup/useCheque';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import { MobilePreviewContent } from '@/features/CustomerService/Form/CreateAccount';
import { chargeContentStyle } from '@/features/Operation/Forms/style';
import { useGetGLByGLNumber } from '@/api/admin/useCreateGLAccount';
import { decryptData } from '@/utils/decryptData';
import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  chequeId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  bankgl?: IGLAccount[] | Array<any>;
};

export const AddCheque = ({
  chequeId,
  isSubmitting,
  setIsSubmitting,
  bankgl
}: Props) => {
  const searchParams = useSearchParams();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateCheque(
    Boolean(isEditing),
    encryptData(chequeId ?? '') || null
  );
  const { checkbooks, isLoading } = useGetChequeById(
    encryptData(chequeId ?? '') || null
  );
  const [commissionAccount, setCommissionAccount] = React.useState<
    string | null
  >(null);

  const { mappedGlAccount } = useMapSelectOptions({
    bankgl
  });

  const { bankgl: accountData } = useGetGLByGLNumber(
    encryptData(commissionAccount) || ''
  );

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
  const handleCommissionAccountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommissionAccount(e.target.value);
  };
  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }
  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} ChequeBook`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={checkbooks || createChequeBookInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createChequeBokSchema}
        >
          <Form>
            <Box sx={{ display: 'flex' }}>
              <Box mt={4} sx={{ width: '960px', height: '100px' }}>
                <Grid container>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                  >
                    <FormSelectField
                      name="glAccount1"
                      options={mappedGlAccount}
                      label="Select GL Account"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="batchno"
                      placeholder="Enter Cheque Book Code"
                      label="Cheque Book Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="numberOfleaves"
                      placeholder="Enter Product Code"
                      label="No of Leaves"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="typeDesc"
                      placeholder="Enter cheque book name"
                      label="Cheque Book Name"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="lastnumber"
                      placeholder="Enter Cost of cheque"
                      label="Cost of Cheque Books (To Bank)"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="accountType"
                      placeholder="Enter Commision Amount"
                      label="Commision Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
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
                      name="currentCost"
                      placeholder="Enter Cost Amount"
                      label="Cost Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
                      }}
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                    mb={5}
                  >
                    <FormTextInput
                      name="glAccount2"
                      placeholder="Enter Commission Account"
                      label="Commission Account"
                      value={commissionAccount?.toString()}
                      onChange={handleCommissionAccountChange}
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '120%')
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box ml={{ desktop: 20, mobile: 5 }}>
                {isMobile ? (
                  <MobilePreviewContent
                    PreviewContent={
                      <GLAccountPreviewContent
                        accountDetails={accountData as any}
                      />
                    }
                    customStyle={{ ...chargeContentStyle }}
                  />
                ) : (
                  <GLAccountPreviewContent
                    accountDetails={accountData as any}
                  />
                )}{' '}
              </Box>
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
