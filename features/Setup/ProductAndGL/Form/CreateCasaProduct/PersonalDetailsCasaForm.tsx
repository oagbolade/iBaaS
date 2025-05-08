import React from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useFormikContext } from 'formik';
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
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { generateProductCode } from '@/api/setup/useProduct';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';

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
  const { setFieldValue, values } = useFormikContext<any>();
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const isEditing = useGetParams('isEditing') || null;

  const [productCodeGenarate, setProductCodeGenarate] = React.useState('');
  const handleGenerateCode = async (code: string) => {
    generateProductCode(encryptData(code) as string).then((resp) => {
      setProductCodeGenarate(resp.productCode);
      setFieldValue('productCode', resp.productCode);
    });
  };

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
  React.useEffect(() => {
    if (mappedCurrency.length > 0) {
      const defaultCurrency =
        mappedCurrency.find((c) =>
          ['naira', 'nigeria', 'ngn'].some(
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
          placeholder="Enter Product code"
          type="number"
          label="Product Code"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          value={productCodeGenarate}
          disabled
          required
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
          placeholder="Enter opening balance"
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
          value={selectedCurrency}
          onChange={(e: any) => setSelectedCurrency(e.target.value)}
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
          placeholder="Enter Closing Balance"
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
          placeholder="Enter Min Balance for Interest"
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
          placeholder="Enter NDIC Limit"
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
          placeholder="Enter Penalty Rate"
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
          placeholder="Enter Interest Days"
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
