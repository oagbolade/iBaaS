import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { IBranchTypes, IBranches, ICity } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { FormSkeleton } from '@/components/Loaders';
import {
  useCreateBranch,
  useGetBranchByCode
} from '@/api/setup/useSetUpBranches';
import {
  createBranchInitialValues,
  CreateBranchTestCaseFormValues
} from '@/schemas/schema-values/setup';
import { createBranchSchema } from '@/schemas/setup';
import { ICountries, IStates } from '@/api/ResponseTypes/customer-service';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

type Props = {
  branchId?: string | null;
  isSubmitting: boolean;
  branches: IBranches[] | Array<any>;
  branchTypes: IBranchTypes[] | Array<any>;
  states: IStates[] | Array<any>;
  towns: ICity[] | Array<any>;
  countries: ICountries[] | Array<any>;
  setIsSubmitting: (submit: boolean) => void;
  unitTestInitialValues?: CreateBranchTestCaseFormValues;
};

export const CreateBranchForm = ({
  branchId,
  isSubmitting,
  branches,
  branchTypes,
  states,
  towns,
  countries,
  setIsSubmitting,
  unitTestInitialValues
}: Props) => {
  const {
    mappedBranches,
    mappedBranchTypes,
    mappedState,
    mappedCity,
    mappedCountries
  } = useMapSelectOptions({
    branches,
    branchTypes,
    states,
    towns,
    countries
  });
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, setWidth } = useCurrentBreakpoint();

  const { branch, isLoading } = useGetBranchByCode(
    encryptData(branchId ?? '') || null
  );
  const { mutate } = useCreateBranch(
    Boolean(isEditing),
    encryptData(branchId ?? '') || null
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

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Branch`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            unitTestInitialValues || branch || createBranchInitialValues
          }
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createBranchSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="branchName"
                    placeholder="Enter branch name"
                    label="Branch Name"
                  />{' '}
                </Grid>
                <Grid
                  item
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="address"
                    placeholder="Enter address"
                    label="Address"
                  />{' '}
                </Grid>
                <Grid mb={1} item mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="branchType"
                    options={mappedBranchTypes}
                    label="Branch Type"
                  />{' '}
                </Grid>

                <Grid mb={1} item mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="mBranchCode"
                    options={mappedBranches}
                    label="Main Branch"
                  />{' '}
                </Grid>
                <Grid
                  item
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="email"
                    placeholder="Enter email address"
                    label="Email Address"
                  />{' '}
                </Grid>
                <Grid mb={1} item mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="country"
                    options={mappedCountries}
                    label="Country"
                  />{' '}
                </Grid>
                <Grid item mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="phone"
                    placeholder="Omodayo Oluwafunke"
                    label="Phone Number"
                  />{' '}
                </Grid>
                <Grid mb={1} item mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="state"
                    options={mappedState}
                    label="State"
                  />{' '}
                </Grid>
                <Grid mb={1} item mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="city"
                    options={mappedCity}
                    label="City"
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
