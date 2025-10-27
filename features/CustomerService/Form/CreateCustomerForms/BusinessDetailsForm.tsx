import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useFormikContext } from 'formik';
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
      allStateTowns
    });

  const { setFieldValue } = useFormikContext();
  const [usePersonalDetails, setUsePersonalDetails] = React.useState<string | null>(null);

  const handleUsePersonalDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setUsePersonalDetails(value);

  if (value !== 'yes') return;

  try {
    const savedDetails = JSON.parse(localStorage.getItem('personalDetails') || '{}');

    const { country, state, town, address, phone } = savedDetails;

    if (!country || !state || !town) {
      return;
    }

    const updatedDetails = { country, state, town };
    setLocationDetails(updatedDetails);
    ['bizCtry', 'bizState', 'bizTowncode', 'bizAddress', 'bizPhone3'].forEach((field, index) => {
      const fieldValues = [country, state, town, address, phone][index];
      setFieldValue(field, fieldValues);
    });
    localStorage.removeItem('personalDetails');
  } catch (error) {
    console.error('Error loading personal details:', error);
  }
};
  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          {/* Add radio button group at the top */}
          <Grid item={isTablet} mobile={12} mb={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Use Personal Details?</FormLabel>
              <RadioGroup
                row
                value={usePersonalDetails || ''} // Set empty string when null
                onChange={handleUsePersonalDetails}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Existing form fields */}
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
