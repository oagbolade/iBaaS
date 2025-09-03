import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Field, FieldProps } from 'formik';
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
  ICreditInterests,
  IEducation,
  IException,
  IInterests,
  ILoanClass,
  IOccupation,
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
import { PageTitle } from '@/components/Typography';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';

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
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  interests?: IInterests[];
  exception?: IException[];
  bankproducts?: IBankProducts[];
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
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies,
  creditInterests,
  loanClass,
  interests,
  exception,
  bankproducts,
  charges
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
    mappedCreditInterests,
    mappedLoanClass,
    mappedInterests,
    mappedException,
    mappedBankproducts,
    mappedChargeConcessionType
  } = useMapSelectOptions({
    productTypes,
    currencies,
    creditInterests,
    loanClass,
    interests,
    exception,
    bankproducts,
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
    <>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="crtype"
          options={mappedCreditInterests}
          label="Credit Interest Type (Per annum)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="drType"
          options={mappedInterests}
          label="Debit Interest Type (Per annum)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="withallowed"
          placeholder="Enter Withdrawal allowed"
          label="Maximum Withdrawal Allowed for Interest"
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
          label="Interest Days"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Field
          name="ProdCharges"
          component={MultiSelectWithCheckboxes}
          options={mappedChargeConcessionType}
          label="Product Charges"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Field
          name="ProdException"
          component={MultiSelectWithCheckboxes}
          options={mappedException}
          label="Product Exceptions"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
        />
      </Grid>
    </>
  );
};
