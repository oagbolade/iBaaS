'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Form, Formik,  } from 'formik';
import dayjs from 'dayjs';
import { ShortCardCasaWithAccordion } from '../AddCasaProduct/ShortCardWithCasaAccording';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useCreateDemandDepositProduct,
  useGetDemandDepositByCode
} from '@/api/setup/useProduct';
import { createDemandDepositInitialValues } from '@/schemas/schema-values/setup';
import { PageTitle } from '@/components/Typography';
import { BatchTitle } from '@/features/Operation/Forms/style';

import { decryptData } from '@/utils/decryptData';
import useFormProgress from '@/utils/hooks/useFormProgress';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ICurrency } from '@/api/ResponseTypes/general';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];
type Props = {
  productCode: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  currencies?: ICurrency[] | Array<any>;
};

export const AddCasaNewProduct = ({
  productCode,
  isSubmitting,
  setIsSubmitting,
  currencies
}: Props) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const {
    mappedCurrency,
  } = useMapSelectOptions({
    currencies
  });
  const requiredFields: Record<string, string[]> = {
    personalDetails: [
      'dayint',
      'maxamt',
      'minintbalance',
      'closeBalance',
      'shortname',
      'appType',
      'openbalance',
      'productName',
      'productclass',
      'penal'
    ],

    interestCharges: [
      'dayint',
      'withallowed',
      'drType',
      'crtype',
      'ProdException'
    ],

    generalLedge: [
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
  React.useEffect(() => {
    if (mappedCurrency.length > 0) {
      const defaultCurrency =
        mappedCurrency.find((c) =>
          ['001', '001', '001'].some(
            (keyword) =>
              c.name.toLowerCase().includes(keyword) ||
              c.value.toLowerCase().includes(keyword)
          )
        )?.value ||
        mappedCurrency[0]?.value ||
        '';

      setSelectedCurrency(defaultCurrency);
    }
  }, [mappedCurrency]);
  const isEditing = useGetParams('isEditing') || null;
  const { mutate } = useCreateDemandDepositProduct(
    Boolean(isEditing),
    decryptData(productCode as string)
  );
  const { sysmodel } = useGetSystemDate();
  const systemDate = dayjs(sysmodel?.systemDate || new Date());
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
      ...values,
      productExpire: systemDate,
      productstart: systemDate,
      currencycode: selectedCurrency
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
  }, [isSubmitting, setIsSubmitting]);

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
