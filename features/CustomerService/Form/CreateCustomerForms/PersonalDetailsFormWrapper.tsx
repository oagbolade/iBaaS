import React from 'react';
import { Box, Grid } from '@mui/material';
import { IndividualCustomerPersonalDetailsForm } from './IndividualCustomerPersonalDetailsForm';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ITitle,
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { IEducation, IOccupation, ISector } from '@/api/ResponseTypes/setup';

type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
};

export const PersonalDetailsFormWrapper = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
}: Props) => {
  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          <IndividualCustomerPersonalDetailsForm
            titles={titles}
            sectors={sectors}
            education={education}
            countries={countries}
            states={states}
            towns={towns}
            professions={professions}
          />
        </Grid>
      </Box>
    </Grid>
  );
};
