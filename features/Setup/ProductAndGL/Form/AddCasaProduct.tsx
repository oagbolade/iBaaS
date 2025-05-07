'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Form, Formik, getIn } from 'formik';
import { useSearchParams } from 'next/navigation';
import { ShortCardCasaWithAccordion } from '../AddCasaProduct/ShortCardWithCasaAccording';
import { ProgressType } from './ShortCardWithAccordion';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useCreateDemandDepositProduct,
  useGetDemandDepositByCode
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

export const AddCasaNewProduct = ({
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
      'statecode',
      'appType',
      'productExpire',
      'productstart',
      'currencycode',
      'openbalance',
      'productName',
      'productclass'
    ],

    interestCharges: [
      'interbr',
      'currencycode',
      'interestIncome',
      'withallowed',
      'drType',
      'crtype'
    ],

    generalLedge: [
      'acctClosegl',
      'taxabsorbed1',
      'interbr',
      'interestPayable',
      'suspendedIntIncome',
      'interestIncome',
      'interestExpense',
      'liabilityBal',
      'unearnincome',
      'interestReceivable',
      'assetBalance',
      'suspendedAsset',
      'liabilityBal'
    ],

    otherDetails: [
      'floor',
      'penal',
      'maxamt',
      'maxAge',
      'minAge',
      'checkBook',
      'sweepIn',
      'si',
      'od',
      'lien',
      'stateInactive'
    ],

    document: ['docId']
  };
  const isEditing = useGetParams('isEditing') || null;
  const { mutate } = useCreateDemandDepositProduct(
    Boolean(isEditing),
    decryptData(productCode as string)
  );
  const { demandDeposit, isLoading } = useGetDemandDepositByCode(
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
            title={`${isEditing ? 'Edit Casa Product' : 'Casa Product Setup'}`}
            styles={BatchTitle}
          />
        </Box>

        <Formik
          initialValues={demandDeposit || createDemandDepositInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {({ values }) => {
            const completed = useFormProgress({ requiredFields, values });

            return (
              <Form>
                <ShortCardCasaWithAccordion
                  cardTitle="Product Basic Details"
                  cardKey="personalDetails"
                  completed={completed}
                />
                <ShortCardCasaWithAccordion
                  cardTitle="Interest Charges and Exceptions"
                  cardKey="interestCharges"
                  completed={completed}
                />
                <ShortCardCasaWithAccordion
                  cardTitle="General Ledger"
                  cardKey="generalLedge"
                  completed={completed}
                />
                <ShortCardCasaWithAccordion
                  cardTitle="Other Details"
                  cardKey="otherDetails"
                  completed={completed}
                />
                <ShortCardCasaWithAccordion
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
