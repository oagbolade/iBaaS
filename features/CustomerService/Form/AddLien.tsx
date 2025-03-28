'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { PreviewCustomerLienInfo } from '../Customer/Lien/AddLien/PreviewCustomerLienInfo';
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
  FormikDateTimePicker,
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
  useAddCustomerLien,
  useGetLienReason
} from '@/api/customer-service/useLien';
import {
  LienOption,
  LienType
} from '@/constants/CustomerService/viewCustomerDetails';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { ILienReason } from '@/api/ResponseTypes/customer-service';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { createLienInitialValues } from '@/schemas/schema-values/customer-service';
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
export const AddLien = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useAddCustomerLien();
  const [lienType, setLienType] = React.useState('');
  const [mappedLienReason, setMappedLienReason] = React.useState<
    OptionsI[] | [] | undefined
  >([]);
  const { lienReason } = useGetLienReason(encryptData(lienType) as string);

  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) as string);

  React.useEffect(() => {
    const reasons = lienReason?.map((reason: ILienReason) => ({
      name: reason.holdreason,
      value: reason.reasoncode
    }));

    setMappedLienReason(reasons);
  }, [lienReason]);

  const onSubmit = (values: any) => {
    const startDate = dayjs(values.effective_dt).toISOString();
    const endDate = dayjs(values.end_dt).toISOString();

    const getAllValues = {
      ...values,
      effective_dt: startDate,
      end_dt: endDate,
      accountnumber: accountNumber
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
            <PageTitle title="Add Lien" styles={BatchTitle} />
            <Grid container>
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
              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="lienType"
                  options={LienType}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setLienType(e.target.value)}
                  label="Lien Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="lien"
                  options={LienOption}
                  label="Lien Option"
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
              <Grid item={isTablet} mobile={12}>
                <Box sx={{ width: '100%' }}>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker
                      value={dayjs()}
                      label="Start Date"
                      name="effective_dt"
                    />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box sx={{ width: '100%' }}>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker
                      value={dayjs()}
                      label="End Date"
                      name="end_dt"
                    />
                  </DemoContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewCustomerLienInfo
                    loading={isAccountDetailsLoading}
                    accountInfo={accDetailsResults}
                  />
                }
              />
            ) : (
              <PreviewCustomerLienInfo
                loading={isAccountDetailsLoading}
                accountInfo={accDetailsResults}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
