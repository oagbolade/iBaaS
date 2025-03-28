import React from 'react';
import { Box, Grid } from '@mui/material';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { SignatoryClass } from '@/constants/CustomerService/viewCustomerDetails';
import {
  useGetStateByCountryCode,
  useGetTownByStateCode
} from '@/api/general/useGeography';
import { useGetCustomerByIdCodes } from '@/api/customer-service/useCustomer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

type Props = {
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
};

export interface ILocationDetails {
  country: string;
  state: string;
  town: string;
}

export const BusinessDetailsForm = ({ countries, states, towns }: Props) => {
  const customerId = useGetParams('customerId') || '';
  const isEditing = useGetParams('isEditing') || null;
  const formType = 'business';

  const { customerResult } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [locationDetails, setLocationDetails] =
    React.useState<ILocationDetails>({
      country: customerResult?.bizCtry || '',
      state: customerResult?.bizState || '',
      town: customerResult?.bizTowncode || ''
    });
  const { states: allNationStates } = useGetStateByCountryCode(
    encryptData(locationDetails.country) as string,
    formType
  );

  const { towns: allStateTowns } = useGetTownByStateCode(
    encryptData(locationDetails.state) as string,
    formType
  );

  const { mappedStateTowns, mappedNationStates, mappedCountries } =
    useMapSelectOptions({
      countries,
      states,
      towns,
      allNationStates,
      allStateTowns: allStateTowns || []
    });

  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="bizCtry"
              options={mappedCountries}
              label="Country"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
              onChange={(e) => {
                setLocationDetails((prev) => ({
                  ...prev,
                  country: e.target.value
                }));
              }}
              value={locationDetails.country || null}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="bizState"
              options={mappedNationStates}
              label="State"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
              onChange={(e) => {
                setLocationDetails((prev) => ({
                  ...prev,
                  state: e.target.value
                }));
              }}
              value={locationDetails.state || null}
              disabled={!isEditing && mappedNationStates?.length === 0}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="bizTowncode"
              options={mappedStateTowns}
              label="LGA"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
              onChange={(e) => {
                setLocationDetails((prev) => ({
                  ...prev,
                  town: e.target.value
                }));
              }}
              value={locationDetails.town || null}
              disabled={!isEditing && mappedStateTowns?.length === 0}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="bizAddress"
              placeholder="Enter address"
              label="Address"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="bizPhone3"
              placeholder="Enter phone number"
              label="Phone"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="sigClass"
              options={SignatoryClass}
              label="Signatory Class"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
