import React from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ITitle,
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import {
  IEducation,
  IFrequency,
  IOccupation,
  IProducts,
  ISector
} from '@/api/ResponseTypes/setup';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  FormikDateTimePicker,
  FormSelectField,
  FormTextInput
} from '@/components/FormikFields';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';

type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
  productTypes?: IProductType[] | Array<any>;
  currencies?: ICurrency[] | Array<any>;
  frequency?: IFrequency[];
  products?: IProducts[];
};

export const PersonalCasaDetailsForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies,
  frequency,
  products
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();

  const handleCheck = (booleanValue: string, value: string) => {
    setCustomerType(value);
  };
  const {
    mappedProductType,
    mappedCurrency,
    mappedFrequency,
    mappedProductClass
  } = useMapSelectOptions({
    productTypes,
    currencies,
    frequency,
    products
  });
  return (
    <>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="productclass"
          options={mappedProductClass}
          label="Product Class"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="productCode"
          placeholder="Enter surname"
          label="Product Code"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
          disabled
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="productName"
          placeholder="Enter Product name"
          label="Product Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="openbalance"
          placeholder="Enter middle name"
          label="Opening Balance"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="currencycode"
          options={mappedCurrency}
          label="Currency"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Box sx={{ width: '70%' }}>
          <DemoContainer components={['DatePicker']}>
            <FormikDateTimePicker
              disableFuture
              label="Start Birth"
              name="productstart"
              value=""
              required
            />
          </DemoContainer>
        </Box>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Box sx={{ width: '70%' }}>
          <DemoContainer components={['DatePicker']}>
            <FormikDateTimePicker
              disableFuture
              label="Expiry Birth"
              name="productExpire"
              value=""
              required
            />
          </DemoContainer>
        </Box>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="appType"
          options={mappedProductType}
          label="Product Type"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="statecode"
          options={mappedFrequency}
          label="Loan Term"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="shortname"
          placeholder="Enter short name"
          label="Short Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="closeBalance"
          placeholder="Enter short name"
          label="Closing Balance"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="minintbalance"
          placeholder="Enter short name"
          label="Minimum Balance for Interest"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="maxamt"
          placeholder="Enter short name"
          label="Max NDIC Limit"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="taxabsorbed1"
          placeholder="Enter short name"
          label="Penalty Rate % (Annualise)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="dayint"
          placeholder="Enter short name"
          label="Interest (Days)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
    </>
  );
};
