import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { ZoneDaysPicker } from '../ZoneSetup/CreateZoneSetup/ZoneDaysPicker';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { useCreateZone, useGetZoneById } from '@/api/setup/useZone';
import { createZoneInitialValues } from '@/schemas/schema-values/setup';
import { createZoneSchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';
import { useGetSystemDate } from '@/api/general/useSystemDate';

type Props = {
  zoneId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

type DayofTheWeek = '1' | '2' | '3' | '4' | '5' | '6' | '7';

const transformDaysToNumber = (days: Array<DayofTheWeek>): number => {
  return days.reduce((acc, day) => acc * 10 + Number(day), 0);
};

export const CreateZoneSetupForm = ({
  zoneId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const [selectedDays, setSelectedDays] = React.useState<Array<DayofTheWeek>>([
    '1'
  ]);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { sysmodel } = useGetSystemDate();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { zone, isLoading } = useGetZoneById(
    encryptData(zoneId as string) || null
  );
  const { mutate } = useCreateZone(
    Boolean(isEditing),
    encryptData(zoneId as string)
  );

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values,
      nodays: transformDaysToNumber,
      authid: sysmodel?.approvingOfficer
    });
  };

  const handleSelectedDays = (day: DayofTheWeek) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }

      return [...prevSelectedDays, day];
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
        <LargeTitle title={`${isEditing ? 'Edit Zone' : 'Add New Zone'}`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={zone || createZoneInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createZoneSchema}
        >
          <Form>
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
                      name="zoneid"
                      placeholder="+234"
                      label="Zone Code"
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
                    name="zoneName"
                    placeholder="Enter Zone Name"
                    label="Zone Name"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  mt={2}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="nodays"
                    placeholder="Enter Zone days"
                    label="Zone Days"
                    required
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
