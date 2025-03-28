import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { ISector } from '@/api/ResponseTypes/setup';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  useCreateIndustry,
  useGetIndustryByCode
} from '@/api/setup/useIndustry';
import { createIndustryInitialValue } from '@/schemas/schema-values/setup';
import { createIndustrySchema } from '@/schemas/setup';
import { useGetStatus } from '@/api/general/useStatus';
import { IStatus } from '@/api/ResponseTypes/general';

import { encryptData } from '@/utils/encryptData';

type Props = {
  industryId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  sectors?: ISector[];
  status?: IStatus[] | Array<any>;
};

export const CreateIndustryForm = ({
  industryId,
  isSubmitting,
  setIsSubmitting,
  sectors,
  status
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedSectors, mappedStatus } = useMapSelectOptions({
    sectors,
    status
  });

  const { industry, isLoading } = useGetIndustryByCode(
    encryptData(industryId as string)
  );
  const industryData = {
    industryCode: industry?.industryCode?.trim() || '',
    industryMne: industry?.industryMne?.trim() || '',
    industryName: industry?.industryName?.trim() || '',
    sector: industry?.sector?.trim() || ''
  };
  const { mutate } = useCreateIndustry(
    Boolean(isEditing),
    encryptData(industryId as string)
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Industry`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={isEditing ? industryData : createIndustryInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createIndustrySchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="industryName"
                    placeholder="Enter Industry Name"
                    label="Industry Name"
                    required
                  />{' '}
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
                    name="industryMne"
                    placeholder="Enter industry Mnemonic"
                    label="Industry Mnemonic"
                    required
                  />{' '}
                </Grid>

                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="sector"
                    options={mappedSectors}
                    label="Sector"
                  />{' '}
                </Grid>

                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="status"
                    options={mappedStatus}
                    label="Status"
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
