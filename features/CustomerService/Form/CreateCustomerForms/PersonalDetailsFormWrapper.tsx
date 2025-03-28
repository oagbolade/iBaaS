import React from 'react';
import { Box, Grid } from '@mui/material';
import { IndividualCustomerPersonalDetailsForm } from './IndividualCustomerPersonalDetailsForm';
import { CorporateCustomerPersonalDetailsForm } from './CorporateCustomerPersonalDetailsForm';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ITitle,
  ICountries,
  IStates,
  ITown,
  IGroup
} from '@/api/ResponseTypes/customer-service';
import { IEducation, IOccupation, ISector } from '@/api/ResponseTypes/setup';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { IBranches } from '@/api/ResponseTypes/general';

type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
  officers?: IAccountOfficers[];
  groups?: IGroup[];
  branches?: IBranches[];
};

export const PersonalDetailsFormWrapper = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  officers,
  groups,
  branches
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet } = useCurrentBreakpoint();

  const handleCheck = (booleanValue: string, value: string) => {
    setCustomerType(value);
  };

  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          <Grid item={isTablet} mobile={12}>
            <RadioButtons
              options={[
                { label: 'Individual', value: 'individual' },
                { label: 'Corporate', value: 'corporate' }
              ]}
              title="Select Customer Type"
              name="customerType"
              value="individual"
              handleCheck={handleCheck}
            />
          </Grid>

          {customerType === 'individual' && (
            <IndividualCustomerPersonalDetailsForm
              titles={titles}
              sectors={sectors}
              education={education}
              countries={countries}
              states={states}
              towns={towns}
              professions={professions}
            />
          )}

          {customerType === 'corporate' && (
            <CorporateCustomerPersonalDetailsForm
              titles={titles}
              sectors={sectors}
              education={education}
              countries={countries}
              states={states}
              towns={towns}
              professions={professions}
              officers={officers}
              groups={groups}
              branches={branches}
            />
          )}
        </Grid>
      </Box>
    </Grid>
  );
};
