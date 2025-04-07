'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { PreviewCustomerReleaseLienInfo } from '../Customer/Lien/ReleaseLien/PreviewCustomerReleaseLienInfo';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormSelectField,
  FormSelectInput
} from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { createLien } from '@/schemas/customer-service';
import {
  useGetLienDetail,
  useGetLienReason,
  useReleaseLien
} from '@/api/customer-service/useLien';
import {
  LienOption,
  LienType
} from '@/constants/CustomerService/viewCustomerDetails';
import { ILienReason } from '@/api/ResponseTypes/customer-service';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { createLienInitialValues } from '@/schemas/schema-values/customer-service';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { encryptData } from '@/utils/encryptData';

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
  PreviewContent: any;
  customStyle?: CustomStyleI;
};
export const MobilePreviewContent = ({
  PreviewContent,
  customStyle
}: Props) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle, ...customStyle }}
    />
  );
};
export const ReleaseLien = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const myHoldnumber = Number(searchParams.get('holdNumber')) || 0;
  // 2090000005 // Test account number
  // const accountNumber = '2090000005';
  // const myHoldnumber = 3;

  const effectiveDate = '2024-02-29T12:00:00';
  const initialEndDate = '2024-03-23T12:00:00';

  const startDate = dayjs(effectiveDate);
  const endDate = dayjs(initialEndDate);

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useReleaseLien();
  const [mappedLienReason, setMappedLienReason] = React.useState<
    OptionsI[] | [] | undefined
  >([]);

  const lienType = '1';
  const { lienReason } = useGetLienReason(lienType);
  const { liendetail, accName, lienexist, isLoading } =
    useGetLienDetail(encryptData(accountNumber) as string);

  React.useEffect(() => {
    const reasons = lienReason?.map((reason: ILienReason) => ({
      name: reason.holdreason,
      value: reason.reasoncode
    }));

    setMappedLienReason(reasons);
  }, [lienReason]);

  const onSubmit = (values: any) => {
    console.log('fefefe');
    const getAllValues = {
      accountnumber: accountNumber,
      lienDetail: [
        {
          myHoldnumber,
          releaseAmount: values.holdAmount,
          reasonCode: values.reasoncode
        }
      ]
    };

    mutate(getAllValues);
  };

  return (
    <Formik
      initialValues={createLienInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={createLien}
    >
      <Form>
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Release Lien" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="lienType"
                  options={LienType}
                  value="1"
                  disabled
                  label="Lien Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="lien"
                  value="1"
                  disabled
                  options={LienOption}
                  label="Lien Option"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box sx={{ width: '100%' }}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      label="Start Date"
                      name="effective_dt"
                      value={startDate}
                      disabled
                    />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box sx={{ width: '100%' }}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      label="End Date"
                      name="end_dt"
                      value={endDate}
                      disabled
                    />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="holdAmount"
                  placeholder="Enter amount"
                  label="Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              {mappedLienReason && mappedLienReason.length > 0 && (
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="reasoncode"
                    options={mappedLienReason as OptionsI[]}
                    label="Lien Reason"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewCustomerReleaseLienInfo
                    loading={isLoading}
                    liendetail={liendetail}
                    accName={accName}
                    lienexist={lienexist}
                  />
                }
              />
            ) : (
              <PreviewCustomerReleaseLienInfo
                loading={isLoading}
                liendetail={liendetail}
                accName={accName}
                lienexist={lienexist}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
