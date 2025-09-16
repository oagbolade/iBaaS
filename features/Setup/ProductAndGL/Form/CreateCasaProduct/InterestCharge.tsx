import React from 'react';
import {
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import { Field, FieldProps } from 'formik';
import { useCurrentBreakpoint } from '@/utils';

import {
  ICreditInterests,
  IException,
  IInterests,
  ILoanClass
} from '@/api/ResponseTypes/setup';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { PageTitle } from '@/components/Typography';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';

type Props = {
  productTypes?: IProductType[] | Array<any>;
  currencies?: ICurrency[] | Array<any>;
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  interests?: IInterests[];
  exception?: IException[];
  charges?: IChargeConcessionType[] | Array<any>;
};
interface Option {
  value: string | number; // Adjust based on your actual data
  name: string;
}
interface MultiSelectWithCheckboxesProps {
  field: FieldProps['field']; // Formik field props
  form: FieldProps['form']; // Formik form props
  options: Option[];
  label: string;
  customStyle: Record<string, any>; // Adjust based on your customStyle shape
}
export const InterestCasaChargesForm = ({
  productTypes,
  currencies,
  creditInterests,
  loanClass,
  interests,
  exception,
  // bankproducts,
  charges
}: Props) => {
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();

  const {
    mappedCreditInterests,
    mappedInterests,
    mappedException,
    mappedChargeConcessionType
  } = useMapSelectOptions({
    productTypes,
    currencies,
    creditInterests,
    loanClass,
    interests,
    exception,
    charges
  });

  const MultiSelectWithCheckboxes = ({
    field,
    form,
    options,
    label,
    customStyle
  }: MultiSelectWithCheckboxesProps) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    const handleChange = (event: any) => {
      const {
        target: { value: selectedValues }
      } = event;
      setFieldValue(name, selectedValues);
    };

    return (
      <FormControl sx={{ ...customStyle }} required>
        <PageTitle title={label} />
        <Select
          multiple
          name={name}
          value={value || []} // Default to empty array if value is undefined
          onChange={handleChange}
          renderValue={(selected) =>
            selected
              .map(
                (val: any) =>
                  options.find((opt: any) => opt.value === val)?.name
              )
              .join(', ')
          }
        >
          {options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value?.includes(option.value) || false} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Grid
      sx={{
        paddingLeft: '30px'
      }}
      container
      spacing={4}
    >
      <Grid item={isTablet} tablet={6} mobile={12}>
        <FormSelectField
          name="crtype"
          options={mappedCreditInterests}
          label="Credit Interest Type (Per annum)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} tablet={6} mobile={12}>
        <FormSelectField
          name="drType"
          options={mappedInterests}
          label="Debit Interest Type (Per annum)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} tablet={6} mobile={12}>
        <FormTextInput
          name="withallowed"
          placeholder="Enter Withdrawal allowed"
          label="Maximum Withdrawal Allowed for Interest"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} tablet={6} mobile={12}>
        <FormTextInput
          name="dayint"
          placeholder="Enter Interest Days"
          label="Interest Days"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} tablet={6} mobile={12}>
        <Field
          name="ProdCharges"
          component={MultiSelectWithCheckboxes}
          options={mappedChargeConcessionType}
          label="Product Charges"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} tablet={6} mobile={12}>
        <Field
          name="ProdException"
          component={MultiSelectWithCheckboxes}
          options={mappedException}
          label="Product Exceptions"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>

      <Grid item={isTablet} tablet={6} mobile={12}>
        <FormSelectField
          name="postnodebit"
          options={[
            {
              name: 'Yes',
              value: '1'
            },
            {
              name: 'No',
              value: '0'
            }
          ]}
          label="Post No Debit"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
    </Grid>
  );
};
