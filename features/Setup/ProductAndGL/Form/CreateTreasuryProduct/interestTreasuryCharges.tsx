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
  IFrequency,
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
  frequency?: IFrequency[];
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
export const InterestTreasuryChargesForm = ({
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
  charges,
  frequency
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
    mappedChargeConcessionType,
    mappedFrequency
  } = useMapSelectOptions({
    productTypes,
    currencies,
    repaymentTypes,
    creditInterests,
    loanClass,
    bankproducts,
    exception,
    charges,
    frequency
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
          label="Interest Type"
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
        <FormSelectField
          name="repaymeth"
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
          name="discounted"
          options={[
            { value: '0', name: 'Non-Discounted' },
            { value: '1', name: 'Discounted' }
          ]}
          label="Instrument Type"
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
          label="Term"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          name="CloseTDAtMature"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Liquidate to maturing GL?"
          value="0"
        />
      </Grid>
    </>
  );
};
