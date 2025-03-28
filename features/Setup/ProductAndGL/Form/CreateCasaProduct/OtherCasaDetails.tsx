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
import { IEducation, IOccupation, ISector } from '@/api/ResponseTypes/setup';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  FormikDateTimePicker,
  FormikRadioButton,
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
};

export const OtherCasaDetailsForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();

  const handleCheck = (booleanValue: string, value: string) => {
    setCustomerType(value);
  };
  const { mappedProductType, mappedCurrency } = useMapSelectOptions({
    productTypes,
    currencies
  });

  return (
    <>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="floor"
          placeholder="Enter Default Amount"
          label="Default Amount"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="penal"
          placeholder="Enter Minimum Age"
          label="Minimum Age"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="maxamt"
          placeholder="Enter Maximum Age"
          label="Maximum Age"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '70%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="checkBook"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Cheque Book?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="sweepIn"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Sweep In?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="si"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Standing Instruction?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="od"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow OD?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="lien"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Lien?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          name="stateInactive"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="State to Inactive/Dormant A/C?"
          value="0"
        />
      </Grid>
    </>
  );
};
