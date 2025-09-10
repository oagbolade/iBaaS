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
import {
  BatchContainer,
  chargeContentStyle,
  inputContentText,
  PostingContainer
} from '@/features/Operation/Forms/style';
import { useGetGLByGLNumber } from '@/api/admin/useCreateGLAccount';
import { decryptData } from '@/utils/decryptData';
import { encryptData } from '@/utils/encryptData';
import { Tabs } from '@/components/Revamp/Tabs';
import { getStoredUser } from '@/utils/user-storage';
import { useGetAllUsers, useGetUserByID } from '@/api/admin/useAdminUsers';
import { useGetSystemDate } from '@/api/general/useSystemDate';

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
  const { sysmodel } = useGetSystemDate();
  // const branchCode = `${getStoredUser()?.profiles?.branchCode}` On hold;
  const userId = `${getStoredUser()?.profiles?.userid}`;
  const { userDetails } = useGetUserByID(encryptData(userId as string));
  const branchCodeId = userDetails?.branchcode;
  const [commissionAccount, setCommissionAccount] = React.useState<
    string | null
  >(null);
  const [costAmount, setCostAmount] = React.useState<string | null>(null);
  // const branchCode = `${getStoredUser()?.profiles?.branchCode}` On hold;
  const costAmountDataCode = commissionAccount
    ? `${branchCodeId}${commissionAccount}`
    : '';
  const { bankgl: accountData } = useGetGLByGLNumber(
    costAmountDataCode ? encryptData(costAmountDataCode) : ''
  );
  const accountDataCode = costAmount ? `${branchCodeId}${costAmount}` : '';
  const { bankgl: costAmountData } = useGetGLByGLNumber(
    accountDataCode ? encryptData(accountDataCode) : ''
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const lastNumber = values.numberOfleaves;
    await mutate({
      ...values,
      glAccount1: costAmount || values.glAccount1,
      glAccount2: commissionAccount || values.glAccount2,
      lastnumber: lastNumber,
      authorisedby: sysmodel?.approvingOfficer
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
  const handleCostAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostAmount(e.target.value);
  };
  const tabTitle = ['Cost Account', 'Commission Account'];
  const pageMenu = [
    <GLAccountPreviewContent accountDetails={costAmountData} />,
    <GLAccountPreviewContent accountDetails={accountData} />
  ];
  const PreviewContent: React.FC = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          tabTitle={tabTitle}
          pageMenu={pageMenu}
          customStyle={{ ...inputContentText }}
        />
      </Box>
    );
  };

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }
  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Cheque book`} />
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
              ? {
                  ...checkbooks,
                  glAccount2: checkbooks?.glAccount2,
                  glAccount1: checkbooks?.glAccount1,
                  variance: 0
                }
              : createChequeBookInitialValues
          }
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createChequeBokSchema}
        >
          <Form>
            <Grid container spacing={2}>
              <Box sx={{ display: 'flex' }}>
                <Box mt={4} sx={BatchContainer}>
                  <Grid container>
                    {isEditing && (
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
                            width: setWidth(isMobile ? '250px' : '100%')
                          }}
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
                        name="numberOfleaves"
                        placeholder="Enter No of Leaves"
                        label="No of Leaves"
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
                        name="typeDesc"
                        placeholder="Enter cheque book name"
                        label="Cheque Book Name"
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
                        name="currentCost"
                        placeholder="Enter Cost of cheque"
                        label="Cost of Cheque Books (To Bank)"
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
                      mb={5}
                    >
                      <FormTextInput
                        name="glAccount1"
                        placeholder="Enter Cost Account"
                        label="Cost Account(Exclude branch code)"
                        value={costAmount?.toString()}
                        disabled={Boolean(isEditing)}
                        onChange={handleCostAmountChange}
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
                      mb={5}
                    >
                      <FormTextInput
                        name="glAccount2"
                        placeholder="Enter Commission Account"
                        disabled={Boolean(isEditing)}
                        label="Commission Account(Exclude branch code)"
                        value={commissionAccount?.toString()}
                        onChange={handleCommissionAccountChange}
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '100%')
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={PostingContainer}>
                  {isMobile ? (
                    <MobilePreviewContent
                      PreviewContent={<PreviewContent />}
                      customStyle={{ ...chargeContentStyle }}
                    />
                  ) : (
                    <PreviewContent />
                  )}
                </Box>
              </Box>
            </Grid>

            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
