import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { valutManagementSchema } from '@/schemas/operation';
import {
  VaultManagementInitialValues,
  VaultManagementValues
} from '@/schemas/schema-values/operation';
import { useCurrentBreakpoint } from '@/utils';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  useCreateVaultManagement,
  useForwardToApprovingOfficer,
  useGetTellerBalanceByUserId,
  useGetGldetailsByBranchCodeAndUserId,
  getTellerBalanceByUserTerllerNumber
} from '@/api/operation/useVaultManagement';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { getStoredUser } from '@/utils/user-storage';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { TellerAmountContext } from '@/context/TellerAmountContext';
import { encryptData } from '@/utils/encryptData';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  branches?: IBranches[];
};

export const SellToVault = ({
  branches,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const [branchCode, setBranchCode] = useState('');
  const { tellerNumber, setTellerNumber, tellerAmount, setTellerAmount } =
    useContext(TellerAmountContext);
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const toastActions = useContext(ToastMessageContext);

  const { tillaccountno, total } = useGetTellerBalanceByUserId();

  const setTellervalue = (value: string) => {
    setTellerNumber(value);
    setTimeout(() => {
      getTellerBalanceByUserTerllerNumber(
        toastActions,
        encryptData(value) as string
      ).then((data) => {
        setTellerAmount(data.total);
      });
    }, 1000);
  };

  useEffect(() => {
    if (tillaccountno) {
      setTellerNumber(tillaccountno);
      setTellerAmount(total);
    }
  }, [tillaccountno, total, setTellerAmount, setTellerNumber]);

  const { mutate } = useCreateVaultManagement();
  const { mutate: mutateForward } = useForwardToApprovingOfficer();

  const { glnumber, bkbalance } = useGetGldetailsByBranchCodeAndUserId(
    encryptData(branchCode) as string
  );

  const formik = useFormikContext<VaultManagementValues>();

  const onSubmit = (
    values: VaultManagementValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (isSubmitting) {
      setIsSubmitting(true);
      const { glaccno, telleraccno, ...restValues } = values;
      const sellData: VaultManagementValues = {
        ...restValues,
        action: 'sell', // Note this is Selling to vault
        telleraccno: tellerNumber,
        glaccno: glnumber,
        userid: getStoredUser()?.profiles.userid as string
      };

      mutate(sellData, {
        onSuccess: () => {
          resetForm(); // Reset form fields after successful submission
          setIsSubmitting(false);
        }
      });
      setTellervalue(tellerNumber as string);
      // Clear tranAmount and narration fields
      formik.setFieldValue('tranAmount', '');
      formik.setFieldValue('narration', '');
    }
  };

  useEffect(() => {
    const submit = document.getElementById('sellSubmitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  return (
    <Formik
      initialValues={VaultManagementInitialValues}
      onSubmit={(values, resetForm) => onSubmit(values, resetForm)}
      validationSchema={valutManagementSchema}
    >
      <Form>
        <Grid container spacing={2} sx={{ paddingTop: 5 }}>
          <Box>
            <Grid container item direction="column">
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="branchcode"
                    options={mappedBranches}
                    onChange={(e) => setBranchCode(e.target.value)}
                    label="Select a Branch"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>

              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="glaccno"
                    placeholder="01003456"
                    label="GL Account Number"
                    disabled
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                    value={glnumber}
                    required
                  />
                </Box>
              </Grid>

              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter number"
                    label="GL Account Balance"
                    disabled
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                    value={bkbalance !== undefined ? bkbalance.toString() : ''}
                  />
                </Box>
              </Grid>

              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="telleraccno"
                    placeholder="Enter teller no."
                    label="Teller Account Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                    value={tellerNumber}
                    onChange={(e) => setTellervalue(e.target.value)}
                  />
                  <span>{`NGN ${formatCurrency(tellerAmount)}`}</span>
                </Box>
              </Grid>

              <Grid
                item
                ml={{ tablet: 3, mobile: 3 }}
                marginTop={2}
                justifyContent="center"
              >
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormAmountInput
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                    name="tranAmount"
                    placeholder="0.0"
                    label="Amount"
                  />{' '}
                </Box>
              </Grid>

              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="narration"
                    placeholder="Enter Narration"
                    label="Narration"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <button id="sellSubmitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
