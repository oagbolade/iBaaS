'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Form, Formik, getIn } from 'formik';
import { useSearchParams } from 'next/navigation';
import { ShortCardCasaWithAccordion } from '../AddCasaProduct/ShortCardWithCasaAccording';
import { ShortCardTreasuryWithAccordion } from '../AddTreasuryProduct/ShortCardWithTreasuryAccording';
import { ProgressType } from './ShortCardWithAccordion';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useCreateDemandDepositProduct,
  useCreateTreasuryAccountProduct,
  useGetDemandDepositByCode,
  useGetTreasuryProductByCode
} from '@/api/setup/useProduct';
import {
  createDemandDepositInitialValues,
  createTreasuryccountInitialValues
} from '@/schemas/schema-values/setup';
import {
  createCasaProductSchema,
  createDepartmentSchema
} from '@/schemas/setup';
import { PageTitle } from '@/components/Typography';
import { BatchTitle } from '@/features/Operation/Forms/style';

import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';
import useFormProgress from '@/utils/hooks/useFormProgress';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];
type Props = {
  productCode: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const AddTreasuryNewProduct = ({
  productCode,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const requiredFields: Record<string, string[]> = {
    personalDetails: ['shortname', 'appType', 'productName', 'productclass'],

    interestCharges: [
      'crtype',
      'penalrate',
      'minterm',
      'maxterm',
      'repaymeth',
      'term',
      'discounted'
    ],

    generalLedge: [
      'intaccrual',
      'InterestExpense',
      'intIncome',
      'maturedGL',
      'principal',
      'interbr',
      'upfront',
      'PaymentGL',
      'suspint',
      'susprinc',
      'ttax',
      'ttax2'
    ],

    otherDetails: []

    // document: []
  };
  const isEditing = useGetParams('isEditing') || null;
  const { mutate } = useCreateTreasuryAccountProduct(
    Boolean(isEditing),
    decryptData(productCode as string)
  );
  const { termDeposit, isLoading } = useGetTreasuryProductByCode(
    decryptData(productCode as string)
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values
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
            title={`${isEditing ? 'Edit Treasury Product' : 'Treasury Product Setup'}`}
            styles={BatchTitle}
          />
        </Box>

        <Formik
          initialValues={termDeposit || createTreasuryccountInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {({ values }) => {
            const completed = useFormProgress({ requiredFields, values });

            return (
              <Form>
                <ShortCardTreasuryWithAccordion
                  cardTitle="Product Basic Details"
                  cardKey="personalDetails"
                  completed={completed}
                />
                <ShortCardTreasuryWithAccordion
                  cardTitle="Interest Charges and Exceptions"
                  cardKey="interestCharges"
                  completed={completed}
                />
                <ShortCardTreasuryWithAccordion
                  cardTitle="General Ledger"
                  cardKey="generalLedge"
                  completed={completed}
                />
                <ShortCardTreasuryWithAccordion
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
