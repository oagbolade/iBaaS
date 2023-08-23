
'use client';
import React from 'react';
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
  ButtonReset,
} from './style';
import Grid from '@mui/material/Grid';
import {
  FormTextInput,
  FormSelectField,
  TextFieldArea,
} from '@/components/TextFields';
import {
  CurrencyOperation,
  EditOperations,
} from '@/constants/OperationOptions';
import { AccountInfoIcons, PersonalInfoLine } from '@/assets/svg';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { ButtonForms } from './ButtonForm';



export const Loan = () => {
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
        <Box>
          <PageTitle title='Group Loan Posting' styles={BatchTitle} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer}>
            <Grid container item direction="column">
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px', marginTop: '20px' }}>
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px',marginTop: '20px' }}>
                  <FormSelectField
                    name="department"
                    options={EditOperations.department}
                    label="Department"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px',marginTop: '20px' }}>
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px',marginTop: '20px' }}>
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px',marginTop: '20px' }}>
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ marginLeft: '40px',marginTop: '20px' }}>
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
            <Box sx={PostingTitleContainer}>
              <PageTitle title="Account Info" styles={PostingTitle} />
              <Box sx={{ marginLeft: '4px' }}>
                <AccountInfoIcons />
              </Box>
            </Box>
            <Box sx={PersonalIcon}>
              <PersonalInfoLine />
            </Box>
            <Box sx={{ padding: '20px 25px'}}>
              <Grid container item spacing={2}>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Account Name" styles={AccountTitle} />
                    <PageTitle
                      title="Akeem Adeyanu"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Product name" styles={AccountTitle} />
                    <PageTitle
                      title="Savings Account"
                      styles={AccountPageTitle}
                    />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Branch" styles={AccountTitle} />
                    <PageTitle title="Idimu Branch" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Book Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle
                      title="Effective Balance"
                      styles={AccountTitle}
                    />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Usable Balance" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source type" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Source" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={AccountContainer}>
                    <PageTitle title="Account Status" styles={AccountTitle} />
                    <PageTitle title="₦ 445,900.98" styles={AccountPageTitle} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={PostingTitleContainer}>
              <PageTitle title="Payment Info" styles={PostingTitle} />
              <Box sx={{ marginLeft: '7px' }}>
                <AccountInfoIcons />
              </Box>
            </Box>
            <Box sx={PersonalIcon}>
              <PersonalInfoLine />
            </Box>
            <Box sx={{ padding: '15px 17px' }}>
              <Grid container item spacing={1}>
                <Box sx={{ display: 'flex' }}>
                  <Grid item ml={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '250px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        // marginRight: '4px',
                        // marginLeft: '8px',
                      }}
                    >
                      <FormSelectField
                        name="currency"
                        options={CurrencyOperation.currency}
                        label="Currency"
                        customStyle={{ ...CustomStyle }}
                      />
                    </Box>
                  </Grid>
                  <Grid item ml={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '250px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <FormTextInput
                        name="rate"
                        placeholder="Enter rate"
                        label="Rate"
                        customStyle={{ ...CustomStyleInput }}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Grid item md={6}>
                  <Box
                    sx={{
                      marginLeft: '8px',
                      marginRight: '4px',
                    }}
                  >
                    <FormTextInput
                      name="transactionAmount"
                      placeholder="Enter Transaction"
                      label="Transaction Amount"
                      customStyle={{ ...CustomStyleText }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
         <ButtonForms
          title="Forward to approving officers"
          bttonTitles="Reset"
          buttonTitle="Deposit"
        />
      </Form>
    </Formik>
  );
};
