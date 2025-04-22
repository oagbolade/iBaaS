import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
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
import { IProductLoanRepayment } from '@/api/ResponseTypes/loans';
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
  repaymentTypes?: IProductLoanRepayment[] | Array<any>;
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  bankproducts?: IBankProducts[];
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
export const InterestLoanChargesForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies,
  repaymentTypes,
  creditInterests,
  loanClass,
  bankproducts,
  exception,
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
    mappedLoanRepayment,
    mappedCreditInterests,
    mappedLoanClass,
    mappedBankproducts,
    mappedException,
    mappedChargeConcessionType
  } = useMapSelectOptions({
    productTypes,
    currencies,
    repaymentTypes,
    creditInterests,
    loanClass,
    bankproducts,
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
    <>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="maxintrate"
          options={mappedCreditInterests}
          label="Interest Type"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="actualRAte"
          placeholder="Enter actual Rate"
          label="Actual Rate"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="penalrate"
          placeholder="Enter Penalty Rate"
          label="Penalty Rate"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="minterm"
          placeholder="Enter Mininum Term "
          label="Minimum Terms"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="maxterm"
          placeholder="Enter Maximum Term"
          label="Maximum Terms"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="moratorium"
          placeholder="Enter Moratorium"
          label="Moratorium"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="collval"
          placeholder="Enter Collateral Value"
          label="Collateral Value"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="schtype"
          options={mappedLoanRepayment}
          label="Repayment Type"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="loanclass"
          options={mappedLoanClass}
          label="Loan Type"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          name="allowOD"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow OD on Account?"
          value="0"
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          name="actualRateCalcMethod"
          options={[
            { label: 'Flat', value: '1' },
            { label: 'Annualized', value: '0' }
          ]}
          title="Please Select"
          value="0"
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

      {/* <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="shortName"
          placeholder="Enter short name"
          label="Short Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid> */}
    </>
  );
};
