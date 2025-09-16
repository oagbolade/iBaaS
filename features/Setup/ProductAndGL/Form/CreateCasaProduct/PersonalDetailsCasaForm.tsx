import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
import {
  IFrequency,
  IProdCodeType,
  IProdType,
  IProductClass,
  IProducts
} from '@/api/ResponseTypes/setup';

import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { generateProductCode } from '@/api/setup/useProduct';
import { encryptData } from '@/utils/encryptData';

type Props = {
  productTypes?: IProductType[] | Array<any>;
  currencies?: ICurrency[] | Array<any>;
  frequency?: IFrequency[];
  products?: IProducts[] | IProductClass[] | Array<any>;
  setProductCode: React.Dispatch<React.SetStateAction<string>>;
  data?: IProdType[] | IProdCodeType[] | Array<any>;
  dataType?: IProdCodeType[] | IProdType[] | Array<any>;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrency: string;
};

export const PersonalCasaDetailsForm = ({
  productTypes,
  currencies,
  frequency,
  products,
  setProductCode,
  data,
  dataType,
  setSelectedCurrency,
  selectedCurrency
}: Props) => {
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();
  const { setFieldValue, values } = useFormikContext<any>();
  const [productCodeGenarate, setProductCodeGenarate] = React.useState('');
  const handleGenerateCode = async (code: string) => {
    setProductCode(values.productclass);
    generateProductCode(encryptData(code) as string).then((resp) => {
      setProductCodeGenarate(resp.productCode);
      setFieldValue('productCode', resp.productCode);
    });
  };

  useEffect(() => {
    if (setProductCode) {
      setProductCode(values.productclass);
    }
  }, [setProductCode, values.productclass]);

  const datatype: IProdCodeType[] | undefined = dataType;
  const dataName: IProdType[] | undefined = data;
  const { mappedCurrency, mappedProductTypeId, mappedProductClassTypeId } =
    useMapSelectOptions({
      productTypes,
      currencies,
      frequency,
      products,
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
  }, [mappedCurrency, setSelectedCurrency]);

  return (
    <Grid
      sx={{
        paddingLeft: '30px'
      }}
      container
      spacing={4}
    >
      <Grid
        sx={{
          padding: '0px',
          margin: '0px'
        }}
        item={isTablet}
        mobile={12}
        tablet={6}
      >
        <FormSelectField
          name="productclass"
          options={mappedProductClassTypeId}
          label="Product Class"
          onChange={(e) => handleGenerateCode(e.target.value)}
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid
        sx={{
          padding: '0px',
          margin: '0px'
        }}
        item={isTablet}
        mobile={12}
        tablet={6}
      >
        <FormTextInput
          name="productCode"
          placeholder="Enter Product code"
          type="number"
          label="Product Code"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          value={productCodeGenarate}
          disabled
          required
        />
      </Grid>

      <Grid
        sx={{
          padding: '0px',
          margin: '0px',
          paddingTop: '20px'
        }}
        item={isTablet}
        mobile={12}
        tablet={6}
      >
        <FormTextInput
          name="productName"
          placeholder="Enter Product name"
          label="Product Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid
        sx={{
          padding: '0px',
          margin: '0px',
          paddingTop: '20px'
        }}
        item={isTablet}
        mobile={12}
        tablet={6}
      >
        <FormTextInput
          name="openbalance"
          placeholder="Enter opening balance"
          label="Opening Balance"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormSelectField
          name="currencycode"
          options={mappedCurrency}
          label="Currency"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          value={selectedCurrency}
          onChange={(e: any) => setSelectedCurrency(e.target.value)}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <Box sx={{ width: '100%' }}>
          <DemoContainer components={['DatePicker']}>
            <DateTimePicker label="Start Date" name="productstart" />
          </DemoContainer>
        </Box>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <Box sx={{ width: '100%' }}>
          <DemoContainer components={['DatePicker']}>
            <DateTimePicker label="Expiry Date" name="productExpire" />
          </DemoContainer>
        </Box>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormSelectField
          name="appType"
          options={mappedProductTypeId}
          label="Product Type"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="shortname"
          placeholder="Enter short name"
          label="Short Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="closeBalance"
          placeholder="Enter Closing Balance"
          label="Closing Balance"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="minintbalance"
          placeholder="Enter Min Balance for Interest"
          label="Minimum Balance for Interest"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="maxamt"
          placeholder="Enter NDIC Limit"
          label="Max AML Limit"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="penal"
          placeholder="Enter Penalty Rate"
          label="Penalty Rate % (Annualise)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
    </Grid>
  );
};
