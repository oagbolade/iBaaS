import React from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Field, useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ITitle,
  ICountries,
  IStates,
  ITown,
  IBankProducts
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
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useGenerateProductCode,
  generateProductCode
} from '@/api/setup/useProduct';

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
  bankproducts?: IBankProducts[];
  products?: IProducts[];
  frequency?: IFrequency[];
};

export const PersonalDetailsForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies,
  bankproducts,
  products,
  frequency
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();
  const [productCodeGenarate, setProductCodeGenarate] = React.useState('');
  const { setFieldValue, values } = useFormikContext<any>();

  const handleCheck = (booleanValue: string, value: string) => {
    setCustomerType(value);
  };

  const handleGenerateCode = async (code: string) => {
    generateProductCode(code).then((resp) => {
      setProductCodeGenarate(resp.productCode);
      setFieldValue('productCode', resp.productCode);
    });
  };

  const {
    mappedProductType,
    mappedCurrency,
    mappedBankproducts,
    mappedProductClass,
    mappedFrequency
  } = useMapSelectOptions({
    productTypes,
    currencies,
    bankproducts,
    products,
    frequency
  });

  return (
    <>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="productclass"
          options={mappedProductClass}
          label="Product Class"
          onChange={(e) => handleGenerateCode(e.target.value)}
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="productCode"
          placeholder="Enter Product Code"
          label="Product Code"
          type="number"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          value={productCodeGenarate}
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
          name="minloan"
          placeholder="Enter Minimum Loan Amount"
          label="Minimum Loan Amount"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="maxLoan"
          placeholder="Enter Maximum Loan Amount"
          label="Maximun Loan Amount"
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
            <DateTimePicker label="Start Date" name="productstart" />
          </DemoContainer>
        </Box>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Box sx={{ width: '70%' }}>
          <DemoContainer components={['DatePicker']}>
            <DateTimePicker label="Expiry Date" name="productExpire" />
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
          name="term"
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
    </>
  );
};
