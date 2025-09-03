import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form, useFormikContext } from 'formik';
import { useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
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
import { createBranchInitialValues } from '@/schemas/schema-values/setup';
import { createBranchSchema } from '@/schemas/setup';
import { ICountries, IStates } from '@/api/ResponseTypes/customer-service';
import { encryptData } from '@/utils/encryptData';
import {
  useGetStateByCountryCode,
  useGetTownByStateCode
} from '@/api/general/useGeography';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { isEmptyObject } from '@/utils/isEmptyObject';

// Define IBranch interface
interface IBranch {
  branchName?: string;
  address?: string;
  branchType?: string;
  mBranchCode?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
}

interface IResidentDetails {
  country: string;
  state: string;
  city: string;
}

type Props = {
  branchId?: string | null;
  isSubmitting: boolean;
  branches: IBranches[] | Array<any>;
  branchTypes: IBranchTypes[] | Array<any>;
  states: IStates[] | Array<any>;
  towns: ICity[] | Array<any>;
  countries: ICountries[] | Array<any>;
  setIsSubmitting: (submit: boolean) => void;
  unitTestInitialValues?: any;
};

// Schema for validation
// Initial values

// DynamicSelectFields Component
const DynamicSelectFields: React.FC<{
  mappedCountries: OptionsI[];
  mappedResidentStates: OptionsI[];
  mappedResidentTowns: OptionsI[];
  isMobile: boolean;
  setWidth: (width?: number | string) => string | number | undefined;
  residentDetails: IResidentDetails;
  setResidentDetails: React.Dispatch<React.SetStateAction<IResidentDetails>>;
}> = ({
  mappedCountries,
  mappedResidentStates,
  mappedResidentTowns,
  isMobile,
  setWidth,
  residentDetails,
  setResidentDetails
}) => {
  const { values, setFieldValue } = useFormikContext<{
    country: string;
    state: string;
    city: string;
  }>();

  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  useEffect(() => {
    setIsStateDisabled(!values.country || mappedResidentStates.length === 0);
    setIsCityDisabled(!values.state || mappedResidentTowns.length === 0);

    if (!values.country) {
      setFieldValue('state', '');
      setFieldValue('city', '');
    }

    if (!values.state) {
      setFieldValue('city', '');
    }
  }, [
    values.country,
    values.state,
    mappedResidentStates,
    mappedResidentTowns,
    setFieldValue
  ]);

  const getWidth = (mobileWidth: string, defaultWidth: string) => {
    const width = setWidth(isMobile ? mobileWidth : defaultWidth);
    return width !== undefined ? String(width) : defaultWidth;
  };

  return (
    <>
      <Grid mb={1} item mobile={12}>
        <FormSelectField
          customStyle={{
            width: getWidth('285px', '100%'),
            fontSize: '14px'
          }}
          name="country"
          options={mappedCountries}
          label="Country"
          onChange={(e) => {
            const selectedValue = e.target.value;
            setResidentDetails((prev) => ({
              ...prev,
              country: selectedValue,
              state: '',
              city: ''
            }));
            setFieldValue('country', selectedValue);
            setFieldValue('state', '');
            setFieldValue('city', '');
          }}
          required
        />
      </Grid>
      <Grid mb={1} item mobile={12}>
        <FormSelectField
          customStyle={{
            width: getWidth('285px', '100%'),
            fontSize: '14px'
          }}
          name="state"
          options={mappedResidentStates}
          label="State"
          disabled={isStateDisabled}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setResidentDetails((prev) => ({
              ...prev,
              state: selectedValue,
              city: ''
            }));
            setFieldValue('state', selectedValue);
            setFieldValue('city', '');
          }}
          required
        />
      </Grid>
      <Grid mb={1} item mobile={12}>
        <FormSelectField
          customStyle={{
            width: getWidth('285px', '100%'),
            fontSize: '14px'
          }}
          name="city"
          options={mappedResidentTowns}
          label="City"
          disabled={isCityDisabled}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setResidentDetails((prev) => ({
              ...prev,
              city: selectedValue
            }));
            setFieldValue('city', selectedValue);
          }}
          required
        />
      </Grid>
    </>
  );
};

// CreateBranchForm Component
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
  const formType = 'personal';
  const residentFormType = 'personal-resident';
  const { branch: branchCode, isLoading } = useGetBranchByCode(
    encryptData(branchId ?? '') || null
  ) as { branch: IBranch | null; isLoading: boolean };
  const [mappedResidentStates, setMappedResidentStates] = useState<OptionsI[]>(
    []
  );
  const [mappedResidentTowns, setMappedResidentTowns] = useState<OptionsI[]>(
    []
  );
  const [residentDetails, setResidentDetails] = useState<IResidentDetails>({
    country: branchCode?.country || '',
    state: branchCode?.state || '',
    city: branchCode?.city || ''
  });
  const { states: allResidentNationStates, isLoading: isLoadingStates } =
    useGetStateByCountryCode(
      encryptData(residentDetails.country) as string,
      residentFormType
    );
  const { towns: allResidentStateTowns, isLoading: isLoadingTowns } =
    useGetTownByStateCode(
      encryptData(residentDetails.state) as string,
      formType
    );

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
  const { mutate } = useCreateBranch(
    Boolean(isEditing),
    encryptData(branchId ?? '') || null
  );
  const [showMainBranch, setShowMainBranch] = useState<number | null>(null);

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const payload = {
      ...values,
      country: values.country,
      state: values.state,
      city: values.city
    };
    await mutate(payload);
  };

  useEffect(() => {
    if (allResidentNationStates && !isLoadingStates) {
      const allResidentNationStatesArray = allResidentNationStates.map(
        (state: IStates) => ({
          name: state.stateName,
          value: state.stateCode?.toString().trim()
        })
      );
      setMappedResidentStates(allResidentNationStatesArray);
    } else {
      setMappedResidentStates([]);
    }
  }, [allResidentNationStates, isLoadingStates]);

  useEffect(() => {
    if (
      allResidentStateTowns &&
      !isEmptyObject(allResidentStateTowns) &&
      !isLoadingTowns
    ) {
      const allResidentStateTownsArray = (allResidentStateTowns || []).map(
        (town: ICity) => ({
          name: town.townName,
          value: town.townCode?.toString().trim()
        })
      );
      setMappedResidentTowns(allResidentStateTownsArray);
    } else {
      setMappedResidentTowns([]);
    }
  }, [allResidentStateTowns, isLoadingTowns]);

  const handleBranchType = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedBranchType = Number(e.target.value);
    setShowMainBranch(selectedBranchType);
    if (selectedBranchType === 1) {
      setFieldValue('mBranchCode', '');
    }
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

  useEffect(() => {
    if (branchCode) {
      setResidentDetails({
        country: branchCode.country || '',
        state: branchCode.state || '',
        city: branchCode.city || ''
      });
    }
  }, [branchCode]);

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
            unitTestInitialValues || isEditing
              ? {
                  ...branchCode,
                  country: branchCode?.country,
                  state: branchCode?.state,
                  city: branchCode?.city
                }
              : createBranchInitialValues
          }
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createBranchSchema}
          enableReinitialize
        >
          {({ setFieldValue }) => (
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
                    />
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
                    />
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
                      onChange={(e: any) => handleBranchType(e, setFieldValue)}
                    />
                  </Grid>
                  {showMainBranch === 2 && (
                    <Grid mb={1} item mobile={12}>
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '285px' : '100%'),
                          fontSize: '14px'
                        }}
                        name="mBranchCode"
                        options={mappedBranches}
                        label="Main Branch"
                      />
                    </Grid>
                  )}
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
                    />
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
                      name="phone"
                      placeholder="Enter Phone Number"
                      label="Phone Number"
                    />
                  </Grid>
                  <DynamicSelectFields
                    mappedCountries={mappedCountries}
                    mappedResidentStates={mappedResidentStates}
                    mappedResidentTowns={mappedResidentTowns}
                    isMobile={isMobile}
                    setWidth={setWidth}
                    residentDetails={residentDetails}
                    setResidentDetails={setResidentDetails}
                  />
                </Grid>
              </Box>
              <button
                id="submitButton"
                type="submit"
                style={{ display: 'none' }}
              >
                submit alias
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
