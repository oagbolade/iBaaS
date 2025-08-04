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
import { createDemandDepositInitialValues } from '@/schemas/schema-values/setup';
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
    personalDetails: [
      'dayint',
      'taxabsorbed1',
      'maxamt',
      'minintbalance',
      'closeBalance',
      'shortname',
      'appType',
      'openbalance',
      'productName',
      'productclass'
    ],

    interestCharges: [
      'interestIncome',
      'withallowed',
      'drType',
      'crtype',
      'ProdException'
    ],

    generalLedge: [
      'accountNumber',
      'liabilityBal',
      'suspendedAsset',
      'assetBalance',
      'interestReceivable',
      'unearnincome',
      'interestExpense',
      'interestIncome',
      'suspendedIntIncome',
      'interestPayable',
      'interbr',
      'taxabsorbed1',
      'acctClosegl',
      'liabilityBal'
    ],

    otherDetails: ['floor', 'minAge', 'maxAge'],

    document: []
  };
  const isEditing = useGetParams('isEditing') || null;
  const { mutate } = useCreateTreasuryAccountProduct(
    Boolean(isEditing),
    decryptData(productCode as string)
  );
  const { loanProducts, isLoading } = useGetTreasuryProductByCode(
    decryptData(productCode as string)
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    values.ProdException = values.ProdException.map((resp: string) => ({
      exceptioncode: resp
    }));
    values.ProdCharges = values.ProdCharges.map((resp: string) => ({
      chargecode: resp
    }));
    values.ProdDocuments = values.ProdDocuments.map((resp: string) => ({
      docId: resp.trim()
    }));

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
          initialValues={loanProducts || createDemandDepositInitialValues}
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
                <ShortCardTreasuryWithAccordion
                  cardTitle="Documents"
                  cardKey="document"
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
