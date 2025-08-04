/* eslint-disable no-constant-condition */
'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Stack, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { AccountInformation } from '@/features/CustomerService/Customer/CASAAccount/PreviewAccountInfo';
import { loanOverDraftSchema } from '@/schemas/loan/index';
import { setOverdraftInitialValues } from '@/schemas/schema-values/loan/';
import {
  useCurrentBreakpoint,
  frequencyOptions,
  fetchFrequencyOptions
} from '@/utils';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import colors from '@/assets/colors';
import { useSetOverdraft } from '@/api/loans/useCreditFacility';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { getStoredUser } from '@/utils/user-storage';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  accountNumber?: string;
  branches?: any;
  accDetailsResults?: any;
};

const PreviewContent: React.FC<{ accDetailsResults?: any }> = ({
  accDetailsResults
}) => {
  return (
    <Box
      mt={{ mobile: 0, desktop: 3 }}
      sx={{
        padding: { mobile: '0 30px', tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <AccountInformation accDetailsResults={accDetailsResults} />,
    </Box>
  );
};

export const SetOverDraft = ({
  setIsSubmitting,
  isSubmitting,
  accountNumber,
  branches,
  accDetailsResults
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { setDirection } = useSetDirection();
  const searchParams = useSearchParams();
  const actionType = searchParams.get('actionType') ?? '';

  const detail = searchParams.get('odDetail') || '{}';
  const odAccDetails = JSON.parse(detail);

  const {
    branchCode: branch,
    tenor: term,
    facilityType,
    frequency
  } = odAccDetails;

  const { mappedBranches } = useMapSelectOptions({
    branches: branches ?? []
  });
  const { mutate } = useSetOverdraft(actionType);

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }
    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  const user = getStoredUser();
  const userOVerDraftMenuid = Array.isArray(user?.menuItems)
    ? user.menuItems.find((resp: any) => resp.menu_id === 54)
    : null;

  const onSubmit = async (values: any) => {
    const { menuId, ...restValues } = values;
    const data: any = {
      ...restValues,
      menuId: userOVerDraftMenuid?.menu_id,
      accountNumber,
      interestAmount: 0, // This will be system generated,
      odNumber: odAccDetails.odNumber,
      freq: values.frequency
    };
    mutate(data);
    setIsSubmitting(false);
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'update':
        return 'Update Overdraft';
      default:
        return 'Set Overdraft';
    }
  };

  return (
    <Stack direction={setDirection()}>
      <Box
        sx={{
          width: { mobile: '100%', desktop: '624px' },
          padding: '32px'
        }}
      >
        <LargeTitle title={getTitle(actionType)} />

        <Formik
          initialValues={
            actionType === 'update'
              ? {
                  ...setOverdraftInitialValues,
                  ...odAccDetails,
                  branch,
                  term,
                  facilityType: facilityType === 'OD' ? '1' : '2',
                  frequency: fetchFrequencyOptions(frequency)
                }
              : setOverdraftInitialValues
          }
          validationSchema={loanOverDraftSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form>
            <Box mt={4}>
              <Grid>
                <Grid mb={2} item={isTablet} mobile={12}>
                  <FormSelectField
                    name="branch"
                    options={mappedBranches}
                    label="Branch"
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                  />
                </Grid>
                <Grid mb={2} item={isTablet} mobile={12}>
                  <FormSelectField
                    name="facilityType"
                    options={[
                      {
                        name: 'OD',
                        value: '1'
                      },
                      {
                        name: 'TOD',
                        value: '2'
                      }
                    ]}
                    label="Facility Type"
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interestRate"
                    placeholder="0"
                    label="Facilty Rate (% per month)"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="amount"
                    placeholder="0.0"
                    label="Facility Amount"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="penaltyRate"
                    placeholder="0"
                    label="Penal Rate"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="term"
                    placeholder=""
                    label="Facility Terms"
                    required
                  />{' '}
                </Grid>
                <FormSelectField
                  customStyle={{
                    width: setWidth(isMobile ? '350px' : '100%'),
                    fontSize: '14px'
                  }}
                  options={frequencyOptions}
                  name="frequency"
                  label="Frequency"
                />{' '}
                <Grid item={isTablet} mobile={12}>
                  <FormikDateTimePicker
                    label="Posting Date"
                    name="effectiveDate"
                    value={dayjs(odAccDetails.reportDate)}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormikDateTimePicker
                    label="Start Date"
                    name="effectiveDate"
                    value={dayjs(odAccDetails.effectiveDate)}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormikDateTimePicker
                    label="Expiry Date"
                    name="expiryDate"
                    value={dayjs(odAccDetails.expiryDate)}
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
      {isTablet && (
        <Box
          sx={{
            width: '477px',
            padding: '32px',
            gap: '24px',
            borderLeft: `1px solid ${colors.neutral300}`,
            background: `${colors.neutral100}`,
            display: {
              tablet: 'block',
              mobile: 'none'
            }
          }}
        >
          <LargeTitle title="Preview" />
          <Box mt={3} />
          <Box
            mt={{ mobile: 3 }}
            sx={{
              padding: { mobile: 6, tablet: 0 },
              alignItems: { mobile: 'center' }
            }}
          >
            <PreviewContent accDetailsResults={accDetailsResults} />
          </Box>
        </Box>
      )}
    </Stack>
  );
};
