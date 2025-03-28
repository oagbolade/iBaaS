import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import { IIDTypes } from '@/api/ResponseTypes/customer-service';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { useGetCustomerByIdCodes } from '@/api/customer-service/useCustomer';
import { encryptData } from '@/utils/encryptData';

type Props = {
  idCards?: IIDTypes[];
};

export const IdentificationDetailsForm = ({ idCards }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedIDCards } = useMapSelectOptions({
    idCards
  });
  const customerId = useGetParams('customerId') || '';
  const isEditing = useGetParams('isEditing') || '';
  const { customerResult } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );

  const passport = '2';

  // Initialize Issue Date based on editing state
  const initialIssueDate = isEditing
    ? dayjs(
        customerResult?.idType === passport
          ? customerResult?.psprtIssDate
          : customerResult?.idIssueDate
      )
    : null;

  // Initialize Expiry Date based on editing state
  const initialExpiryDate = isEditing
    ? dayjs(
        customerResult?.idType === passport
          ? customerResult?.psprtExpDate
          : customerResult?.idExpryDate
      )
    : null;

  // State management for Issue and Expiry Dates
  const [issueDate, setIssueDate] = useState<Dayjs | null>(initialIssueDate);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(initialExpiryDate);

  // Handle changes to the Issue Date
  const handleIssueDateChange = (date: Dayjs | null) => {
    setIssueDate(date);

    // Optional: Reset Expiry Date if it's before the new Issue Date
    if (expiryDate && date && expiryDate.isBefore(date, 'day')) {
      setExpiryDate(null);
    }
  };

  const handleExpiryDateChange = (date: Dayjs | null) => {
    setExpiryDate(date);
  };

  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          {/* ID Type Selection */}
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="idType"
              options={mappedIDCards}
              label="ID Type"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>

          {/* ID Number Input */}
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="iDno"
              placeholder="Enter ID No"
              label="ID No"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>

          {/* Issue Date Picker */}
          <Grid item={isTablet} mobile={12}>
            <Box>
              <DemoContainer components={['DatePicker']}>
                <FormikDateTimePicker
                  required
                  disableFuture
                  label="Issue Date"
                  value={issueDate as Dayjs}
                  handleDateChange={handleIssueDateChange}
                  name="idIssueDate"
                />
              </DemoContainer>
            </Box>
          </Grid>

          {/* Expiry Date Picker */}
          <Grid item={isTablet} mobile={12}>
            <Box>
              <DemoContainer components={['DatePicker']}>
                <FormikDateTimePicker
                  required
                  label="Expiry Date"
                  value={expiryDate as Dayjs}
                  name="idExpryDate"
                  handleDateChange={handleExpiryDateChange}
                  // Set minDate to Issue Date or today if Issue Date is not selected
                  minDate={issueDate || dayjs()}
                />
              </DemoContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
