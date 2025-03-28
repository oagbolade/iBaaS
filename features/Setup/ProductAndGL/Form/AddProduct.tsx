'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Form, Formik, getIn } from 'formik';
import { useSearchParams } from 'next/navigation';
import { ProgressType, ShortCardWithAccordion } from './ShortCardWithAccordion';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useCreateDemandDepositProduct,
  useCreateLoanAccountProduct,
  useGetDemandDepositByCode,
  useGetLoanProductByCode
} from '@/api/setup/useProduct';
import { createLoanAccountInitialValues } from '@/schemas/schema-values/setup';
import {
  createDepartmentSchema,
  createLoanProductSchema
} from '@/schemas/setup';
import { PageTitle } from '@/components/Typography';
import { BatchTitle } from '@/features/Operation/Forms/style';

import { encryptData } from '@/utils/encryptData';
import { FormSkeleton } from '@/components/Loaders';
import useFormProgress from '@/utils/hooks/useFormProgress';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];
type Props = {
  productId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};
export const AddNewProduct = ({
  productId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const requiredFields: Record<string, string[]> = {
    personalDetails: [
      'productCode',
      'productName',
      'minloan',
      'currencycode',
      'productstart',
      'productExpire',
      'appType',
      'term',
      'shortname'
    ],
    interestCharges: [
      'maxintrate',
      'actualRate',
      'penalrate',
      'minloan',
      'moratorium',
      'collval',
      'schtype',
      'loanclass',
      'chargecode',
      'actualRateCalcMethod',
      'penalrateCalcMethod',
      'exceptioncode',
      'shortName'
    ],
    generalLedge: [
      'accountNumber',
      'principalbalance',
      'susinterest',
      'intaccrual',
      'interestincome',
      'interbr',
      'penalIntAccrual',
      'interestReceivable',
      'susprinc',
      'uid',
      'micincome',
      'penalInterest',
      'penalSuspense'
    ],
    otherDetails: ['manageCollection', 'allowOD', 'postnodebit'],
    document: ['docIds']
  };

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { loanProducts, isLoading } = useGetLoanProductByCode(
    encryptData(productId as string)
  );
  const { mutate } = useCreateLoanAccountProduct(
    Boolean(isEditing),
    encryptData(productId as string)
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const prodDocuments = values.docIds.map((docId: string) => ({
      docId
    }));
    const prodException = values?.exceptioncode?.map(
      (exceptioncode: string) => ({
        exceptioncode
      })
    );
    const prodCharges = values?.chargecode?.map((chargecode: string) => ({
      chargecode
    }));
    await mutate({
      ...values,
      ProdDocuments: [
        {
          prodDocuments
        }
      ],
      ProdCharges: [
        {
          prodCharges
        }
      ],
      ProdException: [
        {
          prodException
        }
      ]
    });
  };

  React.useEffect(() => {
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
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginBottom: '40px' }}>
          <PageTitle
            title={`${isEditing ? 'Edit Loan Product' : 'Loan Product Setup'}`}
            styles={BatchTitle}
          />
        </Box>

        <Formik
          initialValues={loanProducts || createLoanAccountInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {({ values }) => {
            const completed = useFormProgress({ requiredFields, values });
            return (
              <Form>
                <ShortCardWithAccordion
                  cardTitle="Product Basic Details"
                  cardKey="personalDetails"
                  completed={completed}
                />
                <ShortCardWithAccordion
                  cardTitle="Interest Charges and Exceptions"
                  cardKey="interestCharges"
                  completed={completed}
                />
                <ShortCardWithAccordion
                  cardTitle="Documents"
                  cardKey="document"
                  completed={completed}
                />
                <ShortCardWithAccordion
                  cardTitle="General Ledger"
                  cardKey="generalLedge"
                  completed={completed}
                />
                <ShortCardWithAccordion
                  cardTitle="Other Details"
                  cardKey="otherDetails"
                  completed={completed}
                />

                <button
                  id="submitButton"
                  type="submit"
                  style={{ display: 'none' }}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
