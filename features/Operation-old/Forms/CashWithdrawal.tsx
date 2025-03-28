'use client';
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import {
  AccountContainer,
  AccountPageTitle,
  AccountTitle,
  BatchContainer,
  BatchTitle,
  PostingContainer,
  PostingTitle,
  PostingTitleContainer,
  CustomStyle,
  PersonalIcon,
  CustomStyleInput,
  CustomStyleText,
  ButtonContainer,
  ButtonApprove,
  ButtonApproveTitle,
  ButtonReset
} from './style';
import Grid from '@mui/material/Grid';
import {
  FormTextInput,
  FormSelectField,
  TextFieldArea
} from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import Button from '@mui/material/Button';
import {
  CurrencyOperation,
  EditOperations
} from '@/constants/OperationOptions';
import { AccountInfoIcons, PersonalInfoLine } from '@/assets/svg';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton
} from '@/components/Modal/styles';
import { ButtonForms } from './ButtonForm';
import { ModalActions } from '@/components/Shared/ActionButtons';
import { useCurrentBreakpoint } from '@/utils';
import colors from '@/assets/colors';

export const ModalBackStyle = {
  height: { desktop: '40px', mobile: '38px' },
  width: { desktop: '170px', mobile: '150px' },
  fontSize: { desktop: '14px', mobile: '12px' },
  fontWeight: 600,
  color: `${colors.neutral900}`,
  backgroundColor: `${colors.white}`,
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`
};

export const CashWithDrawal = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box ml={{ desktop: 2, mobile: 2 }}>
          <PageTitle title="Cash Withdrawal" styles={BatchTitle} />
        </Box>
        <Grid container spacing={2}>
          <Box
            sx={BatchContainer}
            ml={{ desktop: 2, mobile: 2 }}
            mr={{ tablet: 70, desktop: 10 }}
          >
            <Grid container item direction="column" mt={5}>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter account number"
                    label="Account Number"
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="department"
                    options={EditOperations.department}
                    label="Department"
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter amount"
                    label="Pay Amount"
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter voucher number"
                    label="Voucher number"
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <TextFieldArea
                    label="Narration"
                    title="Short text..."
                    placeholder="Short text..."
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            <Box sx={PostingTitleContainer} ml={{ desktop: 2, mobile: 7 }}>
              <PageTitle title="Account Info" styles={PostingTitle} />
              <Box sx={{ marginLeft: '4px' }}>
                <AccountInfoIcons />
              </Box>
            </Box>
            <Box sx={PersonalIcon}>
              <PersonalInfoLine />
            </Box>
            <Box sx={{ padding: '20px 25px' }}>
              <Grid container item spacing={2}>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Account Name" styles={AccountTitle} />
                    <PageTitle
                      title="Akeem Adeyanu"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Product name" styles={AccountTitle} />
                    <PageTitle
                      title="Savings Account"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Branch" styles={AccountTitle} />
                    <PageTitle title="Idimu Branch" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Book Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle
                      title="Effective Balance"
                      styles={AccountTitle}
                    />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Usable Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source type" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item tablet={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Account Status" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={PostingTitleContainer} ml={{ desktop: 2, mobile: 7 }}>
              <PageTitle title="Payment Info" styles={PostingTitle} />
              <Box sx={{ marginLeft: '7px' }}>
                <AccountInfoIcons />
              </Box>
            </Box>
            <Box sx={PersonalIcon}>
              <PersonalInfoLine />
            </Box>
            <Box sx={{ padding: '15px 17px' }} ml={{ desktop: 2, mobile: 5 }}>
              <Grid container item spacing={1}>
                <Box sx={{ display: { desktop: 'flex', tablet: 'flex' } }}>
                  <Grid
                    item={isTablet}
                    container={isMobile}
                    mobile={12}
                    desktop={12}
                    tablet={12}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: {
                          desktop: '250px',
                          mobile: '40px',
                          tablet: '250px'
                        },
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}
                      ml={{ mobile: 7, tablet: 0 }}
                      justifyContent="center"
                      mr={{ mobile: 3, tablet: 0 }}
                    >
                      <FormSelectField
                        name="currency"
                        options={CurrencyOperation.currency}
                        label="Currency"
                        customStyle={{
                          width: setWidth()
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item={isTablet}
                    container={isMobile}
                    mobile={12}
                    desktop={12}
                    tablet={12}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: {
                          desktop: '400px',
                          mobile: '40px',
                          tablet: '200px'
                        },
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}
                      ml={{ mobile: 7, tablet: 0 }}
                      justifyContent="center"
                      mr={{ tablet: 10, desktop: 7, mobile: 4 }}
                    >
                      <FormTextInput
                        name="rate"
                        placeholder="Enter rate"
                        label="Rate"
                        customStyle={{
                          width: setWidth()
                        }}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Grid
                  item={isTablet}
                  container={isMobile}
                  mobile={12}
                  desktop={12}
                  tablet={12}
                >
                  <Box
                    sx={{
                      marginRight: '20px',
                      width: { tablet: '350px' }
                    }}
                    ml={{ mobile: 7, tablet: 0 }}
                    justifyContent="center"
                    mr={{ tablet: 3, desktop: 2 }}
                  >
                    <FormTextInput
                      name="transactionAmount"
                      placeholder="Enter Transaction"
                      label="Transaction Amount"
                      customStyle={{
                        width: setWidth()
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item={isTablet}
          marginRight={{ mobile: '300px', desktop: '100px', tablet: '450px' }}
          container={isMobile}
          mobile={10}
          tablet={2}
          desktop={12}
          justifyContent="center"
          marginLeft={{ mobile: '50px', desktop: '90px' }}
          marginBottom={{ mobile: '45px', tablet: '30px' }}
        >
          <ModalActions
            StyleBack={{ ...ModalBackStyle }}
            BackButtonTitle="Approving officers"
            SaveButtonTitle="Deposit"
          />
        </Grid>
      </Form>
    </Formik>
  );
};
