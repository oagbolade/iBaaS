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
import { useCurrentBreakpoint, frequencyOptions, fetchFrequencyOptions } from '@/utils';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import colors from '@/assets/colors';
import { useTerminateOverdraft } from '@/api/loans/useCreditFacility';
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

export const TermianteOverdraftForm = ({
  setIsSubmitting,
  isSubmitting,
  accountNumber,
  branches,
  accDetailsResults
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { setDirection } = useSetDirection();
  const searchParams = useSearchParams();
  const oldAccountNumber = searchParams.get('oldAccountNumber') ?? '';
  const { mutate } = useTerminateOverdraft();
  const detail = searchParams.get('odDetail') || '';
  const odAccDetails = JSON.parse(detail);

  const { mappedBranches } = useMapSelectOptions({
    branches: branches ?? []
  });

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
      odNumber: odAccDetails.odNumber,
      interestAmount: '', // This will be system generated
      oldAccountNumber
    };
    mutate(data);
    setIsSubmitting(false);
  };

  const {
    branchCode: branch,
    tenor: term,
    facilityType,
    frequency
  } = odAccDetails;

  return (
    <Box>
      <Box>
        <Stack direction={setDirection()}>
          <Box
            sx={{
              width: { mobile: '100%', desktop: '624px' },
              padding: '32px'
            }}
          >
            <Box>
              <LargeTitle title="Terminate Overdraft" />
            </Box>

            <Formik
              initialValues={{
                ...odAccDetails,
                branch,
                term,
                facilityType: facilityType === 'OD' ? '1' : '2',
                frequency: fetchFrequencyOptions(frequency)
              }}
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                      disabled
                    />{' '}
                    <Grid item={isTablet} mobile={12}>
                      <FormikDateTimePicker
                        label="Posting Date"
                        name="reportDate"
                        value={dayjs(odAccDetails.reportDate)}
                        disabled
                      />
                    </Grid>
                    <Grid item={isTablet} mobile={12}>
                      <FormikDateTimePicker
                        label="Start Date"
                        name="effectiveDate"
                        value={dayjs(odAccDetails.effectiveDate)}
                        disabled
                      />
                    </Grid>
                    <Grid item={isTablet} mobile={12}>
                      <FormikDateTimePicker
                        label="Expiry Date"
                        name="expiryDate"
                        value={dayjs(odAccDetails.expiryDate)}
                        disabled
                      />
                    </Grid>
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
      </Box>
    </Box>
  );
};
