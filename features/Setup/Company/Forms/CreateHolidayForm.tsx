/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form, useFormikContext } from 'formik';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormikDateTimePicker,
  FormikRadioButton,
  FormTextInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { createHolidayInitialValue } from '@/schemas/schema-values/setup';
import {
  useCreateHoliday,
  useGetHolidayById
} from '@/api/setup/useCreateHoliday';
import { createHolidaySchema } from '@/schemas/setup';
import { decryptData } from '@/utils/decryptData';
import { formatFormikDatePickerToISO } from '@/utils/convertDateToISOFormat';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

type Props = {
  holidayId?: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateHolidayForm = ({
  holidayId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateHoliday(
    Boolean(isEditing),
    decryptData(holidayId as string)
  );
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [endDateValue, setEndDateValue] = useState('');
  const { holiday, isLoading } = useGetHolidayById(
    decryptData(holidayId as string) || null
  );

  const onSubmit = async (values: any) => {
    await mutate({
      ...values,
      holidaydate: formatFormikDatePickerToISO(dayjs(values.holidaydate)),
      holidayends: formatFormikDatePickerToISO(dayjs(values.holidayends))
    });
  };

  const AutoCalculateEndDate = () => {
    const { values, setFieldValue } = useFormikContext<any>();
    useEffect(() => {
      const today = values.holidaydate ? dayjs(values.holidaydate) : dayjs();
      const holidayDays = parseInt(values.holidaydays, 10);
      if (holidayDays && today.isValid()) {
        const endDate = today.add(holidayDays, 'day').format('MM/DD/YYYY');
        setFieldValue('holidayends', endDate);
      } else {
        setFieldValue('holidayends', ''); // Clear end date if input is invalid
      }
    }, [values.holidaydate, values.holidaydays, setFieldValue]);
    return null;
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Holiday`} />
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
              ? { ...holiday, holidaydate: dayjs(holiday?.holidaydate) }
              : createHolidayInitialValue
          }
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createHolidaySchema}
        >
          <Form>
            <AutoCalculateEndDate />
            <Box mt={4}>
              <Grid container>
                {isEditing && (
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="id"
                      placeholder="+234"
                      label="Holiday Code"
                      required
                      disabled
                    />{' '}
                  </Grid>
                )}
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="holidaydesc"
                    placeholder="Enter holiday description"
                    label="Description"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <FormikDateTimePicker
                      value={dayjs(holiday?.holidaydate)}
                      label="Start Date"
                      name="holidaydate"
                    />
                  </Box>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="holidaydays"
                    placeholder="Enter holiday days"
                    label="Holiday Days"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <FormTextInput
                      label="End Date"
                      name="holidayends"
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      disabled
                    />
                  </Box>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  mt={2}
                >
                  <RadioButtons
                    className="permissionOptions"
                    options={[
                      { label: 'Active', value: '0' },
                      { label: 'Inactive', value: '1' }
                    ]}
                    title="Holiday Status"
                    name="holidaystatus"
                    value="0"
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
    </Box>
  );
};
