import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { accountOfficer as accountOfficerSchema } from '@/schemas/admin';
import {
  accountOfficerInitialValues,
  CreateAccountOfficerFormValues
} from '@/schemas/schema-values/admin';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import {
  useCreateAccountOfficer,
  useGetAccountOfficerByCode
} from '@/api/admin/useAccountOfficer';
import { IBranches, IDepartments, IStatus } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { FormSkeleton } from '@/components/Loaders';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';

type Props = {
  officers?: IAccountOfficers[];
  unitTestInitialValues?: CreateAccountOfficerFormValues;
  isSubmitting: boolean;
  branches: IBranches[] | Array<any>;
  status: IStatus[] | Array<any>;
  departments: IDepartments[] | Array<any>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

type SearchFilters = {
  accountOfficers?: string | OptionsI[];
};

export const CreateAccountOfficer = ({
  isSubmitting,
  branches,
  status,
  departments,
  setIsSubmitting,
  unitTestInitialValues,
  officers
}: Props) => {
  const officercode = (useGetParams('officercode') || '').trim();
  const { mappedBranches, mappedDepartments, mappedStatus, mappedAccountOfficers } =
    useMapSelectOptions({
      branches,
      departments,
      status,
      officers
    });
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateAccountOfficer(Boolean(isEditing), encryptData(officercode));

  const { officer, isLoading } = useGetAccountOfficerByCode(
    encryptData(officercode) || null
  );

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountOfficers: isEditing ? `ID ${officer?.officercode?.trim()}: ${officer?.officerName}` :'',
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountOfficers: [],
  });

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountOfficers: '',
  });

  const onSubmit = async (values: CreateAccountOfficerFormValues) => {
    const createOfficerPermission = document.getElementById?.(
      'createOfficerPermission'
    ) as HTMLInputElement | null;

    await mutate({
      ...values,
      officercode: `${extractIdFromDropdown(selectedValue.accountOfficers as string)}`,
      auth: Number(createOfficerPermission?.value || '0')
    });
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const filteredItems = filterDropdownSearch(mappedAccountOfficers, value);

    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        [name]: mappedAccountOfficers,
      });
    }
  };

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle
          title={`${isEditing ? 'Edit' : 'Create'} Account Officer`}
        />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            isEditing
              ? {
                ...officer,
                branchcode: String(officer?.branchcode).trim(),
                officercode: String(officer?.staffID).trim()
              }
              : unitTestInitialValues || accountOfficerInitialValues
          }
          onSubmit={(values: any) => onSubmit(values)}
          validationSchema={accountOfficerSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid item={isTablet} mobile={12}>
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      disabled={Boolean(isEditing)}
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'accountOfficers')
                      }
                      label="Search Officer Name"
                      name="accountOfficers"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={filteredValues.accountOfficers as OptionsI[]}
                      customStyle={{ ...dropDownWithSearch, width: setWidth(isMobile ? '300px' : '900px'), }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={(selectedValue.accountOfficers as string) || 'Search Account Officer'}
                      onChange={handleSearch}
                      searchValue={searchValue.accountOfficers as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="branchcode"
                    options={mappedBranches}
                    label="Branch"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="officerName"
                    placeholder="Omodayo Oluwafunke"
                    label="Staff Name"
                    required
                    disabled={Boolean(isEditing)}
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="dept"
                    options={mappedDepartments}
                    label="Department"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="email"
                    placeholder="Omodayo_Oluwafunke@testcompany.com"
                    label="Email Address"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="phone"
                    label="Phone Number"
                    placeholder="090587483822"
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="status"
                    options={mappedStatus}
                    label="Staff Status"
                  />{' '}
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
