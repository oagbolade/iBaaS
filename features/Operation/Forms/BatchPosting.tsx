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
  ButtonApproveTitle,
  ButtonResetTitle,
  ButtonPost,
  ButtonBack,
  TitleStyle,
} from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import Button from '@mui/material/Button';
import {
  CurrencyOperation,
  EditOperations,
} from '@/constants/OperationOptions';
import { AccountInfoIcons, PersonalInfoLine } from '@/assets/svg';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { useCurrentBreakpoint } from '@/utils';
import { ModalActions } from '@/components/Shared/ActionButtons';
import colors from '@/assets/colors';

export const BatchPosting = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
  };
  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box mt={{ mobile: 4, tablet: 0 }}>
          <PageTitle title="Batch Posting" styles={BatchTitle} />
        </Box>
        <Grid container spacing={2}>
          <Box
            sx={BatchContainer}
            ml={{ desktop: 2, mobile: 2 }}
            mr={{ tablet: 18, desktop: 10 }}
            mb={{ mobile: 8, tablet: 0 }}
          >
            <Grid
              container
              item
              direction="column"
              mt={5}
              justifyContent="center"
              ml={{ mobile: 4, tablet: 0 }}
            >
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="branch"
                    options={EditOperations.branch}
                    label="Branch"
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
                  <FormSelectField
                    name="user"
                    options={EditOperations.user}
                    label="user"
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
                    placeholder="Enter user"
                    label="Name"
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
                    placeholder="Enter currency"
                    label="Name"
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
                  sx={{
                    justifyContent: 'center',
                    marginBottom: { mobile: '4px' },
                  }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter value"
                    label="Name"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            <Box sx={PostingTitleContainer} ml={{ desktop: 2, mobile: 8 }}>
              <PageTitle title="Account Info" styles={PostingTitle} />
              <Box sx={{ marginLeft: '4px' }}>
                <AccountInfoIcons />
              </Box>
            </Box>
            <Box sx={PersonalIcon}>
              <PersonalInfoLine />
            </Box>
            <Box sx={{ padding: '20px 25px' }} ml={{ mobile: 2, tablet: 0 }}>
              <Grid container item spacing={2}>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Account Name" styles={AccountTitle} />
                    <PageTitle
                      title="Akeem Adeyanu"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Product name" styles={AccountTitle} />
                    <PageTitle
                      title="Savings Account"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Branch" styles={AccountTitle} />
                    <PageTitle title="Idimu Branch" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Book Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle
                      title="Effective Balance"
                      styles={AccountTitle}
                    />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Usable Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source type" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item>
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
              <Grid container spacing={2}>
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
                          tablet: '250px',
                        },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
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
                          width: setWidth(),
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
                          tablet: '200px',
                        },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
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
                          width: setWidth(),
                        }}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Grid
                  item={isTablet}
                  container={isMobile}
                  desktop={12}
                  tablet={12}
                  mobile={12}
                  mr={{ mobile: 2, tablet: 2 }}
                >
                  <Box
                    sx={{
                      marginRight: '20px',
                      width: { tablet: '350px' },
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
                        width: setWidth(),
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
          container={isMobile}
          mobile={10}
          tablet={8}
          justifyContent="center"
          ml={{ desktop: 5, mobile: 5 }}
          mr={{ mobile: 6, tablet: 18, desktop: 0 }}
          top={{ mobile: '50px', tablet: 0 }}
          marginBottom={{ mobile: '45px', tablet: '30px' }}
        >
          <ModalActions
            BackButtonTitle="Back"
            SaveButtonTitle="Save Changes"
            StyleBack={ModalBackButton}
          />
        </Grid>{' '}
      </Form>
    </Formik>
  );
};
