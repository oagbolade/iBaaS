import React from 'react';
import { Box, Grid } from '@mui/material';
import { ILocationDetails } from './BusinessDetailsForm';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  IRelationship,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { useGetTownByStateCode } from '@/api/general/useGeography';
import { useGetCustomerByIdCodes } from '@/api/customer-service/useCustomer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

type Props = {
  relationships?: IRelationship[];
  states?: IStates[];
  towns?: ITown[];
};

export const NextOfKinDetailsForm = ({
  towns,
  relationships,
  states
}: Props) => {
  const customerId = useGetParams('customerId') || '';
  const isEditing = useGetParams('isEditing') || null;
  const formType = 'nextOfKin';
  const { customerResult } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [locationDetails, setLocationDetails] = React.useState<
    Partial<ILocationDetails>
  >({
    state: customerResult?.nextOfKinState || '',
    town: customerResult?.nextOfKintown || ''
  });

  const pickInitialLocationCode = (): string => {
    if (String(locationDetails?.state).length > 0) {
      return locationDetails?.state || '';
    }

    return customerResult?.nextOfKinState || '';
  };

  const { towns: allStateTowns } = useGetTownByStateCode(
    encryptData(pickInitialLocationCode()) as string,
    formType
  );

  const { mappedStateTowns, mappedRelationships, mappedStates } =
    useMapSelectOptions({
      relationships,
      states,
      towns,
      allStateTowns
    });

  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="nextOfKin"
              placeholder="Enter fullname"
              label="Full Name"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              required
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="nextOfKinaddr"
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
              name="nextOfKinphone"
              placeholder="Enter phone number"
              label="Phone Number"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="nextOfKinRel"
              options={mappedRelationships}
              label="Relationship"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="nextOfKinState"
              options={mappedStates}
              label="State"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              onChange={(e) => {
                setLocationDetails((prev) => ({
                  ...prev,
                  state: e.target.value
                }));
              }}
              value={locationDetails.state || null}
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormSelectField
              name="nextOfKintown"
              options={mappedStateTowns}
              label="LGA"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
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
        </Grid>
      </Box>
    </Grid>
  );
};
