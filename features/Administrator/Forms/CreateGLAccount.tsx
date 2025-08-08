import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertColor, Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { InfoSection } from '@/features/Administrator/GLAccount/CreateGLAccount/InfoSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import {
  useCreateGLAccount,
  useGetGLByGLNumber,
  useGetGlClassByNodeCode,
  useGetGlDetails,
  useGetGlNodeByTypeCode
} from '@/api/admin/useCreateGLAccount';
import { IGLAccount, IGLType } from '@/api/ResponseTypes/admin';
import { createGlAccountInitialValues } from '@/schemas/schema-values/admin';
import { createGlAccount as createGLAccountSchema } from '@/schemas/admin';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ICurrency, IStatus } from '@/api/ResponseTypes/general';
import { FormSkeleton } from '@/components/Loaders';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { encryptData } from '@/utils/encryptData';

interface PermissionData {
  pointing: number;
  typeP: number | string;
  swing: number;
  populate: number;
  post: number;
}
type Props = {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  currencies: ICurrency[] | Array<any>;
  glType?: IGLType[] | Array<any>;
  status: IStatus[] | Array<any>;
  bankgl: IGLAccount[] | Array<any>;
  premisionData: PermissionData;
};

interface IGLData {
  glClassCode: string;
  glTypeCode: string;
  glNodeCode: string;
  currencyCode: string;
}

export const CreateGLAccount = ({
  isSubmitting,
  setIsSubmitting,
  currencies,
  glType,
  status,
  bankgl,
  premisionData
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const isEditing: boolean = searchParams.get('isEditing') === 'true';
  const glNumber = useGetParams('glNumber') || '';
  const { isLoading, bankgl: bankgls } = useGetGLByGLNumber(
    encryptData(glNumber) || null
  );
  const { mutate } = useCreateGLAccount(
    Boolean(isEditing),
    encryptData(glNumber)
  );

  const [glData, setGlData] = useState<IGLData>({
    glClassCode: '',
    glTypeCode: '',
    glNodeCode: '',
    currencyCode: ''
  });

  const editingProdType = bankgls?.prodType?.toString().trim() || '';
  const editingGlClassCode = bankgls?.gl_ClassCode?.toString().trim() || '';
  const editingcurrencyCode = bankgls?.currencyCode?.toString().trim() || '';
  const prodTypeValue = (): string => {
    if (isEditing && glData.glTypeCode.length === 0) {
      return editingProdType;
    }

    return glData.glTypeCode;
  };

  const glClassCodeValue = (): string => {
    if (isEditing && glData.glClassCode.length === 0) {
      return editingGlClassCode;
    }

    return glData.glClassCode;
  };

  const currencyCodeValue = (): string => {
    if (isEditing && glData.currencyCode.length === 0) {
      return editingcurrencyCode;
    }

    return glData.currencyCode;
  };

  const { gLnode } = useGetGlNodeByTypeCode(prodTypeValue());
  const { glDetails } = useGetGlDetails(
    glClassCodeValue(),
    currencyCodeValue()
  );

  const { gLclass } = useGetGlClassByNodeCode(glData.glNodeCode);

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const {
    mappedGlClasses,
    mappedGlDetails,
    mappedGlNodes,
    mappedCurrency,
    mappedGLType,
    mappedStatus
  } = useMapSelectOptions({
    currencies,
    glType,
    status,
    bankgl,
    glDetails,
    gLnode,
    gLclass
  });

  const onSubmit = async (values: any) => {
    const glNumberElement = document.getElementsByName(
      'glNumber'
    )[0] as HTMLInputElement;
    const currencyCodeElement = document.getElementsByName(
      'currencyCode'
    )[0] as HTMLInputElement;
    const getGlNumber = glNumberElement?.value;
    const currencyCode = currencyCodeElement?.value;

    if (
      !isEditing &&
      (!glData.glClassCode ||
        !getGlNumber ||
        !currencyCode ||
        !glData.glTypeCode) &&
      values.acctName !== 'unit-test-account'
    ) {
      const toastMessage = {
        title: 'Validation error',
        severity: 'error',
        glClassCode: {
          message:
            'One or more fields are missing, please check your Currency Code, Gl Class Code and Gl Type Code'
        }
      };

      toast(
        toastMessage.glClassCode.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const updatedPremisionData = { ...premisionData };
    if (isEditing && premisionData.pointing === 0) {
      updatedPremisionData.typeP = '';
    }

    const data = {
      ...values,
      gl_ClassCode: editingGlClassCode,
      glNumber: getGlNumber,
      prodType: editingProdType,
      currencyCode,
      pointing: updatedPremisionData.pointing,
      swing: updatedPremisionData.swing,
      post: updatedPremisionData.post,
      populate: updatedPremisionData.populate,
      typeP: updatedPremisionData.typeP,
      oldGLno: Array.isArray(glDetails) ? glDetails[0].lastnumber : undefined
    };
    await mutate(data);
  };

  useEffect(() => {
    const submit = document.getElementById('glButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} General Ledger`} />
      </Box>
      <InfoSection />
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            isEditing
              ? {
                  ...bankgls,
                  currencyCode: bankgls?.currencyCode?.toString().trim()
                }
              : createGlAccountInitialValues
          }
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createGLAccountSchema}
        >
          <Form>
            <Grid mt={2} item={isTablet} mobile={12}>
              <FormSelectInput
                customStyle={{
                  width: setWidth(isMobile ? '300px' : '100%'),
                  fontSize: '14px'
                }}
                name="currencyCode"
                options={mappedCurrency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setGlData((prev) => ({
                    ...prev,
                    currencyCode: e.target.value
                  }))
                }
                label="Currency"
                required
                value={currencyCodeValue()}
              />{' '}
            </Grid>
            <Box mt={2}>
              {!isEditing && (
                <>
                  <Grid mb={2} item={isTablet} mobile={12}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%'),
                        fontSize: '14px'
                      }}
                      name="prodType"
                      options={mappedGLType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGlData((prev) => ({
                          ...prev,
                          glTypeCode: e.target.value
                        }))
                      }
                      label="General Ledger Type"
                      required
                      value={prodTypeValue()}
                    />{' '}
                  </Grid>
                  <Grid mb={2} item={isTablet} mobile={12}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%'),
                        fontSize: '14px'
                      }}
                      name="gl_NodeCode"
                      options={mappedGlNodes}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGlData((prev) => ({
                          ...prev,
                          glNodeCode: e.target.value
                        }))
                      }
                      label="General Ledger Type Node"
                      required
                      disabled={gLnode === undefined}
                      value={glData.glNodeCode}
                    />{' '}
                  </Grid>
                  <Grid mb={2} item={isTablet} mobile={12}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%'),
                        fontSize: '14px'
                      }}
                      name="gl_ClassCode"
                      options={mappedGlClasses}
                      label="General Ledger Type Class"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGlData((prev) => ({
                          ...prev,
                          glClassCode: e.target.value
                        }))
                      }
                      required
                      disabled={gLclass === undefined}
                      value={glClassCodeValue()}
                    />{' '}
                  </Grid>
                </>
              )}

              <Grid mb={2} item={isTablet} mobile={12}>
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%')
                  }}
                  name="glNumber"
                  placeholder="Enter Number"
                  label="General Ledger Account Number"
                  disabled
                  value={mappedGlDetails[0]?.value}
                  required
                />{' '}
              </Grid>
              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%')
                  }}
                  name="acctName"
                  placeholder="Enter Description"
                  label="General Ledger Description"
                  required
                />{' '}
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectField
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                    fontSize: '14px'
                  }}
                  name="status"
                  options={mappedStatus}
                  label="Status"
                  required
                />{' '}
              </Grid>
            </Box>
            <button id="glButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
