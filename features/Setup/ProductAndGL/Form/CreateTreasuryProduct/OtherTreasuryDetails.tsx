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

export const OtherTreasuryDetailsForm = ({
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
        <RadioButtons
          name="manageCollection"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Manage Collection date?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          name="securityDepType"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Security Deposit Required?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          name="healthInsuranceAmt"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Health Insurance?"
          value="0"
        />
      </Grid>
    </>
  );
};
