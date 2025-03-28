'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FormSkeleton } from '@/components/Loaders';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { useGetGlNodeById, useCreateGlNode } from '@/api/setup/useGeneralNode';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { createGlNodeInitialValue } from '@/schemas/schema-values/setup';
import { createNodeSchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';
import { IGLNode, IGLTypeClass } from '@/api/ResponseTypes/setup';
import { IGLType } from '@/api/ResponseTypes/admin';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  nodeId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  prodCode: string | null;
  glType: IGLType[] | Array<any>;
};

export const CreateGLNode = ({
  nodeId,
  isSubmitting,
  setIsSubmitting,
  prodCode,
  glType
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const { mappedGLType } = useMapSelectOptions({ glType });
  const [glNodeCode, setGlNodeCode] = useState('');
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateGlNode(
    Boolean(isEditing),
    encryptData(nodeId),
    encryptData(prodCode)
  );
  const { node, isLoading } = useGetGlNodeById(
    encryptData(nodeId as string) || null
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values
    });
  };
  const handleSelectedChange = (e: any) => {
    const selectedGlType = glType.find(
      (type) => type.prodTypeCode === e.target.value
    );
    if (selectedGlType) {
      const newGlNodeCode = `${selectedGlType.prodTypeCode}`; // Prepopulate with glClassCode
      setGlNodeCode(newGlNodeCode);
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

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} GL Node`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={node || createGlNodeInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createNodeSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormSelectField
                    name="gL_NodeCodes"
                    options={mappedGLType}
                    label="GL  Type"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    onChange={handleSelectedChange}
                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="gL_NodeCode"
                    placeholder="Enter GL Node Code"
                    label="GL Node Code"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    onChange={(e) => {
                      if (e.target.value.length <= glNodeCode.length + 3) {
                        setGlNodeCode(e.target.value);
                      }
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="gL_NodeName"
                    placeholder="Enter GL Node Name"
                    label="GL Node Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
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
