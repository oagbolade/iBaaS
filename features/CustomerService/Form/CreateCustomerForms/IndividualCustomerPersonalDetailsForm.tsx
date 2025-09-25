import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Gender } from '@/constants/CustomerService/viewCustomerDetails';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  ITitle,
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { IEducation, IOccupation, ISector } from '@/api/ResponseTypes/setup';
import { useGetParams } from '@/utils/hooks/useGetParams';
import {
  useGetCustomerById,
  useGetCustomerByIdCodes
} from '@/api/customer-service/useCustomer';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import {
  useGetStateByCountryCode,
  useGetTownByStateCode
} from '@/api/general/useGeography';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { encryptData } from '@/utils/encryptData';
import { isEmptyObject } from '@/utils/isEmptyObject';

type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
};

interface IResidentDetails {
  residentCountry: string;
  residentState: string;
  residentTown: string;
  nationality: string;
  statecode: string;
}

export const IndividualCustomerPersonalDetailsForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions
}: Props) => {
  const customerId = useGetParams('customerId') || '';
  const isEditing = useGetParams('isEditing') || null;
  const formType = 'personal';
  const residentFormType = 'personal-resident';

  const { customerResult: customerResultCodes, isLoading } =
    useGetCustomerByIdCodes(encryptData(customerId) as string);

  const [dob, setDob] = React.useState(
    isEditing ? dayjs(formatDateOfBirth(customerResultCodes?.dob)) : ''
  );

  const [mappedResidentStates, setMappedResidentStates] = React.useState<
    OptionsI[]
  >([]);
  const [mappedResidentTowns, setMappedResidentTowns] = React.useState<
    OptionsI[]
  >([]);
  const [residentDetails, setResidentDetails] =
    React.useState<IResidentDetails>({
      residentCountry: customerResultCodes?.residentCountry || '',
      residentState: customerResultCodes?.residentStatecode || '',
      residentTown: customerResultCodes?.residentTowncode || '',
      nationality: customerResultCodes?.nationality || '',
      statecode: customerResultCodes?.statecode || ''
    });
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const { states: allNationStates } = useGetStateByCountryCode(
    encryptData(
      customerResultCodes?.nationality || residentDetails.nationality
    ) as string,
    formType
  );

  type LocationType = 'state' | 'town';

  const pickInitialLocationCode = (locationType: LocationType): string => {
    switch (locationType) {
      case 'state':
        if (residentDetails.residentCountry.length > 0) {
          return residentDetails.residentCountry;
        }

        return customerResultCodes?.residentCountry || '';
      case 'town':
        if (residentDetails.residentState.length > 0) {
          return residentDetails.residentState;
        }

        return customerResultCodes?.residentStatecode || '';
      default:
        return customerResultCodes?.statecode || '';
    }
  };

  const { states: allResidentNationStates, isLoading: isLoadingStates } =
    useGetStateByCountryCode(
      encryptData(pickInitialLocationCode('state')) as string,
      residentFormType
    );

  const { towns: allResidentStateTowns, isLoading: isLoadingTowns } =
    useGetTownByStateCode(
      encryptData(pickInitialLocationCode('town')) as string,
      formType
    );

  const {
    mappedNationStates,
    mappedTitles,
    mappedSectors,
    mappedEducation,
    mappedCountries,
    mappedProfessions
  } = useMapSelectOptions({
    titles,
    sectors,
    education,
    countries,
    states,
    towns,
    professions,
    allNationStates
  });

  useEffect(() => {
    if (allResidentNationStates !== undefined) {
      const allResidentNationStatesArray = allResidentNationStates?.map(
        (state: IStates) => ({
          name: state.stateName,
          value: state.stateCode?.toString().trim()
        })
      );

      setMappedResidentStates(allResidentNationStatesArray);
    }
  }, [allResidentNationStates, isLoadingStates, residentDetails.residentState]);

  useEffect(() => {
    if (
      allResidentStateTowns !== undefined &&
      !isEmptyObject(allResidentStateTowns) &&
      !isLoadingTowns
    ) {
      const allResidentStateTownsArray = (allResidentStateTowns || [])?.map(
        (town: ITown) => ({
          name: town.townName,
          value: town.townCode?.toString().trim()
        })
      );

      setMappedResidentTowns(allResidentStateTownsArray);
    }
  }, [allResidentStateTowns, isLoadingTowns]);

  if (isEditing && isLoading && isLoadingTowns && isLoadingStates) {
    return '...';
  }

  return (
    <>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="title"
          options={mappedTitles}
          label="Title"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="surName"
          placeholder="Enter surname"
          label="Surname"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="firstName"
          placeholder="Enter first name"
          label="First Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="othername"
          placeholder="Enter middle name"
          label="Middle Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="sex"
          options={Gender}
          label="Gender"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <Box sx={{ width: '100%' }}>
          <DemoContainer components={['DatePicker']}>
            <FormikDateTimePicker
              disableFuture
              label="Date of Birth"
              name="dob"
              value={dob}
              handleDateChange={(newValue: Dayjs) => setDob(dayjs(newValue))}
              required
            />
          </DemoContainer>
        </Box>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="nationality"
          options={mappedCountries}
          label="Nationality"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          onChange={(e) => {
            setResidentDetails((prev) => ({
              ...prev,
              nationality: e.target.value
            }));
          }}
          required
          value={residentDetails?.nationality || null}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="statecode"
          options={mappedNationStates}
          label="State"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          onChange={(e) => {
            setResidentDetails((prev) => ({
              ...prev,
              statecode: e.target.value
            }));
          }}
          required
          value={residentDetails?.statecode || null}
          disabled={!isEditing && mappedNationStates?.length === 0}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="mothermdName"
          placeholder="Enter mothers maiden name"
          label="Mother's Maiden Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="bvn"
          placeholder="Enter bvn"
          label="BVN"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="email"
          placeholder="Enter email"
          label="Email"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone1"
          placeholder="Enter Phone 1"
          label="Mobile Phone 1"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone2"
          placeholder="Enter Phone 2"
          label="Mobile Phone 2"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name={`${isEditing ? 'nin' : 'natIDNo'}`}
          placeholder="Enter National ID No"
          label="National ID No"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="taxIDNo"
          placeholder="Enter Tax Identity No"
          label="Tax Identity No"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="residentCountry"
          options={mappedCountries}
          label="Resident Country"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
          onChange={(e) => {
            setResidentDetails((prev) => ({
              ...prev,
              residentCountry: e.target.value
            }));
          }}
          value={residentDetails?.residentCountry?.toString().trim()}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="residentStatecode"
          options={mappedResidentStates}
          label="Resident State"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
          onChange={(e) => {
            setResidentDetails((prev) => ({
              ...prev,
              residentState: e.target.value
            }));
          }}
          value={residentDetails?.residentState?.toString().trim()}
          disabled={!isEditing && mappedResidentStates?.length === 0}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="residentTowncode"
          options={mappedResidentTowns}
          label="Resident City/Town"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
          onChange={(e) => {
            setResidentDetails((prev) => ({
              ...prev,
              residentTown: e.target.value
            }));
          }}
          value={residentDetails?.residentTown?.toString().trim()}
          disabled={!isEditing && mappedResidentTowns?.length === 0}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="address"
          placeholder="Enter address"
          label="Residential Address"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="sectorcode"
          options={mappedSectors}
          label="Sector"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="occupation"
          options={mappedProfessions}
          label="Business/Occupation"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="eduLevel"
          options={mappedEducation}
          label="Education Level"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
    </>
  );
};
