/* eslint-disable no-dupe-keys */
import React from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
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
  IProdCodeType,
  IProdType,
  IProductClass,
  IProducts,
  ISector
} from '@/api/ResponseTypes/setup';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import {
  generateProductCode,
  useGetProductClassByCastegory,
  useGetProductTypeByid
} from '@/api/setup/useProduct';
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
  bankproducts?: IBankProducts[];
  products?: IProducts[] | IProductClass[] | Array<any>;
  frequency?: IFrequency[];
  data?: IProdType[] | IProdCodeType[] | Array<any>;
  dataType?: IProdCodeType[] | IProdType[] | Array<any>;
  productTypeCode?: string;
  productCodeGenarate?: string;
  setProductCodeGenarate?: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line react/no-unused-prop-types
  setProductCode: React.Dispatch<React.SetStateAction<string>>;
};

export const PersonalTreasuryDetailsForm = ({
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
  frequency,
  data,
  productTypeCode,
  productCodeGenarate,
  setProductCodeGenarate,
  dataType,
  setProductCode
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const { setFieldValue, values } = useFormikContext<any>();
  const [productType, setproductType] = React.useState('');

  const handleCheck = (booleanValue: string, value: string) => {
    setCustomerType(value);
  };

  const handleGenerateCode = async (code: string) => {
    setProductCode(values.productclass);
    // eslint-disable-next-line no-useless-catch
    try {
      const resp = await generateProductCode(encryptData(code) as string);
      if (setProductCodeGenarate) {
        // Check if setProductCodeGenarate is defined
        setProductCodeGenarate(resp.productCode);
      }
      setFieldValue('productCode', resp.productCode);
    } catch (error) {
      throw error;
    }
  };
  if (setProductCode) {
    setProductCode(values.productclass);
  }
  const datatype: IProdCodeType[] | undefined = dataType;
  const dataName: IProdType[] | undefined = data;

  const {
    mappedProductType,
    mappedCurrency,
    mappedBankproducts,
    mappedProductClass,
    mappedFrequency,
    mappedBankproductCode,
    mappedProductTypeId,
    mappedProductClassTypeId
  } = useMapSelectOptions({
    productTypes,
    currencies,
    bankproducts,
    products,
    frequency,
    data: dataName,
    dataType: datatype
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
          options={mappedProductClassTypeId}
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
          options={mappedProductTypeId}
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
    </>
  );
};
