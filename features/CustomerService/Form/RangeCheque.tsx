import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { Formik, Form, useFormikContext } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { throttle } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { PageTitle } from '@/components/Typography';
import { BatchContainer, BatchTitle } from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { ICheckBooks } from '@/api/ResponseTypes/customer-service';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { useCreateRangeCheque } from '@/api/customer-service/useCheque';
import { AccountType } from '@/constants/CustomerService/viewCustomerDetails';
import { rangeChequeInitialValues } from '@/schemas/schema-values/customer-service';
import { rangeCheque } from '@/schemas/customer-service';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      type="submit"
      buttonTitle="Submit"
      customStyle={{ ...submitButton }}
    />
  </Box>
];

type Props = {
  checkbooks?: ICheckBooks[];
  branches?: IBranches[];
};

interface MyFormValues {
  chequebooktype: string;
  startSerialNo: string;
}

const TrackChequeBookTypeField = ({
  setCurrentChequeBookDetails,
  checkbooks
}: {
  setCurrentChequeBookDetails: Function;
  checkbooks?: ICheckBooks[];
}) => {
  const { values } = useFormikContext<MyFormValues>();
  const { chequebooktype } = values as {
    chequebooktype: string;
  };

  React.useEffect(() => {
    const delay = 1200000; // 20mins
    if (chequebooktype) {
      const throttleFunction = throttle(
        () => {
          const selectedChequeType = checkbooks?.filter(
            (books) => chequebooktype === books.typeId.toString().trim()
          );

          setCurrentChequeBookDetails((prev: any) => ({
            ...prev,
            numberOfleaves:
              selectedChequeType && selectedChequeType[0]?.numberOfleaves,
            currentCost:
              selectedChequeType && selectedChequeType[0]?.currentCost
          }));
        },
        delay,
        { trailing: false }
      );

      throttleFunction();
    }
  }, [chequebooktype]);

  return null;
};

const TrackStartSerialNumber = ({
  setCurrentStartSerialNumber
}: {
  setCurrentStartSerialNumber: Function;
}) => {
  const { values } = useFormikContext<MyFormValues>();
  const { startSerialNo: serialNumberValue } = values;

  setCurrentStartSerialNumber(serialNumberValue || 1);
  return null;
};

export const RangeCheque = ({ checkbooks, branches }: Props) => {
  const searchParams = useSearchParams();
  const defaultStartSerialNumber = 1;

  const [endSerialNumber, setEndSerialNumber] = React.useState<number>(0);

  const [startSerialNumber, setCurrentStartSerialNumber] =
    React.useState<number>(defaultStartSerialNumber);

  const [currentChequeBookDetails, setCurrentChequeBookDetails] =
    React.useState<{ numberOfleaves: number; currentCost: number }>({
      numberOfleaves: 0,
      currentCost: 0
    });

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const accountNumber = searchParams.get('accountNumber') || '';
  const urlState = searchParams.get('urlState');

  const { mappedBranches, mappedCheckBooks } = useMapSelectOptions({
    branches,
    checkbooks
  });

  const { mutate } = useCreateRangeCheque(urlState);

  const onSubmit = (values: any) => {
    const selectedDate = dayjs(values.selectedDate).toISOString();
    const costofchequebk = currentChequeBookDetails.currentCost;

    const getAllValues = {
      ...values,
      selectedDate,
      accountNumber,
      costofchequebk,
      endSerialNo: endSerialNumber
    };

    mutate(getAllValues);
  };

  React.useEffect(() => {
    setEndSerialNumber(
      Number(currentChequeBookDetails.numberOfleaves) +
        Number(startSerialNumber) -
        1
    );
  }, [startSerialNumber, currentChequeBookDetails.numberOfleaves]);

  return (
    <Formik
      initialValues={{ ...rangeChequeInitialValues, accountNumber }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={rangeCheque}
    >
      <Form>
        <TrackChequeBookTypeField
          setCurrentChequeBookDetails={setCurrentChequeBookDetails}
          checkbooks={checkbooks}
        />
        <TrackStartSerialNumber
          setCurrentStartSerialNumber={setCurrentStartSerialNumber}
        />
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Range Cheque" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="accountNumber"
                  placeholder="Enter account number"
                  label="Account Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={accountNumber}
                  disabled
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="accounttype"
                  options={AccountType} // TODO: should come from previous screen
                  label="Account Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  value="1"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="chequebooktype"
                  options={mappedCheckBooks}
                  label="ChequeBook Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormTextInput
                  name="noOfLeaves"
                  placeholder="Enter account number"
                  label="Number of Leaves"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  value={`${currentChequeBookDetails.numberOfleaves?.toString()} Leaves`}
                />
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormTextInput
                  name="costofchequebk"
                  placeholder="Enter cost of cheque book"
                  label="Cost of ChequeBook"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  value={`NGN ${currentChequeBookDetails.currentCost?.toString()}`}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="branchToCollect"
                  options={mappedBranches}
                  label="Branch to Collect"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker
                      label="Request Date"
                      name="selectedDate"
                      minDate={dayjs()}
                    />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type="number"
                  name="startSerialNo"
                  placeholder="Enter serial number"
                  label="Start Serial Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type="number"
                  name="endSerialNo"
                  placeholder="Enter serial number"
                  label="End Serial Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={(
                    Number(currentChequeBookDetails.numberOfleaves) +
                    Number(startSerialNumber) -
                    1
                  ).toString()}
                  disabled
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
                  placeholder="Enter value"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type="number"
                  name="costtocustomer"
                  placeholder="Enter value"
                  label="Total Cost to Customer"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
