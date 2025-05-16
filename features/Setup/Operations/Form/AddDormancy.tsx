'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { GLAccountPreviewContent } from './GLPreviewContent/GlAccountPreview';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSkeleton } from '@/components/Loaders';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProductType } from '@/api/ResponseTypes/general';
import { EditOperations } from '@/constants/OperationOptions';
import {
  useCreateDormancy,
  useGetDormancyByCode
} from '@/api/setup/useDormancy';
import { createDormancyInitialValue } from '@/schemas/schema-values/setup';
import { createDormancySchema } from '@/schemas/setup';
import { useGetGLByGLNumber } from '@/api/admin/useCreateGLAccount';
import { MobilePreviewContent } from '@/features/CustomerService/Form/CreateAccount';
import { chargeContentStyle } from '@/features/Operation/Forms/style';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  dormancyId: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  productTypes: IProductType[] | Array<any>;
};

export const AddDormancy = ({
  dormancyId,
  isSubmitting,
  setIsSubmitting,
  productTypes
}: Props) => {
  const searchParams = useSearchParams();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const isEditing = searchParams.get('isEditing');
  const [selectedDuration, setSelectedDuration] = React.useState('');

  const { mutate } = useCreateDormancy(
    Boolean(isEditing),
    decryptData(dormancyId) || null
  );
  const { dormancyData, isLoading } = useGetDormancyByCode(
    decryptData(dormancyId) || null
  );
  const { mappedProductType } = useMapSelectOptions({
    productTypes
  });
  const [penaltyAccount, setPenaltyAccount] = React.useState<string | null>(
    null
  );
  const [productType, setProductType] = React.useState<string | null>(null);

  const { bankgl: accountData } = useGetGLByGLNumber(
    encryptData(penaltyAccount) || ''
  );

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values,
      narration: values.narration
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

  const handlePenaltyAccountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPenaltyAccount(e.target.value);
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const productTypeName = mappedProductType.find(
      (item) => item.value === selectedValue
    )?.name;
    setProductType(productTypeName || null);
  };
  React.useEffect(() => {
    if (EditOperations.duration.length > 0) {
      const monthOption = EditOperations.duration.find((option) =>
        option.name.toLowerCase()
      );
      const defaultValue =
        monthOption?.name || EditOperations.duration[0]?.name;
      setSelectedDuration(defaultValue);
    }
  }, []);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Dormancy`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={dormancyData || createDormancyInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createDormancySchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <Box sx={{ display: 'flex' }}>
                <Box mt={4} sx={{ width: '960px', height: '100px' }}>
                  <Grid container>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormSelectField
                        name="prodCode"
                        options={mappedProductType}
                        label="Select Product Type"
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '120%')
                        }}
                        onChange={(e: any) => {
                          setFieldValue('prodCode', e.target.value);
                          handleProductTypeChange(e);
                        }}
                      />
                    </Grid>
                    {/* Combine Timeframe and Duration Plan side by side */}
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item mobile={6}>
                          <FormTextInput
                            name="durations"
                            placeholder="Enter Timeframe"
                            label="Duration Plan"
                            customStyle={{
                              width: setWidth(isMobile ? '100%' : '100%')
                            }}
                            disabled
                            value={selectedDuration.toLowerCase()}
                          />
                        </Grid>
                        <Grid item mobile={6}>
                          <FormTextInput
                            name="duration"
                            placeholder="Enter Timeframe"
                            label="Timeframe"
                            customStyle={{
                              width: setWidth(isMobile ? '100%' : '140%')
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormTextInput
                        name="narration"
                        placeholder="Enter Dormancy Criteria"
                        label="Dormancy Criteria"
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '120%')
                        }}
                        value={productType as string}
                      />
                    </Grid>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormTextInput
                        name="prodCode"
                        placeholder="Enter Product Code"
                        label="Product Code"
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '120%')
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormTextInput
                        name="penalty"
                        placeholder="Enter Penalty Amount"
                        label="Penalty Amount"
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '120%')
                        }}
                      />
                    </Grid>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                      mb={5}
                    >
                      <FormTextInput
                        name="penaltyGlAccount"
                        placeholder="Enter Penalty GL Account Number"
                        label="Penalty GL Account Number"
                        value={penaltyAccount?.toString()}
                        onChange={handlePenaltyAccountChange}
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '120%')
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box ml={{ desktop: 20, mobile: 5 }}>
                  {isMobile ? (
                    <MobilePreviewContent
                      PreviewContent={
                        <GLAccountPreviewContent
                          accountDetails={accountData as any}
                        />
                      }
                      customStyle={{ ...chargeContentStyle }}
                    />
                  ) : (
                    <GLAccountPreviewContent
                      accountDetails={accountData as any}
                    />
                  )}
                </Box>
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
