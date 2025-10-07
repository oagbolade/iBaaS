'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import {
  BatchContainer,
  BatchTitle,
  chargeContentStyle,
  PostingContainer
} from './style';
import { MobilePreviewContent } from './BatchPosting';
import { PreviewContentOne } from './CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useCreateChargeConcession } from '@/api/operation/useChargeConcession';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { chargeConcessionInitialValues } from '@/schemas/schema-values/operation';
import { chargeConcession } from '@/schemas/operation';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { queryKeys } from '@/react-query/constants';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { toast } from '@/utils/toast';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { FormSkeleton } from '@/components/Loaders';

type Props = {
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  charges?: IChargeConcessionType[] | Array<any>;
};
type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};

export const ChargeConcession = ({
  isSubmitting,
  setIsSubmitting,
  charges
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);

  const { mutate, isPending } = useCreateChargeConcession();
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const [chargeConcessions, setChargeConcessions] = useState<
    Partial<IChargeConcessionType>
  >({
    chargeAmt: 0,
    chargeCode: ''
  });

  const { mappedChargeConcessionType } = useMapSelectOptions({
    charges
  });
  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(accountNumber) || ''
  );
  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values,
      OriginatingAccount: accountNumber as string,
      chargetype: chargeConcessions.chargeCode as string,
      chargeamount: chargeConcessions.chargeAmt as number
    });
  };
  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting]);

  return (
    <Formik
      initialValues={chargeConcessionInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={chargeConcession}
    >
      <Form>
        <Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Charge Concession" styles={BatchTitle} />
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                  mb={5}
                >
                  <FormTextInput
                    name="accountnumber"
                    placeholder="Enter Account Number"
                    label="Account Number"
                    value={accountNumber?.toString()}
                    onChange={handleAccountNumber}
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectInput
                    name="chargetype"
                    options={mappedChargeConcessionType}
                    label="Charge"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedCharge = charges?.find(
                        (charge) => charge.chargeCode === e.target.value
                      );
                      setChargeConcessions((prev) => ({
                        ...prev,
                        chargeAmt: selectedCharge?.chargeAmt || 0,
                        chargeCode: selectedCharge?.chargeCode || ''
                      }));
                    }}
                    value={chargeConcessions?.chargeCode}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="chargeamount"
                    placeholder="Enter charge amount"
                    label="Charge Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    value={chargeConcessions?.chargeAmt?.toString()}
                    disabled
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    name="amount"
                    placeholder="Enter amount"
                    label="Concession Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={PostingContainer} ml={{ desktop: 1, mobile: 5 }}>
              {isMobile ? (
                <MobilePreviewContent
                  PreviewContent={
                    <PreviewContentOne accountDetails={accountData} />
                  }
                  customStyle={{ ...chargeContentStyle }}
                />
              ) : (
                <PreviewContentOne accountDetails={accountData} />
              )}{' '}
            </Box>
          </Box>
        </Grid>
        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
